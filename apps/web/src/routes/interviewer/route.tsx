import { createFileRoute } from "@tanstack/react-router";
import { RoleGuard } from "@/components/role-guard";

export const Route = createFileRoute("/interviewer")({
  component: () => <RoleGuard allow={["ADMIN", "INTERVIEWER"]} />,
});
