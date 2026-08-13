import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useApiAuthSync } from "@/hooks/use-api-auth-sync";

function RootLayout() {
  useApiAuthSync();

  return (
    <>
      <Outlet />
      {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />}
    </>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
});
