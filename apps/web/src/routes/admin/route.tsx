import { createFileRoute } from "@tanstack/react-router";
import { AppNav } from "@/components/app-nav";
import { RoleGuard } from "@/components/role-guard";

function AdminLayout() {
  return (
    <div>
      <AppNav
        items={[
          { to: "/admin", label: "Dashboard", exact: true },
          { to: "/admin/cohorts", label: "Cohorts" },
          { to: "/admin/curriculum", label: "Curriculum" },
        ]}
      />
      <RoleGuard allow={["ADMIN"]} />
    </div>
  );
}

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});
