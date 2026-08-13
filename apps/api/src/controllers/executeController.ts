import { executeCodeSchema } from "@shannova/shared-types";
import { asyncHandler } from "../lib/async-handler.js";
import { executeCode } from "../lib/judge0.js";
import { sendSuccess } from "../lib/response.js";

export const runCode = asyncHandler(async (req, res) => {
  const { source_code, language_id, stdin } = executeCodeSchema.parse(req.body);
  const result = await executeCode({ sourceCode: source_code, languageId: language_id, stdin });
  return sendSuccess(res, result);
});
