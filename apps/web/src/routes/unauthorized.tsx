import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/unauthorized")({
  component: () => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">Not authorized</h1>
      <p className="text-muted-foreground">Your account doesn't have access to this page.</p>
      <Button asChild>
        <Link to="/">Back home</Link>
      </Button>
    </div>
  ),
});
