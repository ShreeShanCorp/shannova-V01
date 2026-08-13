import { createFileRoute, Link } from "@tanstack/react-router";
import { ListChecks, Users } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/empty-state";
import { useMyEnrollments } from "@/hooks/use-enrollments";
import { useMySubmission } from "@/hooks/use-submissions";
import { useTasks } from "@/hooks/use-tasks";
import type { TaskWithTopic } from "@/api/tasks";

export const Route = createFileRoute("/student/tasks/")({
  component: StudentTasksPage,
});

function StudentTasksPage() {
  const { data: enrollments, isLoading } = useMyEnrollments();
  const cohortId = enrollments?.[0]?.cohortId ?? "";
  const { data: tasksResult, isLoading: tasksLoading } = useTasks(cohortId);

  if (isLoading) {
    return <div className="mx-auto max-w-3xl p-6 text-muted-foreground text-sm">Loading...</div>;
  }

  if (!enrollments || enrollments.length === 0) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <h1 className="text-2xl font-semibold">Tasks</h1>
        <EmptyState
          icon={Users}
          title="Not enrolled yet"
          description="You're not enrolled in a cohort yet. Ask an admin to enroll you."
        />
      </div>
    );
  }

  const tasks = tasksResult?.data ?? [];

  return (
    <div className="mx-auto max-w-3xl space-y-4 p-6">
      <h1 className="text-2xl font-semibold">Tasks</h1>
      <Card>
        <CardContent className="pt-6">
          {tasksLoading ? (
            <p className="text-muted-foreground text-sm">Loading...</p>
          ) : tasks.length === 0 ? (
            <EmptyState icon={ListChecks} title="No tasks assigned yet" />
          ) : (
            <ul className="divide-y">
              {tasks.map((t) => (
                <TaskRow key={t.id} task={t} />
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function TaskRow({ task }: { task: TaskWithTopic }) {
  const { data: submission } = useMySubmission(task.id);
  const [now] = useState(() => new Date());
  const overdue = task.dueDate && new Date(task.dueDate) < now && !submission;

  return (
    <li className="flex items-center justify-between py-3">
      <div>
        <Link to="/student/tasks/$taskId" params={{ taskId: task.id }} className="font-medium hover:underline">
          {task.title}
        </Link>
        <p className="text-muted-foreground text-sm">
          {task.points} pts{task.dueDate && ` · due ${new Date(task.dueDate).toLocaleString()}`}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {overdue && <Badge variant="destructive">Overdue</Badge>}
        <Badge variant="outline">{submission ? submission.status : "NOT SUBMITTED"}</Badge>
      </div>
    </li>
  );
}
