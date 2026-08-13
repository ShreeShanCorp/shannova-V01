import { apiRequest } from "@/lib/api-client";
import type { Attendance, AttendanceStatus } from "@/types/api";

export function updateAttendance(id: string, status: AttendanceStatus) {
  return apiRequest<Attendance>({ method: "PATCH", url: `/attendance/${id}`, data: { status } }).then(
    (r) => r.data,
  );
}
