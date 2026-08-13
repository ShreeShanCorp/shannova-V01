import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Inbox } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/empty-state";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateSubmission } from "@/hooks/use-submissions";
import { useSubmissionsForTask } from "@/hooks/use-submissions";
import { useTask } from "@/hooks/use-tasks";
import { SUBMISSION_STATUSES } from "@shannova/shared-types";
import type { SubmissionStatus } from "@/types/api";
import type { SubmissionWithUser } from "@/api/submissions";

export const Route = createFileRoute("/instructor/tasks/$taskId")({
  component: TaskGradingPage,
});

function TaskGradingPage() {
  const { taskId } = Route.useParams();
  const { data: task, isLoading: taskLoading } = useTask(taskId);
  const { data: submissions, isLoading: submissionsLoading } = useSubmissionsForTask(taskId);

  if (taskLoading || !task) {
    return <div className="mx-auto max-w-3xl p-6 text-muted-foreground text-sm">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4 p-6">
      <Link
        to="/instructor/tasks"
        className="text-muted-foreground hover:text-primary inline-flex items-center gap-1 text-sm transition-colors"
      >
        <ArrowLeft className="size-3.5" /> All tasks
      </Link>

      <div>
        <h1 className="text-2xl font-semibold">{task.title}</h1>
        {task.description && <p className="text-muted-foreground mt-1">{task.description}</p>}
        <p className="text-muted-foreground text-sm">
          {task.points} pts · <Badge variant={task.type === "CODING" ? "secondary" : "outline"}>{task.type}</Badge>
          {task.dueDate && ` · due ${new Date(task.dueDate).toLocaleString()}`}
        </p>
      </div>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <h2 className="font-semibold">Submissions</h2>
          {submissionsLoading ? (
            <p className="text-muted-foreground text-sm">Loading...</p>
          ) : !submissions || submissions.length === 0 ? (
            <EmptyState icon={Inbox} title="No submissions yet" />
          ) : (
            <div className="space-y-4">
              {submissions.map((s) => (
                <SubmissionRow key={s.id} submission={s} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function SubmissionRow({ submission }: { submission: SubmissionWithUser }) {
  const updateMutation = useUpdateSubmission();
  const [grade, setGrade] = useState(submission.grade?.toString() ?? "");
  const [feedback, setFeedback] = useState(submission.feedback ?? "");
  const [status, setStatus] = useState<SubmissionStatus>(submission.status);

  return (
    <div className="space-y-2 rounded-lg border p-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{submission.user.email}</span>
        <Select value={status} onValueChange={(v) => setStatus(v as SubmissionStatus)}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SUBMISSION_STATUSES.map((st) => (
              <SelectItem key={st} value={st}>
                {st}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {submission.content && (
        <pre className="bg-muted max-h-40 overflow-auto rounded-md p-2 text-xs whitespace-pre-wrap">
          {submission.content}
        </pre>
      )}
      {submission.fileUrl && (
        <a href={submission.fileUrl} target="_blank" rel="noreferrer" className="text-primary text-sm hover:underline">
          View submitted file
        </a>
      )}

      <div className="flex items-end gap-2">
        <div className="w-24 space-y-1.5">
          <label className="text-muted-foreground text-xs">Grade</label>
          <Input type="number" value={grade} onChange={(e) => setGrade(e.target.value)} />
        </div>
        <div className="flex-1 space-y-1.5">
          <label className="text-muted-foreground text-xs">Feedback</label>
          <Textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} rows={1} />
        </div>
        <Button
          disabled={updateMutation.isPending}
          onClick={() =>
            updateMutation.mutate({
              id: submission.id,
              input: {
                status,
                feedback: feedback || undefined,
                grade: grade === "" ? undefined : Number(grade),
              },
            })
          }
        >
          Save
        </Button>
      </div>
    </div>
  );
}
