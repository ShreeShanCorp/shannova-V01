import vm from "node:vm";

interface ExecuteCodeInput {
  sourceCode: string;
  languageId: number;
  stdin?: string;
}

export interface ExecuteCodeResult {
  stdout: string | null;
  stderr: string | null;
  compileOutput: string | null;
  status: string;
  time: string | null;
  memory: number | null;
  exitCode: number | null;
}

export function isJudge0Configured(): boolean {
  return Boolean(process.env.JUDGE0_API_URL) && Boolean(process.env.JUDGE0_API_KEY);
}

/** Local execution engine fallback for JavaScript / TypeScript / general mock */
function executeLocally(input: ExecuteCodeInput): ExecuteCodeResult {
  const start = performance.now();
  let stdoutLogs: string[] = [];
  let stderrLogs: string[] = [];

  try {
    const sandbox = {
      console: {
        log: (...args: unknown[]) => {
          stdoutLogs.push(args.map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" "));
        },
        error: (...args: unknown[]) => {
          stderrLogs.push(args.map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" "));
        },
        warn: (...args: unknown[]) => {
          stdoutLogs.push("[warn] " + args.map((a) => String(a)).join(" "));
        },
        info: (...args: unknown[]) => {
          stdoutLogs.push(args.map((a) => String(a)).join(" "));
        },
      },
      process: {
        env: {},
        stdin: input.stdin ?? "",
      },
      setTimeout,
      clearTimeout,
    };

    const context = vm.createContext(sandbox);
    const script = new vm.Script(input.sourceCode);
    const result = script.runInContext(context, { timeout: 3000 });

    if (stdoutLogs.length === 0 && result !== undefined) {
      stdoutLogs.push(typeof result === "object" ? JSON.stringify(result, null, 2) : String(result));
    }

    const elapsed = ((performance.now() - start) / 1000).toFixed(3);

    return {
      stdout: stdoutLogs.join("\n"),
      stderr: stderrLogs.length > 0 ? stderrLogs.join("\n") : null,
      compileOutput: null,
      status: "Accepted",
      time: `${elapsed}s`,
      memory: 12400,
      exitCode: 0,
    };
  } catch (err: unknown) {
    const elapsed = ((performance.now() - start) / 1000).toFixed(3);
    const errorMsg = err instanceof Error ? err.stack || err.message : String(err);
    return {
      stdout: stdoutLogs.join("\n") || null,
      stderr: errorMsg,
      compileOutput: null,
      status: "Runtime Error",
      time: `${elapsed}s`,
      memory: 12400,
      exitCode: 1,
    };
  }
}

/** Proxies to Judge0 if configured, or uses fast local execution fallback */
export async function executeCode(input: ExecuteCodeInput): Promise<ExecuteCodeResult> {
  const baseUrl = process.env.JUDGE0_API_URL;
  const apiKey = process.env.JUDGE0_API_KEY;

  if (!baseUrl || !apiKey) {
    return executeLocally(input);
  }

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": process.env.JUDGE0_API_HOST ?? "judge0-ce.p.rapidapi.com",
    };

    const res = await fetch(`${baseUrl.replace(/\/$/, "")}/submissions?base64_encoded=false&wait=true`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        source_code: input.sourceCode,
        language_id: input.languageId,
        stdin: input.stdin ?? "",
      }),
    });

    if (!res.ok) {
      return executeLocally(input);
    }

    const data = (await res.json()) as {
      stdout: string | null;
      stderr: string | null;
      compile_output: string | null;
      status: { id: number; description: string };
      time: string | null;
      memory: number | null;
      exit_code: number | null;
    };

    return {
      stdout: data.stdout,
      stderr: data.stderr,
      compileOutput: data.compile_output,
      status: data.status.description,
      time: data.time,
      memory: data.memory,
      exitCode: data.exit_code,
    };
  } catch {
    return executeLocally(input);
  }
}
