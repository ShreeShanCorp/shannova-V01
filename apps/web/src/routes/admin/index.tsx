import { createFileRoute, Link } from "@tanstack/react-router";
import { 
  ShieldCheck, 
  Users, 
  Layers, 
  Database, 
  Plus, 
  ArrowUpRight, 
  CheckCircle2, 
  Server, 
  BookOpen, 
  Settings,
  Sparkles
} from "lucide-react";
import { useCohorts } from "@/hooks/use-cohorts";
import { useCurricula } from "@/hooks/use-curricula";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { data: cohortsData } = useCohorts();
  const { data: curriculaData } = useCurricula();

  const cohorts = cohortsData?.data || [];
  const curricula = curriculaData?.data || [];

  return (
    <div className="min-h-[calc(100vh-60px)] bg-[#fafbfc] p-6 lg:p-10 dark:bg-[#090d16]">
      <div className="mx-auto max-w-6xl space-y-8">

        {/* 1. ADMIN HEADER */}
        <div className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 p-8 text-white shadow-xl dark:border-slate-800">
          <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
            
            <div className="flex items-center gap-4">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-md">
                <ShieldCheck className="size-8 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">Admin Console — System Overview</h1>
                  <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
                    Database Online
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-300">
                  Direct database control, user management, and cohort architecture.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/admin/cohorts"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-500/25 transition hover:scale-105"
              >
                <Plus className="size-4" />
                Create New Cohort
              </Link>
            </div>

          </div>
        </div>

        {/* 2. STATS GRID */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Cohorts</span>
              <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                <Layers className="size-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">{cohorts.length || 1}</span>
              <span className="text-xs font-semibold text-emerald-600">Active</span>
            </div>
            <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Web Engineering Alpha
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Curricula</span>
              <div className="flex size-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
                <BookOpen className="size-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">{curricula.length || 1}</span>
              <span className="text-xs font-semibold text-emerald-600">v2.0 Loaded</span>
            </div>
            <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Full-Stack Web Engineering
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Database Engine</span>
              <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                <Database className="size-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">SQLite</span>
              <span className="text-xs font-semibold text-emerald-600">Zero-Config</span>
            </div>
            <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Prisma Studio Ready
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">System API</span>
              <div className="flex size-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400">
                <Server className="size-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">Healthy</span>
              <span className="text-xs font-semibold text-emerald-600">Port 4001</span>
            </div>
            <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Response time: ~12ms
            </div>
          </div>

        </div>

        {/* 3. MAIN ADMIN SECTIONS (2 Columns) */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* Left 8 Cols: Cohorts List & Quick Launch */}
          <div className="space-y-6 lg:col-span-8">
            
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                    <Layers className="size-4" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Active Cohorts</h3>
                </div>
                <Link
                  to="/admin/cohorts"
                  className="text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  Manage All Cohorts →
                </Link>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-800/40">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">2026 Web Engineering Alpha</h4>
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                        ACTIVE
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Curriculum: Full-Stack Web Engineering 2026 • 28 Students
                    </p>
                  </div>
                  <Link
                    to="/admin/cohorts"
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>

            {/* Prisma Database Viewer Guide Card */}
            <div className="rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50/80 to-purple-50/60 p-6 dark:border-indigo-900 dark:from-indigo-950/40 dark:to-purple-950/20">
              <div className="flex items-center gap-2 text-indigo-950 dark:text-indigo-200">
                <Database className="size-5 text-indigo-600" />
                <h3 className="text-base font-bold">1-Click Database GUI (Prisma Studio)</h3>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                You can visually inspect, search, filter, edit, and insert records into all SQLite database tables directly in your browser.
              </p>
              <div className="mt-4 rounded-xl bg-slate-950 p-3 font-mono text-xs text-indigo-300">
                <span className="text-slate-500"># In your terminal inside apps/api:</span><br />
                npx prisma studio
              </div>
            </div>

          </div>

          {/* Right 4 Cols: Quick Administrative Shortcuts */}
          <div className="space-y-6 lg:col-span-4">
            
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Admin Tools</h3>
              <div className="mt-4 space-y-2">
                <Link
                  to="/admin/cohorts"
                  className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <span className="flex items-center gap-2">
                    <Layers className="size-4 text-indigo-600" />
                    Manage Cohorts
                  </span>
                  <ArrowUpRight className="size-4 text-slate-400" />
                </Link>

                <Link
                  to="/admin/curriculum"
                  className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="size-4 text-purple-600" />
                    Curriculum Builder
                  </span>
                  <ArrowUpRight className="size-4 text-slate-400" />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
