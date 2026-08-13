import { createFileRoute, Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUpdateAttendance } from "@/hooks/use-attendance";
import { useClass } from "@/hooks/use-classes";
import { ATTENDANCE_STATUSES } from "@shannova/shared-types";
import type { AttendanceStatus } from "@/types/api";

export const Route = createFileRoute("/instructor/classes/$classId")({
  component: ClassAttendancePage,
});

function ClassAttendancePage() {
  const { classId } = Route.useParams();
  const { data: cls, isLoading } = useClass(classId);
  const updateAttendance = useUpdateAttendance();

  if (isLoading || !cls) {
    return <div className="mx-auto max-w-3xl p-6 text-muted-foreground text-sm">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4 p-6">
      <Link to="/instructor/classes" className="text-muted-foreground text-sm hover:underline">
        ← All classes
      </Link>

      <div>
        <h1 className="text-2xl font-semibold">{cls.title}</h1>
        <p className="text-muted-foreground text-sm">
          {new Date(cls.startTime).toLocaleString()} <Badge variant="outline">{cls.status}</Badge>
        </p>
        {cls.meetingUrl && (
          <a href={cls.meetingUrl} target="_blank" rel="noreferrer" className="text-primary text-sm hover:underline">
            Meet link
          </a>
        )}
      </div>

      <Card>
        <CardContent className="pt-6">
          <h2 className="mb-3 font-semibold">Attendance</h2>
          {cls.attendance.length === 0 ? (
            <p className="text-muted-foreground text-sm">No enrolled students to track.</p>
          ) : (
            <ul className="divide-y">
              {cls.attendance.map((a) => (
                <li key={a.id} className="flex items-center justify-between py-2">
                  <span className="text-sm">{a.user.email}</span>
                  <Select
                    value={a.status}
                    onValueChange={(status) =>
                      updateAttendance.mutate({ id: a.id, status: status as AttendanceStatus })
                    }
                  >
                    <SelectTrigger className="w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ATTENDANCE_STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
