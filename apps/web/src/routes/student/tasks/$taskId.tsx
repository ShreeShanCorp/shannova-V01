import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Code2 } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { CodeIDE } from "@/components/code-ide";
import { uploadFile } from "@/api/uploads";
import { useCreateSubmission, useMySubmission } from "@/hooks/use-submissions";
import { useTask } from "@/hooks/use-tasks";

export const Route = createFileRoute("/student/tasks/$taskId")({
  component: StudentTaskDetailPage,
});

function StudentTaskDetailPage() {
  const { taskId } = Route.useParams();
  const { data: task, isLoading: taskLoading } = useTask(taskId);
  const { data: submission, isLoading: submissionLoading } = useMySubmission(taskId);
  const createMutation = useCreateSubmission();

  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  if (taskLoading || submissionLoading || !task) {
    return <div className="mx-auto max-w-3xl p-6 text-muted-foreground text-sm">Loading...</div>;
  }

  const isFileTask = task.type === "FILE";
  const isCodingTask = task.type === "CODING";
  const alreadyGraded = submission?.status === "GRADED";

  async function handleSubmit() {
    setUploadError(null);
    try {
      let fileUrl: string | undefined;
      if (isFileTask) {
        if (!file) return;
        setUploading(true);
        fileUrl = await uploadFile(file);
      }
      await createMutation.mutateAsync({
        taskId,
        content: isFileTask ? undefined : content,
        fileUrl,
      });
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4 p-6">
      <Link
        to="/student/tasks"
        className="text-muted-foreground hover:text-primary inline-flex items-center gap-1 text-sm transition-colors"
      >
        <ArrowLeft className="size-3.5" /> All tasks
      </Link>

      <div>
        <h1 className="flex items-center gap-2 text-2xl font-semibold">
          {isCodingTask && <Code2 className="text-primary size-5" />}
          {task.title}
        </h1>
        {task.description && <p className="text-muted-foreground mt-1 whitespace-pre-wrap">{task.description}</p>}
        <p className="text-muted-foreground text-sm">
          {task.points} pts ·{" "}
          <Badge variant={isCodingTask ? "secondary" : "outline"}>{task.type}</Badge>
          {task.dueDate && ` · due ${new Date(task.dueDate).toLocaleString()}`}
        </p>
      </div>

      {task.rubric && task.rubric.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <h2 className="mb-2 font-semibold">Rubric</h2>
            <ul className="text-sm">
              {task.rubric.map((r, i) => (
                <li key={i} className="flex justify-between border-b py-1 last:border-0">
                  <span>{r.criterion}</span>
                  <span className="text-muted-foreground">{r.points} pts</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Your submission</h2>
            <Badge variant="outline">{submission ? submission.status : "NOT SUBMITTED"}</Badge>
          </div>

          {isCodingTask ? (
            <CodeIDE taskId={taskId} initialCode={submission?.content ?? ""} readOnly={alreadyGraded} />
          ) : (
            <>
              {submission?.content && (
                <pre className="bg-muted max-h-60 overflow-auto rounded-md p-2 text-xs whitespace-pre-wrap">
                  {submission.content}
                </pre>
              )}
              {submission?.fileUrl && (
                <a
                  href={submission.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary text-sm hover:underline"
                >
                  View submitted file
                </a>
              )}

              {!alreadyGraded &&
                (isFileTask ? (
                  <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="text-sm" />
                ) : (
                  <Textarea
                    rows={6}
                    placeholder="Your response"
                    defaultValue={submission?.content ?? ""}
                    onChange={(e) => setContent(e.target.value)}
                  />
                ))}
              {!alreadyGraded && (
                <>
                  {uploadError && <p className="text-destructive text-sm">{uploadError}</p>}
                  {createMutation.isError && (
                    <p className="text-destructive text-sm">{createMutation.error.message}</p>
                  )}
                  <Button
                    onClick={handleSubmit}
                    disabled={uploading || createMutation.isPending || (isFileTask ? !file : !content)}
                  >
                    {uploading ? "Uploading..." : createMutation.isPending ? "Submitting..." : "Submit"}
                  </Button>
                </>
              )}
            </>
          )}

          {alreadyGraded && (
            <div className="space-y-1 rounded-md border p-3">
              <p className="text-sm font-medium">
                Grade: {submission?.grade ?? "—"} / {task.points}
              </p>
              {submission?.feedback && <p className="text-muted-foreground text-sm">{submission.feedback}</p>}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
