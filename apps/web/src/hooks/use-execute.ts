import { useMutation } from "@tanstack/react-query";
import { runCode } from "@/api/execute";

export function useRunCode() {
  return useMutation({
    mutationFn: (input: { source_code: string; language_id: number; stdin?: string }) => runCode(input),
  });
}

export const useExecute = useRunCode;
