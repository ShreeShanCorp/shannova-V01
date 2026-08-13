import { createFileRoute, Link } from "@tanstack/react-router";
import { 
  Users, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Video, 
  FileCheck2, 
  Plus, 
  ArrowUpRight, 
  Star,
  BookOpen,
  MessageSquare
} from "lucide-react";
import { useUpcomingClasses } from "@/hooks/use-classes";
import { useCurrentUser } from "@/hooks/use-current-user";

export const Route = createFileRoute("/instructor/")({
  component: InstructorDashboard,
});

function InstructorDashboard() {
  const { data: dbUser } = useCurrentUser();
  const { data: upcomingClasses } = useUpcomingClasses();

  const instructorName = dbUser 
    ? `${dbUser.firstName || ""} ${dbUser.lastName || ""}`.trim() || dbUser.email
    : "Lead Faculty";

  const classes = upcomingClasses || [];

  return (
    <div className="min-h-[calc(100vh-60px)] bg-[#fafbfc] p-6 lg:p-10 dark:bg-[#090d16]">
      <div className="mx-auto max-w-6xl space-y-8">

        {/* 1. INSTRUCTOR HEADER */}
        <div className="relative overflow-hidden rounded-3xl border border-violet-100 bg-gradient-to-r from-slate-900 via-violet-950 to-indigo-950 p-8 text-white shadow-xl dark:border-slate-800">
          <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
            
            <div className="flex items-center gap-4">
              <div className="flex size-16 items-center justify-center rounded-2xl border-2 border-white/30 bg-violet-600 text-2xl font-black text-white shadow-md">
                {(instructorName?.charAt(0) || "I").toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">Instructor Portal — {instructorName}</h1>
                  <span className="rounded-full bg-violet-500/30 px-2.5 py-0.5 text-xs font-semibold text-violet-200 border border-violet-400/30">
                    Lead Faculty
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-300">
                  Managing: <span className="font-semibold text-white">90-Day Full-Stack PERN Alpha</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/instructor/classes"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-violet-500/25 transition hover:from-violet-500 hover:to-indigo-500 hover:scale-105"
              >
                <Plus className="size-4" />
                Schedule Live Class
              </Link>
            </div>

          </div>
        </div>

        {/* 2. STATS GRID */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Enrolled</span>
              <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                <Users className="size-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">28</span>
              <span className="text-xs font-semibold text-emerald-600">100% Active</span>
            </div>
            <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Web Engineering Alpha
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Grading Queue</span>
              <div className="flex size-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
                <FileCheck2 className="size-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">1</span>
              <span className="text-xs font-semibold text-amber-500">Pending Review</span>
            </div>
            <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Average grading turnaround: 2h
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Scheduled Sessions</span>
              <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                <Calendar className="size-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">{classes.length || 1}</span>
              <span className="text-xs font-semibold text-emerald-600">On Track</span>
            </div>
            <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Next session starting soon
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Cohort Average</span>
              <div className="flex size-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400">
                <Star className="size-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">92.4%</span>
              <span className="text-xs font-semibold text-emerald-600">+4.2%</span>
            </div>
            <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              High assignment pass rate
            </div>
          </div>

        </div>

        {/* 3. INSTRUCTOR WORKSPACE COLUMNS */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* Left 8 Cols: Scheduled Classes & Submissions */}
          <div className="space-y-6 lg:col-span-8">
            
            {/* Live Class Control Center */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                    <Video className="size-4" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Live Classes & Broadcasts</h3>
                </div>
                <Link
                  to="/instructor/classes"
                  className="text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  Manage All Classes →
                </Link>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex flex-col justify-between gap-4 rounded-2xl border border-indigo-100 bg-indigo-50/40 p-4 sm:flex-row sm:items-center dark:border-indigo-950 dark:bg-indigo-950/20">
                  <div>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                      TODAY AT 2:00 PM
                    </span>
                    <h4 className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                      Live Masterclass: High-Performance React Architecture
                    </h4>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                      28 Students RSVP'd • Auto-attendance enabled
                    </p>
                  </div>
                  <a
                    href="https://meet.jit.si/shannova-masterclass-2026"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-500"
                  >
                    <Video className="size-3.5" />
                    Start Broadcast
                  </a>
                </div>
              </div>
            </div>

            {/* Submissions Grading List */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400">
                    <FileCheck2 className="size-4" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Student Submissions</h3>
                </div>
                <Link
                  to="/instructor/tasks"
                  className="text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  View Tasks & Rubrics →
                </Link>
              </div>

              <div className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                      className="size-8 rounded-full object-cover"
                      alt="Alex"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">Alex Rivera</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Glassmorphism Card Component • Submitted 1 hour ago
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                      Graded: 95/100
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right 4 Cols: Quick Actions & Curriculum */}
          <div className="space-y-6 lg:col-span-4">
            
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Quick Teaching Tools</h3>
              <div className="mt-4 space-y-2">
                <Link
                  to="/instructor/classes"
                  className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="size-4 text-indigo-600" />
                    Manage Class Timetable
                  </span>
                  <ArrowUpRight className="size-4 text-slate-400" />
                </Link>

                <Link
                  to="/instructor/tasks"
                  className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <span className="flex items-center gap-2">
                    <FileCheck2 className="size-4 text-violet-600" />
                    Create Coding Assignment
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
