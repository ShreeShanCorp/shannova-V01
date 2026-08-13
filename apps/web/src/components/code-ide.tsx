import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useRunCode } from "@/hooks/use-execute";
import { useCreateSubmission, useSaveDraft } from "@/hooks/use-submissions";
import { CODE_LANGUAGES } from "@/types/api";

const MONACO_LANGUAGE_BY_JUDGE0_ID: Record<number, string> = {
  93: "javascript",
  74: "typescript",
  71: "python",
  62: "java",
  54: "cpp",
};

const AUTOSAVE_INTERVAL_MS = 30_000;

function Spinner() {
  return (
    <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

export function CodeIDE({
  taskId,
  initialCode,
  readOnly,
}: {
  taskId: string;
  initialCode?: string;
  readOnly?: boolean;
}) {
  const [languageId, setLanguageId] = useState<number>(CODE_LANGUAGES[0].id);
  const [code, setCode] = useState(initialCode ?? "");
  const [stdin, setStdin] = useState("");

  const runMutation = useRunCode();
  const submitMutation = useCreateSubmission();
  const draftMutation = useSaveDraft();
  const lastSavedRef = useRef(initialCode ?? "");

  useEffect(() => {
    if (readOnly) return;
    const interval = setInterval(() => {
      if (code !== lastSavedRef.current && code.trim().length > 0) {
        draftMutation.mutate({ taskId, content: code });
        lastSavedRef.current = code;
      }
    }, AUTOSAVE_INTERVAL_MS);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, taskId, readOnly]);

  const hasError = Boolean(runMutation.data?.stderr || runMutation.data?.compileOutput);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="inline-flex gap-1 rounded-lg border border-violet-500/20 bg-violet-500/5 p-1">
          {CODE_LANGUAGES.map((lang) => (
            <button
              key={lang.id}
              type="button"
              disabled={readOnly}
              onClick={() => setLanguageId(lang.id)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50",
                languageId === lang.id
                  ? "bg-violet-600 text-white shadow-sm shadow-violet-600/30"
                  : "text-muted-foreground hover:bg-violet-500/10 hover:text-violet-300",
              )}
            >
              {lang.label}
            </button>
          ))}
        </div>
        {!readOnly && draftMutation.isSuccess && (
          <span className="text-muted-foreground text-xs">Draft saved</span>
        )}
      </div>

      <div className="overflow-hidden rounded-md border border-violet-500/30 shadow-[0_0_0_1px_rgba(124,58,237,0.08),0_0_24px_-8px_rgba(124,58,237,0.35)]">
        <Editor
          height="360px"
          theme="vs-dark"
          language={MONACO_LANGUAGE_BY_JUDGE0_ID[languageId]}
          value={code}
          onChange={(value) => setCode(value ?? "")}
          options={{ readOnly, minimap: { enabled: false }, fontSize: 13 }}
        />
      </div>

      {!readOnly && (
        <div className="space-y-1.5">
          <label className="text-muted-foreground text-xs">stdin (optional)</label>
          <Textarea
            rows={2}
            value={stdin}
            onChange={(e) => setStdin(e.target.value)}
            className="font-mono focus-visible:border-violet-500 focus-visible:ring-violet-500/40"
          />
        </div>
      )}

      {!readOnly && (
        <div className="flex gap-2">
          <button
            type="button"
            disabled={runMutation.isPending || !code.trim()}
            onClick={() => runMutation.mutate({ source_code: code, language_id: languageId, stdin })}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-violet-600 px-4 text-sm font-medium text-white transition-colors hover:bg-violet-500 active:bg-violet-700 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50"
          >
            {runMutation.isPending && <Spinner />}
            {runMutation.isPending ? "Running..." : "Run Code"}
          </button>
          <button
            type="button"
            disabled={submitMutation.isPending || !code.trim()}
            onClick={() => submitMutation.mutate({ taskId, content: code })}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-violet-500 px-4 text-sm font-medium text-violet-400 transition-colors hover:bg-violet-500/10 active:bg-violet-500/20 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50"
          >
            {submitMutation.isPending && <Spinner />}
            {submitMutation.isPending ? "Submitting..." : "Submit to Task"}
          </button>
        </div>
      )}

      {runMutation.isError && (
        <p className="text-destructive text-sm">{runMutation.error.message}</p>
      )}

      {runMutation.data && (
        <div
          className="scrollbar-violet max-h-64 space-y-1 overflow-auto rounded-md border border-violet-500/30 bg-[#0a0a0f] p-3 font-mono text-xs text-neutral-200"
        >
          <p className={cn("font-medium", hasError ? "text-red-400" : "text-emerald-400")}>
            {runMutation.data.status} {runMutation.data.time && `· ${runMutation.data.time}s`}
          </p>
          {runMutation.data.stdout && <pre className="whitespace-pre-wrap">{runMutation.data.stdout}</pre>}
          {runMutation.data.stderr && (
            <pre className="whitespace-pre-wrap text-red-400">{runMutation.data.stderr}</pre>
          )}
          {runMutation.data.compileOutput && (
            <pre className="whitespace-pre-wrap text-amber-400">{runMutation.data.compileOutput}</pre>
          )}
        </div>
      )}

      {submitMutation.isError && (
        <p className="text-destructive text-sm">{submitMutation.error.message}</p>
      )}
    </div>
  );
}
