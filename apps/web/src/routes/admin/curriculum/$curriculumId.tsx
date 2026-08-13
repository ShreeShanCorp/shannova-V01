import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCurriculum, useCurriculumTree, useDeleteCurriculum, useUpdateCurriculum } from "@/hooks/use-curricula";
import {
  useCreateModule,
  useCreateResource,
  useCreateTopic,
  useCreateWeek,
  useDeleteModule,
  useDeleteResource,
  useDeleteTopic,
  useDeleteWeek,
  useUpdateModule,
  useUpdateResource,
  useUpdateTopic,
  useUpdateWeek,
} from "@/hooks/use-curriculum-nodes";
import { RESOURCE_TYPES } from "@/types/api";
import type {
  ModuleWithWeeks,
  ResourceType,
  TopicWithResources,
  WeekWithTopics,
} from "@/types/api";

export const Route = createFileRoute("/admin/curriculum/$curriculumId")({
  component: CurriculumDetailPage,
});

function CurriculumDetailPage() {
  const { curriculumId } = Route.useParams();
  const { data: tree, isLoading } = useCurriculumTree(curriculumId);
  const { data: curriculum } = useCurriculum(curriculumId);
  const updateMutation = useUpdateCurriculum(curriculumId);
  const deleteMutation = useDeleteCurriculum();
  const createModule = useCreateModule();
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);
  const [addModuleOpen, setAddModuleOpen] = useState(false);

  if (isLoading || !tree) {
    return <div className="mx-auto max-w-4xl p-6 text-muted-foreground text-sm">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-6">
      <Link to="/admin/curriculum" className="text-muted-foreground text-sm hover:underline">
        ← All curricula
      </Link>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{tree.name}</h1>
          {tree.description && <p className="text-muted-foreground mt-1">{tree.description}</p>}
          <p className="text-muted-foreground text-sm">v{tree.version}</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Pencil /> Edit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit curriculum</DialogTitle>
              </DialogHeader>
              <CurriculumForm
                defaultValues={{
                  name: curriculum?.name ?? tree.name,
                  description: curriculum?.description ?? tree.description ?? "",
                  version: curriculum?.version ?? tree.version,
                }}
                onSubmit={async (values) => {
                  await updateMutation.mutateAsync(values);
                  setEditOpen(false);
                }}
                submitLabel="Save changes"
              />
            </DialogContent>
          </Dialog>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              if (window.confirm(`Delete curriculum "${tree.name}"? This removes all its modules.`)) {
                deleteMutation.mutate(curriculumId, { onSuccess: () => navigate({ to: "/admin/curriculum" }) });
              }
            }}
          >
            <Trash2 /> Delete
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <h2 className="font-semibold">Modules</h2>
        <Dialog open={addModuleOpen} onOpenChange={setAddModuleOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus /> Add module
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New module</DialogTitle>
            </DialogHeader>
            <TitleForm
              defaultValues={{ title: "", description: "", order: tree.modules.length }}
              hasDescription
              onSubmit={async (values) => {
                await createModule.mutateAsync({ curriculumId, ...values });
                setAddModuleOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {tree.modules.length === 0 ? (
        <p className="text-muted-foreground text-sm">No modules yet.</p>
      ) : (
        <div className="space-y-3">
          {tree.modules.map((module) => (
            <ModuleSection key={module.id} module={module} />
          ))}
        </div>
      )}
    </div>
  );
}

/** Custom collapsible section (not native <details>) so action buttons in the header
 * never fight the disclosure toggle for the click event. */
function Section({
  title,
  actions,
  defaultOpen,
  children,
}: {
  title: ReactNode;
  actions: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen ?? false);

  return (
    <div className="rounded-lg border p-3">
      <div className="flex items-center justify-between">
        <button type="button" className="flex-1 text-left font-medium" onClick={() => setOpen((o) => !o)}>
          {title}
        </button>
        <span className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          {actions}
        </span>
      </div>
      {open && <div className="mt-3 space-y-2 border-l pl-4">{children}</div>}
    </div>
  );
}

function ModuleSection({ module }: { module: ModuleWithWeeks }) {
  const updateModule = useUpdateModule();
  const deleteModule = useDeleteModule();
  const createWeek = useCreateWeek();
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  return (
    <Section
      defaultOpen
      title={module.title}
      actions={
        <>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Plus />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New week</DialogTitle>
              </DialogHeader>
              <TitleForm
                defaultValues={{ title: "", order: module.weeks.length }}
                onSubmit={async (values) => {
                  await createWeek.mutateAsync({ moduleId: module.id, ...values });
                  setAddOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Pencil />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit module</DialogTitle>
              </DialogHeader>
              <TitleForm
                defaultValues={{ title: module.title, description: module.description ?? "", order: module.order }}
                hasDescription
                onSubmit={async (values) => {
                  await updateModule.mutateAsync({ id: module.id, input: values });
                  setEditOpen(false);
                }}
                submitLabel="Save"
              />
            </DialogContent>
          </Dialog>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (window.confirm(`Delete module "${module.title}"?`)) deleteModule.mutate(module.id);
            }}
          >
            <Trash2 />
          </Button>
        </>
      }
    >
      {module.weeks.length === 0 ? (
        <p className="text-muted-foreground text-sm">No weeks yet.</p>
      ) : (
        module.weeks.map((week) => <WeekSection key={week.id} week={week} />)
      )}
    </Section>
  );
}

function WeekSection({ week }: { week: WeekWithTopics }) {
  const updateWeek = useUpdateWeek();
  const deleteWeek = useDeleteWeek();
  const createTopic = useCreateTopic();
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  return (
    <Section
      title={week.title}
      actions={
        <>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Plus />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New topic</DialogTitle>
              </DialogHeader>
              <TitleForm
                defaultValues={{ title: "", description: "", order: week.topics.length }}
                hasDescription
                onSubmit={async (values) => {
                  await createTopic.mutateAsync({ weekId: week.id, ...values });
                  setAddOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Pencil />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit week</DialogTitle>
              </DialogHeader>
              <TitleForm
                defaultValues={{ title: week.title, order: week.order }}
                onSubmit={async (values) => {
                  await updateWeek.mutateAsync({ id: week.id, input: values });
                  setEditOpen(false);
                }}
                submitLabel="Save"
              />
            </DialogContent>
          </Dialog>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (window.confirm(`Delete week "${week.title}"?`)) deleteWeek.mutate(week.id);
            }}
          >
            <Trash2 />
          </Button>
        </>
      }
    >
      {week.topics.length === 0 ? (
        <p className="text-muted-foreground text-sm">No topics yet.</p>
      ) : (
        week.topics.map((topic) => <TopicSection key={topic.id} topic={topic} />)
      )}
    </Section>
  );
}

function TopicSection({ topic }: { topic: TopicWithResources }) {
  const updateTopic = useUpdateTopic();
  const deleteTopic = useDeleteTopic();
  const createResource = useCreateResource();
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  return (
    <Section
      title={topic.title}
      actions={
        <>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Plus />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New resource</DialogTitle>
              </DialogHeader>
              <ResourceForm
                defaultValues={{ title: "", type: "LINK", url: "", order: topic.resources.length }}
                onSubmit={async (values) => {
                  await createResource.mutateAsync({ topicId: topic.id, ...values });
                  setAddOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Pencil />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit topic</DialogTitle>
              </DialogHeader>
              <TitleForm
                defaultValues={{ title: topic.title, description: topic.description ?? "", order: topic.order }}
                hasDescription
                onSubmit={async (values) => {
                  await updateTopic.mutateAsync({ id: topic.id, input: values });
                  setEditOpen(false);
                }}
                submitLabel="Save"
              />
            </DialogContent>
          </Dialog>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (window.confirm(`Delete topic "${topic.title}"?`)) deleteTopic.mutate(topic.id);
            }}
          >
            <Trash2 />
          </Button>
        </>
      }
    >
      {topic.resources.length === 0 ? (
        <p className="text-muted-foreground text-sm">No resources yet.</p>
      ) : (
        topic.resources.map((resource) => (
          <div key={resource.id} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <Badge variant="outline">{resource.type}</Badge>
              {resource.url ? (
                <a href={resource.url} target="_blank" rel="noreferrer" className="hover:underline">
                  {resource.title}
                </a>
              ) : (
                resource.title
              )}
            </span>
            <ResourceRowActions resource={resource} />
          </div>
        ))
      )}
    </Section>
  );
}

function ResourceRowActions({ resource }: { resource: TopicWithResources["resources"][number] }) {
  const updateResource = useUpdateResource();
  const deleteResource = useDeleteResource();
  const [editOpen, setEditOpen] = useState(false);

  return (
    <span className="flex items-center gap-1">
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Pencil />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit resource</DialogTitle>
          </DialogHeader>
          <ResourceForm
            defaultValues={{
              title: resource.title,
              type: resource.type,
              url: resource.url ?? "",
              order: resource.order,
            }}
            onSubmit={async (values) => {
              await updateResource.mutateAsync({ id: resource.id, input: values });
              setEditOpen(false);
            }}
            submitLabel="Save"
          />
        </DialogContent>
      </Dialog>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          if (window.confirm(`Delete resource "${resource.title}"?`)) deleteResource.mutate(resource.id);
        }}
      >
        <Trash2 />
      </Button>
    </span>
  );
}

function CurriculumForm({
  defaultValues,
  onSubmit,
  submitLabel = "Create",
}: {
  defaultValues: { name: string; description: string; version: string };
  onSubmit: (values: { name: string; description?: string; version?: string }) => Promise<void>;
  submitLabel?: string;
}) {
  const schema = z.object({
    name: z.string().min(1, "Required"),
    description: z.string().optional(),
    version: z.string().optional(),
  });
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues });

  return (
    <form
      className="space-y-4"
      onSubmit={form.handleSubmit(async (values) => {
        await onSubmit(values);
      })}
    >
      <div className="space-y-1.5">
        <Label htmlFor="c-name">Name</Label>
        <Input id="c-name" {...form.register("name")} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="c-description">Description</Label>
        <Textarea id="c-description" {...form.register("description")} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="c-version">Version</Label>
        <Input id="c-version" {...form.register("version")} />
      </div>
      <Button type="submit" className="w-full">
        {submitLabel}
      </Button>
    </form>
  );
}

type TitleFormValues = { title: string; description?: string; order: number };

function TitleForm({
  defaultValues,
  hasDescription,
  onSubmit,
  submitLabel = "Add",
}: {
  defaultValues: TitleFormValues;
  hasDescription?: boolean;
  onSubmit: (values: TitleFormValues) => Promise<void>;
  submitLabel?: string;
}) {
  const schema = z.object({
    title: z.string().min(1, "Required"),
    description: z.string().optional(),
    order: z.coerce.number().int(),
  });
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues });

  return (
    <form
      className="space-y-4"
      onSubmit={form.handleSubmit(async (values) => {
        await onSubmit(values);
      })}
    >
      <div className="space-y-1.5">
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...form.register("title")} />
        {form.formState.errors.title && (
          <p className="text-destructive text-xs">{form.formState.errors.title.message}</p>
        )}
      </div>
      {hasDescription && (
        <div className="space-y-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...form.register("description")} />
        </div>
      )}
      <div className="space-y-1.5">
        <Label htmlFor="order">Order</Label>
        <Input id="order" type="number" {...form.register("order")} />
      </div>
      <Button type="submit" className="w-full">
        {submitLabel}
      </Button>
    </form>
  );
}

type ResourceFormValues = { title: string; type: ResourceType; url?: string; order: number };

function ResourceForm({
  defaultValues,
  onSubmit,
  submitLabel = "Add",
}: {
  defaultValues: ResourceFormValues;
  onSubmit: (values: ResourceFormValues) => Promise<void>;
  submitLabel?: string;
}) {
  const schema = z.object({
    title: z.string().min(1, "Required"),
    type: z.enum(RESOURCE_TYPES),
    url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    order: z.coerce.number().int(),
  });
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues });

  return (
    <form
      className="space-y-4"
      onSubmit={form.handleSubmit(async (values) => {
        await onSubmit({ ...values, url: values.url || undefined });
      })}
    >
      <div className="space-y-1.5">
        <Label htmlFor="r-title">Title</Label>
        <Input id="r-title" {...form.register("title")} />
        {form.formState.errors.title && (
          <p className="text-destructive text-xs">{form.formState.errors.title.message}</p>
        )}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="r-type">Type</Label>
        <Controller
          control={form.control}
          name="type"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="r-type" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {RESOURCE_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="r-url">URL</Label>
        <Input id="r-url" {...form.register("url")} placeholder="https://" />
        {form.formState.errors.url && (
          <p className="text-destructive text-xs">{form.formState.errors.url.message}</p>
        )}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="r-order">Order</Label>
        <Input id="r-order" type="number" {...form.register("order")} />
      </div>
      <Button type="submit" className="w-full">
        {submitLabel}
      </Button>
    </form>
  );
}
