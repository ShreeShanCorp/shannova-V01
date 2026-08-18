import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
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
  Database,
  Sparkles,
  ChevronRight,
  LogIn,
  UserPlus,
  Trophy,
  Cpu,
  Laptop,
  MessageSquare,
  HelpCircle,
  ChevronDown
} from "lucide-react";
import { AppNav } from "@/components/app-nav";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  const [activeHeroTab, setActiveHeroTab] = useState<"curriculum" | "code" | "mcq">("curriculum");
  const [activePortalTab, setActivePortalTab] = useState<"student" | "instructor" | "admin">("student");
  const [codeAnswer, setCodeAnswer] = useState('const greet = (name: string): string => `Hello, ${name}!`;');
  const [codeTested, setCodeTested] = useState(false);
  const [mcqSelected, setMcqSelected] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleRunCode = () => {
    setCodeTested(true);
    setTimeout(() => setCodeTested(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 transition-colors dark:bg-[#090d16] dark:text-slate-100 font-sans selection:bg-indigo-500/20 selection:text-indigo-600">
      {/* Header Navigation */}
      <AppNav />

      <main className="relative overflow-hidden">
        {/* Ambient Hero Glow Effects */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[650px] w-[1100px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/20 via-violet-500/15 to-purple-500/10 blur-3xl dark:from-indigo-600/15 dark:via-violet-600/10 dark:to-purple-600/5" />
        <div className="pointer-events-none absolute top-[600px] right-0 -z-10 h-[450px] w-[450px] rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/5" />
        <div className="pointer-events-none absolute top-[1200px] left-0 -z-10 h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-500/5" />

        {/* 1. HERO SECTION */}
        <section className="mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 lg:pt-20 lg:pb-28">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            
            {/* Left Hero Content */}
            <div className="flex flex-col items-start lg:col-span-6">
              
              {/* Animated Announcement Pill */}
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-indigo-200/80 bg-gradient-to-r from-indigo-50/90 via-violet-50/90 to-purple-50/90 px-4 py-1.5 text-xs font-bold text-indigo-900 shadow-sm backdrop-blur-md dark:border-indigo-900/60 dark:bg-slate-900/80 dark:text-indigo-300">
                <span className="flex size-2 rounded-full bg-indigo-600 animate-ping" />
                <span className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-2.5 py-0.5 text-[10px] font-black text-white uppercase tracking-wider">
                  2026 COHORT OPEN
                </span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  30% Theory • 70% Practical Code Labs
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white leading-[1.1]">
                From Campus to Career. <br />
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:via-violet-400 dark:to-purple-400">
                  Your Engineering Journey Starts Here.
                </span>
              </h1>

              {/* Subheading */}
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
                Shan Nova combines interactive coding labs, daily 5-MCQ assessments, and 10 weekend projects — turning computer science students into high-performing, job-ready full-stack software engineers.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  to="/student"
                  className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-indigo-500/25 transition-all hover:scale-[1.02] hover:shadow-indigo-500/40 active:scale-[0.98]"
                >
                  <Rocket className="size-4 animate-bounce" />
                  Explore Student Portal
                  <ArrowRight className="size-4" />
                </Link>

                <Link
                  to="/sign-in"
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/90 px-5 py-4 text-sm font-bold text-slate-800 shadow-sm backdrop-blur-md transition-all hover:bg-slate-50 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <LogIn className="size-4 text-indigo-600 dark:text-indigo-400" />
                  Sign In / Login
                </Link>

                <Link
                  to="/sign-up"
                  className="inline-flex items-center gap-1.5 rounded-2xl border border-indigo-100 bg-indigo-50/50 px-4 py-4 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100 dark:border-indigo-900/50 dark:bg-indigo-950/40 dark:text-indigo-300"
                >
                  <UserPlus className="size-4" />
                  Register
                </Link>
              </div>

              {/* Social Proof & Metrics */}
              <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-slate-200/60 pt-6 dark:border-slate-800/60">
                <div className="flex -space-x-2 overflow-hidden">
                  <img
                    className="inline-block size-9 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="User"
                  />
                  <img
                    className="inline-block size-9 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                    alt="User"
                  />
                  <img
                    className="inline-block size-9 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                    alt="User"
                  />
                  <img
                    className="inline-block size-9 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover"
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
                    alt="User"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                    <Star className="size-3.5 fill-amber-400" />
                    <Star className="size-3.5 fill-amber-400" />
                    <Star className="size-3.5 fill-amber-400" />
                    <Star className="size-3.5 fill-amber-400" />
                    <Star className="size-3.5 fill-amber-400" />
                    <span className="ml-1 text-slate-800 dark:text-white font-black">5.0</span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-bold text-slate-800 dark:text-slate-200">500+ Engineers</span> trained across PERN & TypeScript
                  </div>
                </div>
              </div>

            </div>

            {/* Right Hero: Live Interactive Dashboard & IDE Mockup */}
            <div className="lg:col-span-6">
              <div className="relative mx-auto w-full max-w-xl rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-2xl backdrop-blur-2xl transition-all hover:shadow-indigo-500/10 dark:border-slate-800/80 dark:bg-slate-900/90">
                
                {/* Mockup Header & Tab Selector */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-600 text-white font-bold text-xs shadow-md">
                      S
                    </div>
                    <span className="text-xs font-black tracking-wide text-slate-800 dark:text-white">Shan Nova LMS</span>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                      LIVE DEMO
                    </span>
                  </div>
                  
                  {/* Interactive Tab Switcher */}
                  <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
                    <button
                      type="button"
                      onClick={() => setActiveHeroTab("curriculum")}
                      className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition ${
                        activeHeroTab === "curriculum"
                          ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-400"
                          : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                      }`}
                    >
                      Progress
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveHeroTab("code")}
                      className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition ${
                        activeHeroTab === "code"
                          ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-400"
                          : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                      }`}
                    >
                      Code Lab
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveHeroTab("mcq")}
                      className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition ${
                        activeHeroTab === "mcq"
                          ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-400"
                          : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                      }`}
                    >
                      MCQ Assessment
                    </button>
                  </div>
                </div>

                {/* Tab 1: Curriculum Progression */}
                {activeHeroTab === "curriculum" && (
                  <div className="mt-4 space-y-4">
                    {/* Metric Pills */}
                    <div className="grid grid-cols-3 gap-2.5">
                      <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800/80 dark:bg-slate-800/40">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider dark:text-slate-400">Duration</div>
                        <div className="mt-1 flex items-baseline gap-1">
                          <span className="text-lg font-black text-slate-900 dark:text-white">90 Days</span>
                          <span className="text-[10px] font-bold text-indigo-600">13 Wks</span>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800/80 dark:bg-slate-800/40">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider dark:text-slate-400">Practical Ratio</div>
                        <div className="mt-1 flex items-baseline gap-1">
                          <span className="text-lg font-black text-slate-900 dark:text-white">70%</span>
                          <span className="text-[10px] font-bold text-emerald-600">Hands-on</span>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800/80 dark:bg-slate-800/40">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider dark:text-slate-400">Projects</div>
                        <div className="mt-1 flex items-baseline gap-1">
                          <span className="text-lg font-black text-slate-900 dark:text-white">10 + 1</span>
                          <span className="text-[10px] font-bold text-purple-600">Capstone</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Breakdown */}
                    <div className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-800/60">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                        <span>Curriculum Progression</span>
                        <span className="text-[10px] text-indigo-600 font-bold">PERN + TypeScript</span>
                      </div>
                      
                      <div className="mt-3 space-y-3">
                        <div>
                          <div className="flex justify-between text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                            <span>Level 1: Web & JS Foundations</span>
                            <span className="font-bold text-emerald-600">100% Complete</span>
                          </div>
                          <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                            <div className="h-full rounded-full bg-emerald-500" style={{ width: "100%" }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                            <span>Level 2: TypeScript Deep Dive</span>
                            <span className="font-bold text-indigo-600">85% In Progress</span>
                          </div>
                          <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                            <div className="h-full rounded-full bg-indigo-600" style={{ width: "85%" }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                            <span>Level 3: Node.js & PostgreSQL</span>
                            <span className="font-bold text-violet-600">70% Next</span>
                          </div>
                          <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                            <div className="h-full rounded-full bg-violet-600" style={{ width: "70%" }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Live Code Lab */}
                {activeHeroTab === "code" && (
                  <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-200">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[10px] text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Code2 className="size-3.5 text-indigo-400" />
                        <span>solution.ts</span>
                      </div>
                      <span className="text-emerald-400">TypeScript 5.6</span>
                    </div>

                    <div className="mt-3 space-y-1">
                      <p className="text-slate-500">// Task: Define a strongly typed greeting function</p>
                      <input
                        type="text"
                        value={codeAnswer}
                        onChange={(e) => setCodeAnswer(e.target.value)}
                        className="w-full rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs text-indigo-300 border border-slate-800 focus:outline-none focus:border-indigo-500 font-mono"
                      />
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handleRunCode}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-1.5 text-[11px] font-bold text-white transition hover:bg-indigo-500"
                      >
                        <Play className="size-3 fill-white" />
                        Run Unit Tests
                      </button>

                      {codeTested && (
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 animate-pulse">
                          <CheckCircle2 className="size-4" />
                          <span>All 3 Tests Passed (0.12s)</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Tab 3: Daily MCQ Assessment */}
                {activeHeroTab === "mcq" && (
                  <div className="mt-4 rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between text-[11px] font-bold text-indigo-600">
                      <span>DAILY DRILL • QUESTION 1 OF 5</span>
                      <span>+10 XP</span>
                    </div>
                    <h4 className="mt-2 text-xs font-bold text-slate-900 dark:text-white">
                      Which TypeScript feature guarantees strictly immutable object properties at compile time?
                    </h4>

                    <div className="mt-3 space-y-2">
                      {[
                        "readonly modifier / Readonly<T>",
                        "Object.freeze() method",
                        "const variable assertion",
                        "sealed class type"
                      ].map((option, idx) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setMcqSelected(idx)}
                          className={`flex w-full items-center justify-between rounded-xl border p-2.5 text-left text-xs transition ${
                            mcqSelected === idx
                              ? idx === 0
                                ? "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold dark:bg-emerald-950/50 dark:text-emerald-200"
                                : "border-rose-500 bg-rose-50 text-rose-950 font-bold dark:bg-rose-950/50 dark:text-rose-200"
                              : "border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-300"
                          }`}
                        >
                          <span>{option}</span>
                          {mcqSelected === idx && (
                            idx === 0 ? (
                              <CheckCircle2 className="size-4 text-emerald-600" />
                            ) : (
                              <span className="text-[10px] font-bold text-rose-600">Incorrect</span>
                            )
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bottom Live Drill Banner */}
                <div className="mt-4 flex items-center justify-between rounded-2xl bg-gradient-to-r from-indigo-50 via-violet-50 to-purple-50 p-3 border border-indigo-100/80 dark:from-indigo-950/50 dark:via-violet-950/40 dark:to-purple-950/30 dark:border-indigo-900/40">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-7 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md">
                      <Bot className="size-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">Daily Practical Drill Ready</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">5 MCQs + 1 Monaco IDE Lab</div>
                    </div>
                  </div>
                  <Link
                    to="/student/tasks"
                    className="inline-flex items-center gap-1 rounded-xl bg-white px-3 py-1.5 text-[11px] font-bold text-indigo-600 shadow-sm transition hover:bg-indigo-50 dark:bg-slate-900 dark:text-indigo-400 dark:hover:bg-slate-800"
                  >
                    Start Drill <ChevronRight className="size-3.5" />
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* 2. TECH STACK MARQUEE */}
        <section className="border-y border-slate-200/80 bg-white/60 py-10 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/40">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
            <p className="text-xs font-extrabold tracking-widest text-slate-400 uppercase dark:text-slate-500">
              Mastering Industry-Standard Full-Stack Technologies
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-14">
              {[
                { name: "PostgreSQL", desc: "Relational DB", color: "text-sky-600 dark:text-sky-400" },
                { name: "Express.js", desc: "Node REST API", color: "text-slate-700 dark:text-slate-300" },
                { name: "React 19", desc: "Frontend UI", color: "text-cyan-600 dark:text-cyan-400" },
                { name: "Node.js LTS", desc: "Backend Runtime", color: "text-emerald-600 dark:text-emerald-400" },
                { name: "TypeScript", desc: "Type Safety", color: "text-blue-600 dark:text-blue-400" },
                { name: "Tailwind CSS", desc: "Design System", color: "text-teal-600 dark:text-teal-400" },
                { name: "DBeaver / SQL", desc: "DB Management", color: "text-amber-600 dark:text-amber-400" },
                { name: "Google Cloud", desc: "Deployment & CI/CD", color: "text-red-500 dark:text-red-400" }
              ].map((tech) => (
                <div key={tech.name} className="flex flex-col items-center group cursor-pointer">
                  <span className={`text-base font-black tracking-tight ${tech.color} transition-transform group-hover:scale-110`}>
                    {tech.name}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                    {tech.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. 30% THEORY / 70% PRACTICAL METHODOLOGY */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-extrabold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
              <Sparkles className="size-3.5" />
              THE SHAN NOVA METHODOLOGY
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
              Built for Practical Mastery, Not Just Video Watching
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300">
              Most courses trap you in tutorial hell. Shan Nova enforces active learning through hands-on code labs, daily tests, and real projects.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            
            <div className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                <BookOpen className="size-7" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">30% Theory Concepts</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Concise, high-impact theory modules designed to deliver fundamental understanding without fluff or outdated patterns.
              </p>
              <ul className="mt-6 space-y-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-500" />
                  <span>Curated Architecture Guides</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-500" />
                  <span>Daily 5-MCQ Recall Tests</span>
                </li>
              </ul>
            </div>

            <div className="relative rounded-3xl border-2 border-indigo-500/80 bg-gradient-to-b from-indigo-50/30 to-white p-8 shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl dark:from-indigo-950/20 dark:to-slate-900">
              <span className="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-0.5 text-[10px] font-black text-white uppercase tracking-wider shadow-md">
                CORE FOCUS
              </span>
              <div className="flex size-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/30">
                <Terminal className="size-7" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">70% Hands-on Practical</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Write real code in our integrated Monaco browser IDE with instant unit test verification and automated scoring.
              </p>
              <ul className="mt-6 space-y-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Integrated Browser IDE</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Automated Unit Test Grading</span>
                </li>
              </ul>
            </div>

            <div className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
                <FolderGit2 className="size-7" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">10 Weekend Projects</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Build 10 real-world production projects plus 1 comprehensive capstone to showcase directly on your GitHub portfolio.
              </p>
              <ul className="mt-6 space-y-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-purple-500" />
                  <span>Full-Stack SaaS Applications</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-purple-500" />
                  <span>Instructor Review & Feedback</span>
                </li>
              </ul>
            </div>

          </div>
        </section>

        {/* 4. 3 DEDICATED PORTALS SHOWCASE */}
        <section className="bg-slate-100/70 py-20 dark:bg-slate-900/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:py-8">
            <div className="text-center">
              <span className="rounded-full bg-violet-100 px-3.5 py-1 text-xs font-extrabold text-violet-700 dark:bg-violet-950/60 dark:text-violet-300">
                TAILORED PORTAL ARCHITECTURE
              </span>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                Purpose-Built Experiences for Every Role
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300">
                Select a role to preview the customized environment and isolated workflow built specifically for students, instructors, and admins.
              </p>
            </div>

            {/* Role Switcher Tabs */}
            <div className="mt-10 flex justify-center">
              <div className="inline-flex rounded-2xl bg-white p-1.5 shadow-md dark:bg-slate-800">
                <button
                  type="button"
                  onClick={() => setActivePortalTab("student")}
                  className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition ${
                    activePortalTab === "student"
                      ? "bg-indigo-600 text-white shadow-md"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                  }`}
                >
                  <GraduationCap className="size-4" />
                  Student Portal
                </button>
                <button
                  type="button"
                  onClick={() => setActivePortalTab("instructor")}
                  className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition ${
                    activePortalTab === "instructor"
                      ? "bg-violet-600 text-white shadow-md"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                  }`}
                >
                  <Users2 className="size-4" />
                  Instructor Workspace
                </button>
                <button
                  type="button"
                  onClick={() => setActivePortalTab("admin")}
                  className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition ${
                    activePortalTab === "admin"
                      ? "bg-purple-600 text-white shadow-md"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                  }`}
                >
                  <ShieldCheck className="size-4" />
                  Admin Console
                </button>
              </div>
            </div>

            {/* Portal Tab Card Content */}
            <div className="mt-10 mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
              {activePortalTab === "student" && (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-12 items-center">
                  <div className="md:col-span-7">
                    <span className="rounded-md bg-indigo-100 px-2.5 py-1 text-[10px] font-bold text-indigo-700 uppercase tracking-wider dark:bg-indigo-950 dark:text-indigo-300">
                      STUDENT DASHBOARD
                    </span>
                    <h3 className="mt-3 text-2xl font-black text-slate-950 dark:text-white">
                      Track Progress, Solve Drills & Submit Projects
                    </h3>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Students get instant access to daily curriculum modules, interactive Monaco editor coding labs, instant MCQ tests, and weekend submission portals with real-time feedback.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">Monaco IDE Lab</span>
                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">Daily 5-MCQ Drill</span>
                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">Project Submissions</span>
                    </div>
                    <div className="mt-8">
                      <Link
                        to="/student"
                        className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-xs font-bold text-white shadow-md transition hover:bg-indigo-500"
                      >
                        Launch Student Portal <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  </div>
                  <div className="md:col-span-5 rounded-2xl bg-indigo-50/60 p-5 border border-indigo-100 dark:bg-indigo-950/40 dark:border-indigo-900/50">
                    <div className="flex items-center gap-3 border-b border-indigo-100/80 pb-3 dark:border-indigo-900">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-sm">
                        ST
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">Alex Morgan</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">Student • Cohort #4</div>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-600 dark:text-slate-400">Streak</span>
                        <span className="font-bold text-amber-500">🔥 14 Days</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-600 dark:text-slate-400">Average Score</span>
                        <span className="font-bold text-emerald-600">94.8%</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-600 dark:text-slate-400">Projects Completed</span>
                        <span className="font-bold text-indigo-600">8 / 10</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activePortalTab === "instructor" && (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-12 items-center">
                  <div className="md:col-span-7">
                    <span className="rounded-md bg-violet-100 px-2.5 py-1 text-[10px] font-bold text-violet-700 uppercase tracking-wider dark:bg-violet-950 dark:text-violet-300">
                      INSTRUCTOR WORKSPACE
                    </span>
                    <h3 className="mt-3 text-2xl font-black text-slate-950 dark:text-white">
                      Live Broadcasts, Grading Queue & Analytics
                    </h3>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Instructors can host live interactive classes, inspect student code submissions, assign scores, track cohort progress diagnostics, and send broadcast announcements.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">Live Masterclasses</span>
                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">Grading Queue</span>
                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">Cohort Diagnostics</span>
                    </div>
                    <div className="mt-8">
                      <Link
                        to="/instructor"
                        className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-xs font-bold text-white shadow-md transition hover:bg-violet-500"
                      >
                        Launch Instructor Workspace <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  </div>
                  <div className="md:col-span-5 rounded-2xl bg-violet-50/60 p-5 border border-violet-100 dark:bg-violet-950/40 dark:border-violet-900/50">
                    <div className="flex items-center gap-3 border-b border-violet-100/80 pb-3 dark:border-violet-900">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-violet-600 text-white font-bold text-sm">
                        IN
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">Dr. Sarah Jenkins</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">Senior Instructor</div>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-600 dark:text-slate-400">Submissions Pending</span>
                        <span className="font-bold text-amber-600">12 Pending Review</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-600 dark:text-slate-400">Active Cohorts</span>
                        <span className="font-bold text-violet-600">3 Batches</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activePortalTab === "admin" && (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-12 items-center">
                  <div className="md:col-span-7">
                    <span className="rounded-md bg-purple-100 px-2.5 py-1 text-[10px] font-bold text-purple-700 uppercase tracking-wider dark:bg-purple-950 dark:text-purple-300">
                      ADMIN CONSOLE
                    </span>
                    <h3 className="mt-3 text-2xl font-black text-slate-950 dark:text-white">
                      Curriculum Architect & Cohort Control
                    </h3>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Admins oversee platform infrastructure, build and update curriculum modules, manage student enrollments, and launch database management tools like Prisma Studio.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">Cohort Management</span>
                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">Curriculum Builder</span>
                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">System Logs</span>
                    </div>
                    <div className="mt-8">
                      <Link
                        to="/admin"
                        className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-xs font-bold text-white shadow-md transition hover:bg-purple-500"
                      >
                        Launch Admin Console <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  </div>
                  <div className="md:col-span-5 rounded-2xl bg-purple-50/60 p-5 border border-purple-100 dark:bg-purple-950/40 dark:border-purple-900/50">
                    <div className="flex items-center gap-3 border-b border-purple-100/80 pb-3 dark:border-purple-900">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-purple-600 text-white font-bold text-sm">
                        AD
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">System Admin</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">Full Platform Rights</div>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-600 dark:text-slate-400">Total Enrolled</span>
                        <span className="font-bold text-indigo-600">542 Students</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-600 dark:text-slate-400">Database Status</span>
                        <span className="font-bold text-emerald-600">PostgreSQL Healthy</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </section>

        {/* 5. 90-DAY ROADMAP TIMELINE */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="text-center">
            <span className="rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-extrabold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
              CURRICULUM ROADMAP
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
              The 90-Day Full-Stack Journey
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300">
              A structured, week-by-week blueprint designed to guide you step by step from fundamental web principles to building cloud-deployed production SaaS platforms.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            
            {[
              {
                phase: "PHASE 1 • WEEKS 1-3",
                title: "Web & JS Foundations",
                desc: "Semantic HTML5, CSS Grid/Flexbox, Tailwind CSS, DOM Manipulation, Modern ES6+ JavaScript & Async Patterns.",
                badge: "Level 1",
                badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
                icon: Laptop
              },
              {
                phase: "PHASE 2 • WEEKS 4-6",
                title: "TypeScript & React 19",
                desc: "Strict Static Typing, React 19 Hooks, State Management with Zustand, TanStack Query & Modern Component Design.",
                badge: "Level 2",
                badgeColor: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300",
                icon: Code2
              },
              {
                phase: "PHASE 3 • WEEKS 7-9",
                title: "Node.js & PostgreSQL",
                desc: "REST APIs with Express.js, PostgreSQL Database Schemas, SQL Queries, Authentication, Zod Schema Validation & Middleware.",
                badge: "Level 3",
                badgeColor: "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-300",
                icon: Database
              },
              {
                phase: "PHASE 4 • WEEKS 10-13",
                title: "Production SaaS Capstone",
                desc: "Architecting a full-stack SaaS application, Docker containerization, CI/CD deployment pipelines & live portfolio showcase.",
                badge: "Level 4",
                badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300",
                icon: Trophy
              }
            ].map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.phase}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      {step.phase}
                    </span>
                    <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${step.badgeColor}`}>
                      {step.badge}
                    </span>
                  </div>

                  <div className="mt-4 flex size-10 items-center justify-center rounded-xl bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                    <Icon className="size-5" />
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-slate-950 dark:text-white">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    {step.desc}
                  </p>
                </div>
              );
            })}

          </div>
        </section>

        {/* 6. FAQ SECTION */}
        <section className="bg-slate-100/60 py-20 dark:bg-slate-900/40 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center">
              <span className="rounded-full bg-slate-200 px-3.5 py-1 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                GOT QUESTIONS?
              </span>
              <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl dark:text-white">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="mt-12 space-y-4">
              {[
                {
                  q: "How do I sign in or access my account portal?",
                  a: "Click on the 'Sign In' button on the top right navigation bar or in the Hero section. You can sign in using your student, instructor, or admin credentials to access your dedicated portal."
                },
                {
                  q: "What is the 30% Theory and 70% Practical model?",
                  a: "Instead of watching endless video lectures, 30% of your time is spent understanding core concept summaries and 70% is spent directly writing code in live Monaco browser IDE labs, taking daily 5-MCQ recall tests, and submitting weekend projects."
                },
                {
                  q: "What full-stack tech stack will I learn?",
                  a: "The program focuses on the PERN stack (PostgreSQL, Express.js, React 19, Node.js) paired with strict static typing using TypeScript, Tailwind CSS, REST APIs, and Docker/Cloud deployments."
                },
                {
                  q: "Can I explore the portals without registering first?",
                  a: "Yes! You can explore the Student Portal, Instructor Workspace, and Admin Console directly from this landing page to experience the interface firsthand."
                }
              ].map((faq, idx) => (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition dark:border-slate-800 dark:bg-slate-900"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="flex w-full items-center justify-between p-5 text-left text-sm font-bold text-slate-900 dark:text-white"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`size-4 text-slate-400 transition-transform ${openFaq === idx ? "rotate-180 text-indigo-600" : ""}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="px-5 pb-5 text-xs leading-relaxed text-slate-600 dark:text-slate-400 border-t border-slate-100 pt-3 dark:border-slate-800">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 7. HIGH-CONVERSION CTA BANNER */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 px-6 py-14 text-center text-white shadow-2xl sm:px-12 sm:py-20">
            <div className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 size-96 rounded-full bg-purple-500/20 blur-3xl" />

            <span className="inline-block rounded-full bg-white/20 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-white backdrop-blur-md">
              START TODAY
            </span>

            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-black tracking-tight sm:text-5xl">
              Ready to turn your coding skills into a career?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-indigo-100">
              Join Shan Nova today. Access hands-on coding labs, daily assessment drills, and 10 weekend projects.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/student"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 text-sm font-extrabold text-indigo-600 shadow-xl transition hover:bg-slate-100 active:scale-95"
              >
                <Rocket className="size-4" />
                Explore Student Portal
              </Link>
              <Link
                to="/sign-in"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-6 py-4 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20"
              >
                <LogIn className="size-4" />
                Sign In / Login
              </Link>
            </div>
          </div>
        </section>

        {/* 8. FOOTER */}
        <footer className="border-t border-slate-200 bg-white pt-14 pb-10 dark:border-slate-800 dark:bg-slate-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-md">
                  <Sparkles className="size-4.5" />
                </div>
                <div>
                  <span className="text-base font-black text-slate-900 dark:text-white">ShanNova LMS</span>
                  <div className="text-[10px] text-slate-400 font-semibold">From Campus to Career</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 text-xs font-semibold text-slate-600 dark:text-slate-400">
                <Link to="/student" className="hover:text-indigo-600 dark:hover:text-indigo-400">Student Portal</Link>
                <Link to="/instructor" className="hover:text-violet-600 dark:hover:text-violet-400">Instructor Workspace</Link>
                <Link to="/admin" className="hover:text-purple-600 dark:hover:text-purple-400">Admin Console</Link>
                <Link to="/sign-in" className="hover:text-indigo-600 dark:hover:text-indigo-400">Sign In</Link>
                <Link to="/sign-up" className="hover:text-indigo-600 dark:hover:text-indigo-400">Register</Link>
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

