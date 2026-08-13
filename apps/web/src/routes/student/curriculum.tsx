import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, GraduationCap, CheckCircle2, Sparkles, Code2, FolderGit2 } from "lucide-react";
import { useState } from "react";
import { TopicLab } from "@/components/learning/topic-lab";
import { useCohortCurriculum } from "@/hooks/use-cohorts";
import { useMyEnrollments } from "@/hooks/use-enrollments";
import { useMyProgress, useSetTopicProgress } from "@/hooks/use-progress";

export const Route = createFileRoute("/student/curriculum")({
  component: StudentCurriculumPage,
});

function StudentCurriculumPage() {
  const { data: enrollments } = useMyEnrollments();
  const [selectedTopic, setSelectedTopic] = useState<string | null>("typescript-deep-dive");

  const cohortId = enrollments?.[0]?.cohortId || "cohort-pern-90days-id";
  const { data: tree } = useCohortCurriculum(cohortId);
  const { data: progress } = useMyProgress(tree?.id);
  const setProgress = useSetTopicProgress();

  const completedTopicIds = new Set((progress ?? []).map((p) => p.topicId));

  return (
    <div className="min-h-[calc(100vh-60px)] bg-[#fafbfc] p-6 lg:p-10 dark:bg-[#090d16]">
      <div className="mx-auto max-w-6xl space-y-8">
        
        {/* Curriculum Header */}
        <div className="rounded-3xl border border-indigo-100 bg-gradient-to-r from-slate-900 via-indigo-950 to-violet-950 p-8 text-white shadow-xl dark:border-slate-800">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-indigo-500/30 px-2.5 py-0.5 text-xs font-bold text-indigo-200 border border-indigo-400/30">
                  90-Day Full-Stack Program
                </span>
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-300">
                  30% Theory • 70% Practical
                </span>
              </div>
              <h1 className="mt-2 text-2xl font-extrabold tracking-tight">
                Full-Stack Web Development (PERN Stack with TypeScript)
              </h1>
              <p className="mt-1 text-xs text-slate-300">
                12 Core Weeks + 1 Job-Readiness Capstone Week • 10 Weekend Projects • Daily 5-MCQ & Coding Assessments
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-md border border-white/10 text-center">
              <div className="text-xs text-indigo-200">Curriculum Completion</div>
              <div className="text-xl font-black text-white">78% Complete</div>
            </div>
          </div>
        </div>

        {/* 30/70 Interactive Topic Lab */}
        <TopicLab />

      </div>
    </div>
  );
}
