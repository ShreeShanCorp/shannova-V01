import { z } from "zod";

function zEnum<T extends readonly [string, ...string[]]>(values: T) {
  return z.enum(values);
}

export const ROLES = ["ADMIN", "INSTRUCTOR", "STUDENT", "INTERVIEWER"] as const;
export const RoleSchema = zEnum(ROLES);
export type Role = z.infer<typeof RoleSchema>;

export const COHORT_STATUSES = ["UPCOMING", "ACTIVE", "COMPLETED", "ARCHIVED"] as const;
export const CohortStatusSchema = zEnum(COHORT_STATUSES);
export type CohortStatus = z.infer<typeof CohortStatusSchema>;

export const ENROLLMENT_ROLES = ["INSTRUCTOR", "STUDENT"] as const;
export const EnrollmentRoleSchema = zEnum(ENROLLMENT_ROLES);
export type EnrollmentRole = z.infer<typeof EnrollmentRoleSchema>;

export const RESOURCE_TYPES = ["VIDEO", "ARTICLE", "DOCUMENT", "LINK", "ASSIGNMENT"] as const;
export const ResourceTypeSchema = zEnum(RESOURCE_TYPES);
export type ResourceType = z.infer<typeof ResourceTypeSchema>;

export const CLASS_STATUSES = ["SCHEDULED", "LIVE", "COMPLETED", "CANCELLED"] as const;
export const ClassStatusSchema = zEnum(CLASS_STATUSES);
export type ClassStatus = z.infer<typeof ClassStatusSchema>;

export const ATTENDANCE_STATUSES = ["PRESENT", "ABSENT", "LATE", "EXCUSED"] as const;
export const AttendanceStatusSchema = zEnum(ATTENDANCE_STATUSES);
export type AttendanceStatus = z.infer<typeof AttendanceStatusSchema>;

export const TASK_TYPES = ["ASSIGNMENT", "QUIZ", "PROJECT", "READING", "CODING", "FILE"] as const;
export const TaskTypeSchema = zEnum(TASK_TYPES);
export type TaskType = z.infer<typeof TaskTypeSchema>;

export const SUBMISSION_STATUSES = [
  "PENDING",
  "SUBMITTED",
  "LATE",
  "GRADED",
  "RESUBMIT_REQUESTED",
] as const;
export const SubmissionStatusSchema = zEnum(SUBMISSION_STATUSES);
export type SubmissionStatus = z.infer<typeof SubmissionStatusSchema>;

export const QUESTION_TYPES = ["MULTIPLE_CHOICE", "CODING", "SHORT_ANSWER", "TRUE_FALSE"] as const;
export const QuestionTypeSchema = zEnum(QUESTION_TYPES);
export type QuestionType = z.infer<typeof QuestionTypeSchema>;

export const TEST_ATTEMPT_STATUSES = ["IN_PROGRESS", "SUBMITTED", "GRADED"] as const;
export const TestAttemptStatusSchema = zEnum(TEST_ATTEMPT_STATUSES);
export type TestAttemptStatus = z.infer<typeof TestAttemptStatusSchema>;

export const INTERVIEW_STATUSES = ["SCHEDULED", "COMPLETED", "CANCELLED", "NO_SHOW"] as const;
export const InterviewStatusSchema = zEnum(INTERVIEW_STATUSES);
export type InterviewStatus = z.infer<typeof InterviewStatusSchema>;

export const PROJECT_STATUSES = ["NOT_STARTED", "IN_PROGRESS", "SUBMITTED", "COMPLETED"] as const;
export const ProjectStatusSchema = zEnum(PROJECT_STATUSES);
export type ProjectStatus = z.infer<typeof ProjectStatusSchema>;

export const MILESTONE_STATUSES = ["PENDING", "IN_PROGRESS", "DONE"] as const;
export const MilestoneStatusSchema = zEnum(MILESTONE_STATUSES);
export type MilestoneStatus = z.infer<typeof MilestoneStatusSchema>;

export const CHAT_THREAD_TYPES = ["DIRECT", "GROUP", "COHORT"] as const;
export const ChatThreadTypeSchema = zEnum(CHAT_THREAD_TYPES);
export type ChatThreadType = z.infer<typeof ChatThreadTypeSchema>;

export const NOTIFICATION_TYPES = [
  "INFO",
  "TASK_DUE",
  "GRADE_POSTED",
  "INTERVIEW_SCHEDULED",
  "ANNOUNCEMENT",
  "MESSAGE",
] as const;
export const NotificationTypeSchema = zEnum(NOTIFICATION_TYPES);
export type NotificationType = z.infer<typeof NotificationTypeSchema>;
