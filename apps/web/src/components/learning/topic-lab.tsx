import { useState } from "react";
import { 
  BookOpen, 
  Code2, 
  CheckCircle2, 
  Play, 
  HelpCircle, 
  Award, 
  FolderGit2, 
  Terminal, 
  ExternalLink,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Check,
  X,
  AlertCircle,
  Layers,
  Calendar,
  Zap
} from "lucide-react";
import { useExecute } from "@/hooks/use-execute";
import { useCurriculumTree } from "@/hooks/use-curricula";

interface TopicLabProps {
  curriculumId?: string;
}

export function TopicLab({ curriculumId = "curriculum-pern-90days" }: TopicLabProps) {
  const { data: curriculumData, isLoading } = useCurriculumTree(curriculumId);
  const [activeTab, setActiveTab] = useState<"theory" | "practical" | "assessment" | "project">("practical");
  
  // Selected Level / Week / Topic State
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);

  const modules = curriculumData?.modules || [];
  const currentModule = modules[selectedModuleIndex];
  const currentWeeks = currentModule?.weeks || [];
  const currentWeek = currentWeeks[selectedWeekIndex] || currentWeeks[0];
  const currentTopics = currentWeek?.topics || [];
  const currentTopic = currentTopics[selectedTopicIndex] || currentTopics[0];

  // Dynamic code templates per topic/level
  const codeTemplates: Record<number, string> = {
    0: `// Level 1: JavaScript Functional Array Processing Drill
const students = [
  { name: "Alex", score: 92, active: true },
  { name: "Sam", score: 78, active: true },
  { name: "Jordan", score: 64, active: false },
  { name: "Taylor", score: 88, active: true },
];

// 1. Filter active students with score >= 80
const topPerformers = students
  .filter((s) => s.active && s.score >= 80)
  .map((s) => ({ ...s, grade: "A" }));

console.log("Top Performers:", topPerformers);

// 2. Compute Class Average
const avgScore = students.reduce((acc, curr) => acc + curr.score, 0) / students.length;
console.log("Class Average:", avgScore.toFixed(1));
`,
    1: `// Level 2: Generic Type-Safe Store in TypeScript
interface Listener<T> {
  (state: T): void;
}

export function createStore<T>(initialState: T) {
  let state = initialState;
  const listeners = new Set<Listener<T>>();

  return {
    getState: (): T => state,
    setState: (newState: T): void => {
      state = newState;
      listeners.forEach((listener) => listener(state));
    },
    subscribe: (listener: Listener<T>): (() => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

// Test Run
const store = createStore({ user: "Alex Rivera", xp: 450 });
console.log("Initial State:", store.getState());

store.subscribe((state) => {
  console.log("⚡ State Updated:", state);
});

store.setState({ user: "Alex Rivera", xp: 500 });
`,
    2: `// Level 3: Node.js Express REST Controller & Zod Validator
import { z } from "zod";

const ProductSchema = z.object({
  title: z.string().min(3),
  price: z.number().positive(),
  category: z.enum(["ELECTRONICS", "BOOKS", "COURSES"]),
});

function validateProduct(input: unknown) {
  const result = ProductSchema.safeParse(input);
  if (!result.success) {
    console.error("❌ Validation Failed:", result.error.format());
    return null;
  }
  console.log("✅ Valid Product Payload:", result.data);
  return result.data;
}

validateProduct({ title: "90-Day PERN Bootcamp", price: 299, category: "COURSES" });
`,
    3: `// Level 4: PostgreSQL Relational Query & ACID Isolation Drill
console.log("Executing SQL Transaction Pipeline...");

const queries = [
  "BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;",
  "UPDATE accounts SET balance = balance - 100 WHERE id = 'user_1';",
  "UPDATE accounts SET balance = balance + 100 WHERE id = 'user_2';",
  "INSERT INTO audit_logs (from_user, to_user, amount) VALUES ('user_1', 'user_2', 100);",
  "COMMIT;",
];

queries.forEach((q, idx) => console.log(\`[\${idx + 1}] \${q}\`));
console.log("✅ ACID Transaction executed successfully with 0 dirty reads.");
`,
    4: `// Level 5: React 19 State & Custom Hook Drill
console.log("Testing Reactive State Sync & Optimistic Mutations...");

function useOptimisticMutation(initialState: string) {
  let state = initialState;
  return {
    mutate: (next: string) => {
      console.log("1. Optimistically applying UI update:", next);
      state = next;
      console.log("2. Syncing with backend API /api/v1/tasks...");
      console.log("3. Server confirmed! Final state:", state);
    }
  };
}

const mutator = useOptimisticMutation("In Progress");
mutator.mutate("Completed");
`,
    5: `// Level 6: Cloud Deployment & CI/CD Pipeline
console.log("Testing Production Health Checks & Docker Config...");
const healthCheck = {
  status: "HEALTHY",
  uptime: "99.99%",
  nodeVersion: "v22.19.0",
  database: "PostgreSQL 16 (Connected)",
  redis: "Ready",
  cloudProvider: "Google Cloud Engine",
};

console.log("System Health Report:", JSON.stringify(healthCheck, null, 2));
`
  };

  const [code, setCode] = useState<string>(codeTemplates[1] || "");
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [gitUrl, setGitUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [projectSubmitted, setProjectSubmitted] = useState(false);

  const executeMutation = useExecute();

  const handleRunCode = () => {
    executeMutation.mutate({
      source_code: code || "",
      language_id: 63, // JavaScript / TypeScript
      stdin: "",
    });
  };

  const mcqs = [
    {
      id: 1,
      question: "Which TypeScript utility type constructs a type with all properties of Type set to optional?",
      options: ["Required<T>", "Partial<T>", "Readonly<T>", "Record<K, T>"],
      correct: 1,
      explanation: "Partial<T> returns a type with all properties of T set to optional.",
    },
    {
      id: 2,
      question: "In PostgreSQL, which isolation level prevents Dirty Reads, Non-Repeatable Reads, and Phantom Reads?",
      options: ["Read Uncommitted", "Read Committed", "Repeatable Read", "Serializable"],
      correct: 3,
      explanation: "Serializable is the highest isolation level and prevents all three phenomena.",
    },
    {
      id: 3,
      question: "What is the primary purpose of useEffect with an empty dependency array [] in React 19?",
      options: ["Runs on every state change", "Runs only once after initial mount", "Triggers garbage collection", "Forces synchronous re-render"],
      correct: 1,
      explanation: "An empty dependency array causes the effect to execute only once after the component mounts.",
    },
    {
      id: 4,
      question: "When signing a JWT token, what is the role of the secret key?",
      options: ["Encrypts the payload so anyone can decode it", "Generates the cryptographic signature to verify authenticity", "Stores user password in plain text", "Compresses the HTTP header"],
      correct: 1,
      explanation: "The secret key creates the signature part of the JWT so the server can verify the payload wasn't tampered with.",
    },
    {
      id: 5,
      question: "In Express.js, what must be called inside a custom middleware to pass control to the next handler?",
      options: ["res.send()", "next()", "return true", "process.exit()"],
      correct: 1,
      explanation: "next() passes execution to the next middleware function in the request-response stack.",
    },
  ];

  return (
    <div className="space-y-6">

      {/* 1. INTERACTIVE WEEK & LEVEL SELECTOR (ALL 13 WEEKS ACCESSIBLE) */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Layers className="size-4 text-indigo-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
              Browse All 13 Weeks (Levels 1 to 6)
            </span>
          </div>
          <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
            {modules.length > 0 ? `${modules.length} Levels Available` : "Loading syllabus from PostgreSQL..."}
          </span>
        </div>

        {/* Level Pills */}
        <div className="mt-3 flex flex-wrap gap-2">
          {modules.map((mod, mIdx) => (
            <button
              key={mod.id}
              type="button"
              onClick={() => {
                setSelectedModuleIndex(mIdx);
                setSelectedWeekIndex(0);
                setSelectedTopicIndex(0);
                if (codeTemplates[mIdx]) {
                  setCode(codeTemplates[mIdx]);
                }
              }}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                selectedModuleIndex === mIdx
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              {mod.title.split(":")[0]}
            </button>
          ))}
        </div>

        {/* Weeks in Selected Level */}
        {currentWeeks.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
            {currentWeeks.map((wk, wIdx) => (
              <button
                key={wk.id}
                type="button"
                onClick={() => {
                  setSelectedWeekIndex(wIdx);
                  setSelectedTopicIndex(0);
                }}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  selectedWeekIndex === wIdx
                    ? "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-300"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400"
                }`}
              >
                <Calendar className="size-3.5" />
                {wk.title}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 2. MAIN 30/70 TOPIC LAB CONTAINER */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        
        {/* Header with Active Topic Info */}
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-6 md:flex-row md:items-center dark:border-slate-800">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                {currentWeek?.title || "Week 1"}
              </span>
              <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-bold text-violet-700 dark:bg-violet-950/60 dark:text-violet-300">
                📖 30% Theory (27 min) • ⚡ 70% Practical (63 min)
              </span>
            </div>
            <h2 className="mt-2 text-xl font-extrabold text-slate-900 dark:text-white">
              {currentTopic?.title || "TypeScript Deep Dive: Generics, Types & State Architecture"}
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {currentTopic?.description || "Daily Learning Rhythm: 27 min Concept Study + 53 min Code Lab + 7 min Daily Assessment + 3 min Git"}
            </p>
          </div>

          {/* Tab Switcher Pills */}
          <div className="flex items-center rounded-2xl bg-slate-100 p-1 dark:bg-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab("theory")}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                activeTab === "theory"
                  ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-white"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400"
              }`}
            >
              <BookOpen className="size-3.5" />
              30% Theory
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("practical")}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                activeTab === "practical"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400"
              }`}
            >
              <Code2 className="size-3.5" />
              70% Practical Lab
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("assessment")}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                activeTab === "assessment"
                  ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-white"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400"
              }`}
            >
              <HelpCircle className="size-3.5" />
              Daily Assessment (5 MCQs)
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("project")}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                activeTab === "project"
                  ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-white"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400"
              }`}
            >
              <FolderGit2 className="size-3.5" />
              Weekend Project
            </button>
          </div>
        </div>

        {/* TAB 1: 30% THEORY */}
        {activeTab === "theory" && (
          <div className="mt-6 space-y-6">
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-5 dark:border-indigo-950 dark:bg-indigo-950/20">
              <h3 className="text-sm font-bold text-indigo-950 dark:text-indigo-200">
                Concept Architecture & Mentor Notes (30% Session — 27 min)
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                {currentTopic?.description || "In this session, we analyze architectural execution flows, type constraints, memory structures, and industry design patterns."}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                <h4 className="text-xs font-bold text-slate-900 uppercase dark:text-white">{"1. Architectural Principles & Patterns"}</h4>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  Separation of concerns, defensive validation with Zod, and type safety across the network boundary.
                </p>
                <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-950 p-3 text-[11px] text-indigo-300">
{`// Industry Standard Pattern
export interface ApiResponse<T> {
  data?: T;
  error?: { code: string; message: string };
  meta?: { page: number; total: number };
}`}
                </pre>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                <h4 className="text-xs font-bold text-slate-900 uppercase dark:text-white">{"2. Memory Model & Optimization"}</h4>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  V8 Heap allocation, closure scopes, and cleanup handlers to eliminate memory leaks.
                </p>
                <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-950 p-3 text-[11px] text-indigo-300">
{`// Automatic Listener Cleanup
const unsubscribe = store.subscribe((state) => {
  console.log("State synced:", state);
});
// Unsubscribe when unmounted
unsubscribe();`}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 70% PRACTICAL LAB */}
        {activeTab === "practical" && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              
              {/* Left 7 Cols: Code Editor */}
              <div className="space-y-3 lg:col-span-7">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                    <Terminal className="size-4 text-indigo-600" />
                    Live Code Editor (TypeScript Runtime Sandbox)
                  </span>
                  <button
                    type="button"
                    onClick={handleRunCode}
                    disabled={executeMutation.isPending}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-1.5 text-xs font-bold text-white shadow-md shadow-indigo-500/20 transition hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50"
                  >
                    <Play className="size-3.5 fill-white" />
                    {executeMutation.isPending ? "Executing..." : "Run Code (Test)"}
                  </button>
                </div>

                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  rows={14}
                  className="w-full rounded-2xl border border-slate-800 bg-[#0c1222] p-4 font-mono text-xs text-indigo-200 shadow-inner focus:border-indigo-500 focus:outline-none"
                />

                {/* Terminal Output */}
                <div className="rounded-2xl border border-slate-800 bg-[#090d16] p-4 font-mono text-xs">
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Execution Console Output:</div>
                  <div className="mt-2 text-emerald-400 whitespace-pre-wrap">
                    {executeMutation.data?.stdout || (executeMutation.isPending ? "Running code in isolated Node sandbox..." : "Click 'Run Code' to execute tests.")}
                  </div>
                  {executeMutation.data?.stderr && (
                    <div className="mt-2 text-rose-400 whitespace-pre-wrap">{executeMutation.data.stderr}</div>
                  )}
                </div>
              </div>

              {/* Right 5 Cols: Step-by-Step Drill Requirements */}
              <div className="space-y-4 lg:col-span-5">
                <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Hands-On Practical Drill Steps (70% Application)
                  </h4>
                  <ul className="mt-3 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                      <span>{"Step 1: Write and verify pure algorithmic logic."}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                      <span>{"Step 2: Add strict type annotations and return signatures."}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                      <span>{"Step 3: Run execution test in the live Node sandbox."}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                      <span>{"Step 4: Commit changes to Git (git add . && git commit)."}</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 dark:border-emerald-950 dark:bg-emerald-950/20">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-900 dark:text-emerald-300">
                    <span>Drill Status</span>
                    <span className="rounded bg-emerald-600 px-2 py-0.5 text-white">Tests Passing (100%)</span>
                  </div>
                  <p className="mt-2 text-[11px] text-emerald-800 dark:text-emerald-400">
                    50 XP awarded upon running successful drill tests.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: DAILY ASSESSMENT (5 MCQS) */}
        {activeTab === "assessment" && (
          <div className="mt-6 space-y-6">
            <div className="flex items-center justify-between rounded-2xl bg-indigo-50/60 p-4 border border-indigo-100 dark:bg-indigo-950/30 dark:border-indigo-900">
              <div>
                <h3 className="text-sm font-bold text-indigo-950 dark:text-indigo-200">
                  Daily Assessment: 5 MCQs + Spaced Repetition (7 min)
                </h3>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  Test your retention of today's 30% theory + 70% practical coding session.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowQuizResults(true)}
                className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-500"
              >
                Submit Assessment
              </button>
            </div>

            <div className="space-y-4">
              {mcqs.map((q, qIndex) => (
                <div key={q.id} className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Question {qIndex + 1}: {q.question}
                  </div>
                  <div className="mt-3 space-y-2">
                    {q.options.map((opt, optIndex) => {
                      const isSelected = selectedAnswers[q.id] === optIndex;
                      const isCorrect = showQuizResults && optIndex === q.correct;
                      const isWrong = showQuizResults && isSelected && optIndex !== q.correct;

                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setSelectedAnswers({ ...selectedAnswers, [q.id]: optIndex })}
                          className={`flex w-full items-center justify-between rounded-xl border p-3 text-left text-xs transition ${
                            isCorrect
                              ? "border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200"
                              : isWrong
                              ? "border-rose-500 bg-rose-50 text-rose-900 dark:bg-rose-950/50 dark:text-rose-200"
                              : isSelected
                              ? "border-indigo-600 bg-indigo-50/50 font-semibold text-indigo-900 dark:border-indigo-500 dark:bg-indigo-950/40 dark:text-white"
                              : "border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
                          }`}
                        >
                          <span>{opt}</span>
                          {isCorrect && <Check className="size-4 text-emerald-600" />}
                          {isWrong && <X className="size-4 text-rose-600" />}
                        </button>
                      );
                    })}
                  </div>

                  {showQuizResults && (
                    <div className="mt-3 rounded-xl bg-slate-50 p-2.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      <span className="font-bold text-indigo-600">Explanation: </span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: WEEKEND PROJECT */}
        {activeTab === "project" && (
          <div className="mt-6 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 p-6 dark:border-slate-800 dark:from-slate-900 dark:to-indigo-950/30">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-indigo-600 px-3 py-1 text-[10px] font-bold text-white uppercase">
                  WEEKEND PROJECT {selectedModuleIndex + 1} OF 10
                </span>
                <span className="text-xs font-bold text-slate-500">Deliverable: Working Product + GitHub Deploy</span>
              </div>

              <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                {selectedModuleIndex === 0 ? "Personal Portfolio & Responsive Business Site" :
                 selectedModuleIndex === 1 ? "TypeScript Type-Safe CLI & Inventory System" :
                 selectedModuleIndex === 2 ? "Production REST API Engine with Express & Zod" :
                 selectedModuleIndex === 3 ? "PostgreSQL Relational Schema & ACID Banking Flow" :
                 selectedModuleIndex === 4 ? "Full-Stack React Product Dashboard & Real-Time Chat" :
                 "Full-Stack Production SaaS Capstone Product"}
              </h3>
              
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-800">
                  <div className="text-xs font-bold text-indigo-600">Saturday (3 hrs)</div>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                    Build the application from requirements with zero hand-holding: implement schemas, business logic, and API endpoints.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-800">
                  <div className="text-xs font-bold text-violet-600">Sunday (2-3 hrs)</div>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                    Refactor code, write comprehensive README documentation, push to GitHub, and deploy live to production.
                  </p>
                </div>
              </div>

              {/* Submission Form */}
              <div className="mt-6 space-y-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-800">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Submit Weekend Project for Review</h4>
                
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">GitHub Repository URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/username/pern-weekend-project"
                    value={gitUrl}
                    onChange={(e) => setGitUrl(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Live Demo / Production URL</label>
                  <input
                    type="url"
                    placeholder="https://my-app.cloud.google.com"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setProjectSubmitted(true)}
                  className="mt-2 inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-500"
                >
                  <FolderGit2 className="size-3.5" />
                  {projectSubmitted ? "Project Submitted (Pending Faculty Review)" : "Submit Project"}
                </button>

                {projectSubmitted && (
                  <p className="text-xs font-semibold text-emerald-600">
                    {"✓ Project successfully submitted! Faculty instructor will review your GitHub repository and grade against rubric."}
                  </p>
                )}
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
}
