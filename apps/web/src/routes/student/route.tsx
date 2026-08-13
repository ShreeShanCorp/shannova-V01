import { createFileRoute } from "@tanstack/react-router";
import { AppNav } from "@/components/app-nav";
import { RoleGuard } from "@/components/role-guard";

function StudentLayout() {
  return (
    <div>
      <AppNav
        items={[
          { to: "/student", label: "Dashboard", exact: true },
          { to: "/student/curriculum", label: "Curriculum" },
          { to: "/student/tasks", label: "Tasks" },
        ]}
      />
      <RoleGuard allow={["ADMIN", "INSTRUCTOR", "STUDENT"]} />
    </div>
  );
}

export const Route = createFileRoute("/student")({
  component: StudentLayout,
});
