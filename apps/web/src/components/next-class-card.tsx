import { motion } from "framer-motion";
import { CalendarClock } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/empty-state";
import { useClassStartingSoon } from "@/hooks/use-class-starting-soon";
import { useUpcomingClasses } from "@/hooks/use-classes";

function formatCountdown(ms: number) {
  if (ms <= 0) return "Starting now";
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return hours > 0 ? `${hours}:${pad(minutes)}:${pad(seconds)}` : `${pad(minutes)}:${pad(seconds)}`;
}

export function NextClassCard() {
  useClassStartingSoon();
  const { data: classes, isLoading } = useUpcomingClasses();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) return null;

  const next = classes?.[0];
  if (!next) {
    return (
      <Card className="border-l-primary border-l-4">
        <CardHeader>
          <CardTitle>Next class</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={CalendarClock}
            title="No upcoming classes"
            description="Nothing scheduled yet — check back once your instructor sets one up."
          />
        </CardContent>
      </Card>
    );
  }

  const startTime = new Date(next.startTime).getTime();
  const msRemaining = startTime - now;
  const startingSoon = msRemaining <= 5 * 60 * 1000;

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className="border-l-primary shadow-primary/5 border-l-4 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarClock className="text-primary size-4" />
            Next class
            {startingSoon && (
              <motion.span
                className="inline-block size-2 rounded-full bg-primary"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="font-medium">{next.title}</p>
            <p className="text-muted-foreground text-sm">
              {next.instructor.firstName ?? next.instructor.email} ·{" "}
              {new Date(next.startTime).toLocaleString()}
            </p>
          </div>
          <p className="font-mono text-2xl tabular-nums">{formatCountdown(msRemaining)}</p>
          {next.meetingUrl ? (
            <Button asChild className="w-full">
              <a href={next.meetingUrl} target="_blank" rel="noreferrer">
                Join Meet
              </a>
            </Button>
          ) : (
            <Button disabled className="w-full">
              Meet link not available yet
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
