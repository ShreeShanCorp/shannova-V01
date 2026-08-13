import { createFileRoute, Link } from "@tanstack/react-router";
import { 
  Rocket, 
  Play, 
  CheckCircle2, 
  ArrowRight, 
  BarChart3, 
  Layers, 
  Zap, 
  Users2, 
  Search, 
  Bell, 
  Star, 
  Bot, 
  Check, 
  ShieldCheck, 
  Send, 
  Code2, 
  BookOpen,
  Calendar, 
  LayoutDashboard, 
  GraduationCap, 
  FolderGit2, 
  Terminal, 
  Database 
} from "lucide-react";
import { AppNav } from "@/components/app-nav";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 transition-colors dark:bg-[#090d16] dark:text-slate-100">
      {/* Dynamic Header */}
      <AppNav />

      <main className="relative overflow-hidden">
        {/* Background Glow */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/15 via-violet-500/10 to-pink-500/5 blur-3xl" />

        {/* 1. HERO SECTION */}
        <section className="mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 lg:pt-16 lg:pb-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            
            {/* Left Hero Content */}
            <div className="flex flex-col items-start lg:col-span-6">
              
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/80 px-3.5 py-1 text-xs font-semibold text-indigo-700 shadow-sm backdrop-blur-md dark:border-indigo-900/60 dark:bg-indigo-950/50 dark:text-indigo-300">
                <span className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                  From Campus to Career
                </span>
                <span>Shan Nova Full-Stack Engineering</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
                From Campus to Career. <br />
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:via-violet-400 dark:to-purple-400">
                  Your journey from student to professional starts here.
                </span>
              </h1>

              {/* Subheading */}
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
                Shan Nova brings your 30% Theory, 70% Hands-on Practical coding labs, daily assessments, and 10 weekend projects together — taking you from student to job-ready full-stack engineer.
              </p>

              {/* Hero CTA Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/student"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 hover:from-indigo-500 hover:to-indigo-600"
                >
                  <Rocket className="size-4" />
                  Explore Student Portal
                  <ArrowRight className="size-4" />
                </Link>

                <Link
                  to="/student/curriculum"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <BookOpen className="size-4 text-indigo-600" />
                  View Curriculum
                </Link>
              </div>

              {/* Social Proof */}
              <div className="mt-10 flex items-center gap-4">
                <div className="flex -space-x-2 overflow-hidden">
                  <img
                    className="inline-block size-8 rounded-full ring-2 ring-white dark:ring-slate-900"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="User"
                  />
                  <img
                    className="inline-block size-8 rounded-full ring-2 ring-white dark:ring-slate-900"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                    alt="User"
                  />
                  <img
                    className="inline-block size-8 rounded-full ring-2 ring-white dark:ring-slate-900"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                    alt="User"
                  />
                  <img
                    className="inline-block size-8 rounded-full ring-2 ring-white dark:ring-slate-900"
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
                    alt="User"
                  />
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">100% Practical Proficiency</span> in PERN Stack & TypeScript
                </div>
              </div>

            </div>

            {/* Right Hero: Live Interactive Dashboard Mockup */}
            <div className="lg:col-span-6">
              <div className="relative mx-auto w-full max-w-lg rounded-2xl border border-slate-200/90 bg-white/90 p-5 shadow-2xl backdrop-blur-xl transition-all hover:shadow-indigo-500/10 dark:border-slate-800/90 dark:bg-slate-900/90">
                
                {/* Mockup Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-xs">
                      S
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-white">Shan Nova LMS</span>
                  </div>
                  
                  <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1 text-xs text-slate-400 dark:bg-slate-800">
                    <Search className="size-3.5" />
                    <span>Search 90-Day Curriculum...</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="relative flex size-7 items-center justify-center rounded-lg border border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300">
                      <Bell className="size-3.5" />
                      <span className="absolute top-1 right-1 size-1.5 rounded-full bg-indigo-600" />
                    </div>
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                      className="size-7 rounded-full object-cover"
                      alt="User avatar"
                    />
                  </div>
                </div>

                {/* 3 Metric Pills */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3 dark:border-slate-800 dark:bg-slate-800/50">
                    <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400">Total Program</div>
                    <div className="mt-1 flex items-baseline gap-1.5">
                      <span className="text-lg font-bold text-slate-900 dark:text-white">90 Days</span>
                      <span className="text-[10px] font-semibold text-indigo-600">13 Wks</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3 dark:border-slate-800 dark:bg-slate-800/50">
                    <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400">Practical Ratio</div>
                    <div className="mt-1 flex items-baseline gap-1.5">
                      <span className="text-lg font-bold text-slate-900 dark:text-white">70%</span>
                      <span className="text-[10px] font-semibold text-emerald-600">Hands-on</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3 dark:border-slate-800 dark:bg-slate-800/50">
                    <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400">Weekend Projects</div>
                    <div className="mt-1 flex items-baseline gap-1.5">
                      <span className="text-lg font-bold text-slate-900 dark:text-white">10 + 1</span>
                      <span className="text-[10px] font-semibold text-purple-600">Capstone</span>
                    </div>
                  </div>
                </div>

                {/* Progress Breakdown */}
                <div className="mt-4 grid grid-cols-12 gap-3">
                  
                  <div className="col-span-7 rounded-xl border border-slate-100 bg-white p-3 dark:border-slate-800 dark:bg-slate-800/60">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200">
                      <span>Curriculum Progression</span>
                      <span className="text-[10px] text-indigo-600 font-bold">PERN + TS</span>
                    </div>
                    
                    <div className="mt-3 space-y-2.5">
                      <div>
                        <div className="flex justify-between text-[10px] text-slate-600 dark:text-slate-400">
                          <span>Level 1: Web & JS Foundations</span>
                          <span className="font-semibold">100%</span>
                        </div>
                        <div className="mt-1 h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-700">
                          <div className="h-1.5 rounded-full bg-emerald-600" style={{ width: "100%" }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[10px] text-slate-600 dark:text-slate-400">
                          <span>Level 2: TypeScript Deep Dive</span>
                          <span className="font-semibold">85%</span>
                        </div>
                        <div className="mt-1 h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-700">
                          <div className="h-1.5 rounded-full bg-indigo-600" style={{ width: "85%" }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[10px] text-slate-600 dark:text-slate-400">
                          <span>Level 3: Node.js & PostgreSQL</span>
                          <span className="font-semibold">70%</span>
                        </div>
                        <div className="mt-1 h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-700">
                          <div className="h-1.5 rounded-full bg-violet-600" style={{ width: "70%" }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-5 flex flex-col items-center justify-center rounded-xl border border-slate-100 bg-white p-3 text-center dark:border-slate-800 dark:bg-slate-800/60">
                    <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400">Score & Mastery</div>
                    <div className="relative mt-2 flex size-16 items-center justify-center">
                      <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-slate-100 dark:text-slate-700"
                          strokeWidth="3.5"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-indigo-600"
                          strokeDasharray="95, 100"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <span className="absolute text-xs font-bold text-slate-900 dark:text-white">95%</span>
                    </div>
                    <span className="mt-1 text-[9px] font-semibold text-emerald-600">Top 5% Cohort</span>
                  </div>

                </div>

                {/* Interactive Drill Notification */}
                <div className="mt-3 flex items-center justify-between rounded-xl bg-gradient-to-r from-indigo-50 to-violet-50 p-2.5 border border-indigo-100/80 dark:from-indigo-950/40 dark:to-violet-950/30 dark:border-indigo-900/40">
                  <div className="flex items-center gap-2">
                    <div className="flex size-6 items-center justify-center rounded-md bg-indigo-600 text-white">
                      <Bot className="size-3.5" />
                    </div>
                    <span className="text-[11px] font-medium text-indigo-950 dark:text-indigo-200">
                      Daily Assessment Ready (5 MCQs + 1 Coding Drill)
                    </span>
                  </div>
                  <Link to="/student/curriculum" className="text-[10px] font-bold text-indigo-600 hover:underline cursor-pointer">
                    Start Drill →
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* 2. TECH STACK MARQUEE */}
        <section className="border-y border-slate-200/80 bg-white/50 py-8 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/40">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
            <p className="text-xs font-bold tracking-wider text-slate-400 uppercase dark:text-slate-500">
              Mastering Modern Full-Stack Production Technologies
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-8 text-slate-600 sm:gap-14 dark:text-slate-400">
              <span className="text-sm font-bold tracking-tight">PostgreSQL</span>
              <span className="text-sm font-bold tracking-tight">Express.js</span>
              <span className="text-sm font-bold tracking-tight">React 19</span>
              <span className="text-sm font-bold tracking-tight">Node.js LTS</span>
              <span className="text-sm font-bold tracking-tight">TypeScript</span>
              <span className="text-sm font-bold tracking-tight">Tailwind CSS</span>
              <span className="text-sm font-bold tracking-tight">DBeaver</span>
              <span className="text-sm font-bold tracking-tight">Google Cloud</span>
            </div>
          </div>
        </section>

        {/* 3. 3-PORTAL ARCHITECTURE */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="text-center">
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              3 TAILORED EXPERIENCES
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Dedicated Interfaces for Every Role
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600 dark:text-slate-400">
              Each user gets a purpose-built portal with strictly isolated navigations and workflows.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            
            {/* Student Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div className="flex size-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                <GraduationCap className="size-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">Student Portal</h3>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Learn 30% Theory, code in the 70% Practical Lab with live Monaco IDE, solve daily 5-MCQ assessments, and submit 10 weekend projects.
              </p>
              <Link
                to="/student"
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:underline"
              >
                Launch Student Portal →
              </Link>
            </div>

            {/* Instructor Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div className="flex size-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400">
                <Users2 className="size-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">Instructor Workspace</h3>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Schedule live masterclasses, host broadcasts, review student code submissions, assign scores, and track cohort attendance.
              </p>
              <Link
                to="/instructor"
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-violet-600 hover:underline"
              >
                Launch Instructor Workspace →
              </Link>
            </div>

            {/* Admin Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div className="flex size-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
                <ShieldCheck className="size-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">Admin Console</h3>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Manage cohorts, architect curriculum modules, oversee student enrollments, and launch Prisma Studio for direct DB inspection.
              </p>
              <Link
                to="/admin"
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:underline"
              >
                Launch Admin Console →
              </Link>
            </div>

          </div>
        </section>

        {/* 4. FOOTER */}
        <footer className="border-t border-slate-200 bg-white pt-14 pb-10 dark:border-slate-800 dark:bg-slate-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-lg bg-indigo-600 text-white">
                  <Rocket className="size-4" />
                </div>
                <span className="text-base font-bold text-slate-900 dark:text-white">Shan Nova LMS</span>
                <span className="text-xs text-slate-400">• From Campus to Career</span>
              </div>
              <p className="text-xs text-slate-400">
                © 2026 Shan Nova under Shan Enterprises. All rights reserved.
              </p>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}
