import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAttendance } from "@/api/attendance";
import type { AttendanceStatus } from "@/types/api";

export function useUpdateAttendance() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: AttendanceStatus }) => updateAttendance(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["classes"] }),
  });
}
