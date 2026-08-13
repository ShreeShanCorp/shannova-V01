import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/interviewer/")({
  component: InterviewerDashboard,
});

function InterviewerDashboard() {
  return (
    <div className="mx-auto max-w-4xl space-y-4 p-6">
      <h1 className="text-2xl font-semibold">Interviewer dashboard</h1>
      <p className="text-muted-foreground">Scheduled interviews and candidate notes.</p>
    </div>
  );
}
