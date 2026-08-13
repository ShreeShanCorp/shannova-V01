export type {
  Role,
  User,
  Cohort,
  CohortStatus,
  CreateCohortInput as CohortInput,
  Curriculum,
  CreateCurriculumInput as CurriculumInput,
  CurriculumTree,
  ModuleWithWeeks,
  WeekWithTopics,
  TopicWithResources,
  Module,
  CreateModuleInput as ModuleInput,
  Week,
  CreateWeekInput as WeekInput,
  Topic,
  CreateTopicInput as TopicInput,
  Resource,
  ResourceType,
  CreateResourceInput as ResourceInput,
  TopicProgress,
  Enrollment,
  CreateEnrollmentInput as EnrollmentInput,
  Class,
  ScheduleClassInput,
  Attendance,
  AttendanceStatus,
  Task,
  TaskType,
  CreateTaskInput as TaskInput,
  Submission,
  SubmissionStatus,
  CreateSubmissionInput as SubmissionInput,
  UpdateSubmissionInput,
  ExecuteCodeResponse,
} from "@shannova/shared-types";
export { RESOURCE_TYPES, COHORT_STATUSES, TASK_TYPES, CODE_LANGUAGES } from "@shannova/shared-types";

export interface ApiMeta {
  page?: number;
  pageSize?: number;
  total?: number;
  [key: string]: unknown;
}

export interface ApiError {
  message: string;
  code: string;
  details?: unknown;
}

export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
  meta: ApiMeta | null;
}
