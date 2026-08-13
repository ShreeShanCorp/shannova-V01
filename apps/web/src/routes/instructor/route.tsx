import { createFileRoute } from "@tanstack/react-router";
import { AppNav } from "@/components/app-nav";
import { RoleGuard } from "@/components/role-guard";

function InstructorLayout() {
  return (
    <div>
      <AppNav
        items={[
          { to: "/instructor", label: "Dashboard", exact: true },
          { to: "/instructor/classes", label: "Classes" },
          { to: "/instructor/tasks", label: "Tasks" },
        ]}
      />
      <RoleGuard allow={["ADMIN", "INSTRUCTOR"]} />
    </div>
  );
}

export const Route = createFileRoute("/instructor")({
  component: InstructorLayout,
});
