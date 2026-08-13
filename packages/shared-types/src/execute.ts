import { z } from "zod";

export const executeCodeSchema = z.object({
  source_code: z.string().min(1),
  language_id: z.number().int(),
  stdin: z.string().optional(),
});
export type ExecuteCodeInput = z.infer<typeof executeCodeSchema>;

export interface ExecuteCodeResponse {
  stdout: string | null;
  stderr: string | null;
  compileOutput: string | null;
  status: string;
  time: string | null;
  memory: number | null;
  exitCode: number | null;
}

/** Judge0 CE language ids for the switcher this app exposes. Pin these to the specific
 * Judge0 instance's /languages list if it differs from the public Judge0 CE defaults. */
export const CODE_LANGUAGES = [
  { id: 93, label: "JavaScript (Node.js)" },
  { id: 74, label: "TypeScript" },
  { id: 71, label: "Python" },
  { id: 62, label: "Java" },
  { id: 54, label: "C++" },
] as const;
