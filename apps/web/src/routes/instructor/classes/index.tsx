import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCohortCurriculum, useCohorts } from "@/hooks/use-cohorts";
import { useClasses, useCreateClass } from "@/hooks/use-classes";
import type { CurriculumTree } from "@/types/api";

export const Route = createFileRoute("/instructor/classes/")({
  component: InstructorClassesPage,
});

function flattenTopics(tree: CurriculumTree | undefined) {
  if (!tree) return [];
  return tree.modules.flatMap((m) =>
    m.weeks.flatMap((w) => w.topics.map((t) => ({ id: t.id, label: `${m.title} / ${w.title} / ${t.title}` }))),
  );
}

const scheduleFormSchema = z.object({
  title: z.string().min(1, "Required"),
  description: z.string().optional(),
  topicId: z.string().optional(),
  startTime: z.string().min(1, "Required"),
  endTime: z.string().min(1, "Required"),
});
type ScheduleFormValues = z.infer<typeof scheduleFormSchema>;

function InstructorClassesPage() {
  const { data: cohortsData } = useCohorts({ pageSize: 100 });
  const cohorts = cohortsData?.data ?? [];
  const [cohortId, setCohortId] = useState<string>("");
  const [open, setOpen] = useState(false);
  const activeCohortId = cohortId || cohorts[0]?.id || "";

  const { data: classes, isLoading } = useClasses(activeCohortId);
  const { data: curriculumTree } = useCohortCurriculum(activeCohortId);
  const createMutation = useCreateClass();
  const topics = flattenTopics(curriculumTree);

  const form = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: { title: "", description: "", topicId: "", startTime: "", endTime: "" },
  });

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Classes</h1>
        <div className="flex items-center gap-2">
          {cohorts.length > 1 && (
            <Select value={activeCohortId} onValueChange={setCohortId}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select a cohort" />
              </SelectTrigger>
              <SelectContent>
                {cohorts.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button disabled={!activeCohortId}>Schedule class</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule class</DialogTitle>
              </DialogHeader>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(async (values) => {
                  await createMutation.mutateAsync({
                    cohortId: activeCohortId,
                    topicId: values.topicId || undefined,
                    title: values.title,
                    description: values.description,
                    startTime: new Date(values.startTime),
                    endTime: new Date(values.endTime),
                  });
                  form.reset();
                  setOpen(false);
                })}
              >
                <div className="space-y-1.5">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" {...form.register("title")} />
                  {form.formState.errors.title && (
                    <p className="text-destructive text-xs">{form.formState.errors.title.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" {...form.register("description")} />
                </div>
                {topics.length > 0 && (
                  <div className="space-y-1.5">
                    <Label htmlFor="topicId">Topic (optional)</Label>
                    <Controller
                      control={form.control}
                      name="topicId"
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger id="topicId" className="w-full">
                            <SelectValue placeholder="No topic" />
                          </SelectTrigger>
                          <SelectContent>
                            {topics.map((t) => (
                              <SelectItem key={t.id} value={t.id}>
                                {t.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                )}
                <div className="space-y-1.5">
                  <Label htmlFor="startTime">Start time</Label>
                  <Input id="startTime" type="datetime-local" {...form.register("startTime")} />
                  {form.formState.errors.startTime && (
                    <p className="text-destructive text-xs">{form.formState.errors.startTime.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="endTime">End time</Label>
                  <Input id="endTime" type="datetime-local" {...form.register("endTime")} />
                  {form.formState.errors.endTime && (
                    <p className="text-destructive text-xs">{form.formState.errors.endTime.message}</p>
                  )}
                </div>
                {createMutation.isError && (
                  <p className="text-destructive text-sm">{createMutation.error.message}</p>
                )}
                <Button type="submit" disabled={createMutation.isPending} className="w-full">
                  {createMutation.isPending ? "Scheduling..." : "Schedule"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          {isLoading ? (
            <p className="text-muted-foreground text-sm">Loading...</p>
          ) : !classes || classes.length === 0 ? (
            <p className="text-muted-foreground text-sm">No classes scheduled yet.</p>
          ) : (
            <ul className="divide-y">
              {classes.map((c) => (
                <li key={c.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-3.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white">{c.title}</span>
                      <Badge variant="outline">{c.status}</Badge>
                    </div>
                    <p className="text-muted-foreground text-xs mt-0.5">{new Date(c.startTime).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to="/instructor/classes/$classId"
                      params={{ classId: c.id }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200"
                    >
                      📋 Mark Attendance
                    </Link>
                    {c.meetingUrl && (
                      <a
                        href={c.meetingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-indigo-500"
                      >
                        🎥 Start Broadcast
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
