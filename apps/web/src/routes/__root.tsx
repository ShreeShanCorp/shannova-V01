import { createRootRoute, Outlet, Link } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useApiAuthSync } from "@/hooks/use-api-auth-sync";
import { ErrorBoundary } from "@/components/error-boundary";
import { Compass, Home, ArrowLeft } from "lucide-react";

function NotFoundPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 text-slate-100 p-6">
      <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-xl text-center">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-6">
          <Compass className="w-8 h-8" />
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">404</h1>
        <h2 className="text-lg font-semibold text-slate-200 mb-3">Page Not Found</h2>
        
        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
          The learning path or module you requested doesn't exist or may have been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/student"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all text-sm"
          >
            <Home className="w-4 h-4" />
            Go to Portal
          </Link>
          <Link
            to="/sign-in"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-medium text-slate-300 transition-all text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

function RootLayout() {
  useApiAuthSync();

  return (
    <ErrorBoundary>
      <Outlet />
      {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />}
    </ErrorBoundary>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
});
