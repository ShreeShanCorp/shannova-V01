import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createModule, deleteModule, updateModule } from "@/api/modules";
import { createResource, deleteResource, updateResource } from "@/api/resources";
import { createTopic, deleteTopic, updateTopic } from "@/api/topics";
import { createWeek, deleteWeek, updateWeek } from "@/api/weeks";
import type { ModuleInput, ResourceInput, TopicInput, WeekInput } from "@/types/api";

/** Modules, weeks, topics, and resources all live inside a curriculum tree, so any
 * mutation to one invalidates both the admin tree query and the student cohort view. */
function useInvalidateCurriculumTree() {
  const queryClient = useQueryClient();
  return () => {
    void queryClient.invalidateQueries({ queryKey: ["curricula"] });
    void queryClient.invalidateQueries({ queryKey: ["cohorts"] });
  };
}

export function useCreateModule() {
  const invalidate = useInvalidateCurriculumTree();
  return useMutation({ mutationFn: (input: ModuleInput) => createModule(input), onSuccess: invalidate });
}

export function useUpdateModule() {
  const invalidate = useInvalidateCurriculumTree();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<ModuleInput> }) => updateModule(id, input),
    onSuccess: invalidate,
  });
}

export function useDeleteModule() {
  const invalidate = useInvalidateCurriculumTree();
  return useMutation({ mutationFn: (id: string) => deleteModule(id), onSuccess: invalidate });
}

export function useCreateWeek() {
  const invalidate = useInvalidateCurriculumTree();
  return useMutation({ mutationFn: (input: WeekInput) => createWeek(input), onSuccess: invalidate });
}

export function useUpdateWeek() {
  const invalidate = useInvalidateCurriculumTree();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<WeekInput> }) => updateWeek(id, input),
    onSuccess: invalidate,
  });
}

export function useDeleteWeek() {
  const invalidate = useInvalidateCurriculumTree();
  return useMutation({ mutationFn: (id: string) => deleteWeek(id), onSuccess: invalidate });
}

export function useCreateTopic() {
  const invalidate = useInvalidateCurriculumTree();
  return useMutation({ mutationFn: (input: TopicInput) => createTopic(input), onSuccess: invalidate });
}

export function useUpdateTopic() {
  const invalidate = useInvalidateCurriculumTree();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<TopicInput> }) => updateTopic(id, input),
    onSuccess: invalidate,
  });
}

export function useDeleteTopic() {
  const invalidate = useInvalidateCurriculumTree();
  return useMutation({ mutationFn: (id: string) => deleteTopic(id), onSuccess: invalidate });
}

export function useCreateResource() {
  const invalidate = useInvalidateCurriculumTree();
  return useMutation({ mutationFn: (input: ResourceInput) => createResource(input), onSuccess: invalidate });
}

export function useUpdateResource() {
  const invalidate = useInvalidateCurriculumTree();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<ResourceInput> }) => updateResource(id, input),
    onSuccess: invalidate,
  });
}

export function useDeleteResource() {
  const invalidate = useInvalidateCurriculumTree();
  return useMutation({ mutationFn: (id: string) => deleteResource(id), onSuccess: invalidate });
}
