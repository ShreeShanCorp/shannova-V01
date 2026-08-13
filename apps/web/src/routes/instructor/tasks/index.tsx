import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ClipboardList, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
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
import { EmptyState } from "@/components/empty-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCohortCurriculum, useCohorts } from "@/hooks/use-cohorts";
import { useCreateTask, useTasks } from "@/hooks/use-tasks";
import { TASK_TYPES } from "@/types/api";
import type { CurriculumTree } from "@/types/api";

export const Route = createFileRoute("/instructor/tasks/")({
  component: InstructorTasksPage,
});

function flattenTopics(tree: CurriculumTree | undefined) {
  if (!tree) return [];
  return tree.modules.flatMap((m) =>
    m.weeks.flatMap((w) => w.topics.map((t) => ({ id: t.id, label: `${m.title} / ${w.title} / ${t.title}` }))),
  );
}

const taskFormSchema = z.object({
  title: z.string().min(1, "Required"),
  description: z.string().optional(),
  type: z.enum(TASK_TYPES),
  points: z.coerce.number().int().min(0),
  topicId: z.string().optional(),
  dueDate: z.string().optional(),
  rubric: z.array(z.object({ criterion: z.string().min(1), points: z.coerce.number().int().min(0) })),
});
type TaskFormValues = z.infer<typeof taskFormSchema>;

function InstructorTasksPage() {
  const { data: cohortsData } = useCohorts({ pageSize: 100 });
  const cohorts = cohortsData?.data ?? [];
  const [cohortId, setCohortId] = useState("");
  const activeCohortId = cohortId || cohorts[0]?.id || "";

  const { data: tasks, isLoading } = useTasks(activeCohortId);
  const { data: curriculumTree } = useCohortCurriculum(activeCohortId);
  const topics = flattenTopics(curriculumTree);
  const createMutation = useCreateTask();
  const [open, setOpen] = useState(false);

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "ASSIGNMENT",
      points: 100,
      topicId: "",
      dueDate: "",
      rubric: [],
    },
  });
  const rubricFields = useFieldArray({ control: form.control, name: "rubric" });

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Tasks</h1>
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
              <Button disabled={!activeCohortId}>New task</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span className="bg-primary/10 text-primary flex size-7 items-center justify-center rounded-md">
                    <ClipboardList className="size-4" />
                  </span>
                  New task
                </DialogTitle>
              </DialogHeader>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(async (values) => {
                  await createMutation.mutateAsync({
                    cohortId: activeCohortId,
                    title: values.title,
                    description: values.description,
                    type: values.type,
                    points: values.points,
                    topicId: values.topicId || undefined,
                    dueDate: values.dueDate ? new Date(values.dueDate) : undefined,
                    rubric: values.rubric.length > 0 ? values.rubric : undefined,
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
                  <Label htmlFor="description">Description / instructions</Label>
                  <Textarea id="description" rows={4} {...form.register("description")} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="type">Type</Label>
                    <Controller
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger id="type" className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {TASK_TYPES.map((t) => (
                              <SelectItem key={t} value={t}>
                                {t}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="points">Points</Label>
                    <Input id="points" type="number" {...form.register("points")} />
                  </div>
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
                  <Label htmlFor="dueDate">Due date (optional)</Label>
                  <Input id="dueDate" type="datetime-local" {...form.register("dueDate")} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Rubric (optional)</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => rubricFields.append({ criterion: "", points: 0 })}
                    >
                      <Plus /> Add criterion
                    </Button>
                  </div>
                  {rubricFields.fields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                      <Input
                        placeholder="Criterion"
                        {...form.register(`rubric.${index}.criterion` as const)}
                      />
                      <Input
                        type="number"
                        className="w-24"
                        placeholder="Points"
                        {...form.register(`rubric.${index}.points` as const)}
                      />
                      <Button type="button" variant="ghost" size="icon" onClick={() => rubricFields.remove(index)}>
                        <Trash2 />
                      </Button>
                    </div>
                  ))}
                </div>

                {createMutation.isError && (
                  <p className="text-destructive text-sm">{createMutation.error.message}</p>
                )}
                <Button type="submit" disabled={createMutation.isPending} className="w-full">
                  {createMutation.isPending ? "Creating..." : "Create task"}
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
          ) : !tasks?.data || tasks.data.length === 0 ? (
            <EmptyState
              icon={ClipboardList}
              title="No tasks yet"
              description="Create the first task for this cohort to get started."
              action={
                activeCohortId && (
                  <Button onClick={() => setOpen(true)}>
                    <Plus /> New task
                  </Button>
                )
              }
            />
          ) : (
            <ul className="divide-y">
              {tasks.data.map((t) => (
                <li key={t.id} className="flex items-center justify-between py-3">
                  <div>
                    <Link
                      to="/instructor/tasks/$taskId"
                      params={{ taskId: t.id }}
                      className="font-medium hover:underline"
                    >
                      {t.title}
                    </Link>
                    <p className="text-muted-foreground text-sm">
                      {t.points} pts{t.dueDate && ` · due ${new Date(t.dueDate).toLocaleString()}`}
                    </p>
                  </div>
                  <Badge variant="outline">{t.type}</Badge>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
