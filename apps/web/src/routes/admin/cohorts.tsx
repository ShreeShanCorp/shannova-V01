import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCohorts, useCreateCohort, useDeleteCohort, useUpdateCohort } from "@/hooks/use-cohorts";
import { useCurricula } from "@/hooks/use-curricula";
import { useCreateEnrollment, useDeleteEnrollment, useEnrollments } from "@/hooks/use-enrollments";
import { useUsers } from "@/hooks/use-users";
import { COHORT_STATUSES } from "@/types/api";
import type { Cohort, Curriculum } from "@/types/api";

export const Route = createFileRoute("/admin/cohorts")({
  component: CohortsPage,
});

const WEEKS_DEFAULT = 12;

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function addWeeks(dateStr: string, weeks: number) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + weeks * 7);
  return d;
}

const cohortFormSchema = z.object({
  name: z.string().min(1, "Required"),
  slug: z.string().min(1, "Required"),
  startDate: z.string().min(1, "Required"),
  curriculumId: z.string().min(1, "Select a curriculum"),
  status: z.enum(COHORT_STATUSES),
});
type CohortFormValues = z.infer<typeof cohortFormSchema>;

function CohortsPage() {
  const { data, isLoading } = useCohorts({ pageSize: 100 });
  const { data: curriculaData } = useCurricula({ pageSize: 100 });
  const deleteMutation = useDeleteCohort();

  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<Cohort | null>(null);
  const [rosterCohort, setRosterCohort] = useState<Cohort | null>(null);

  const cohorts = data?.data ?? [];
  const curricula = curriculaData?.data ?? [];

  return (
    <div className="mx-auto max-w-5xl space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Cohorts</h1>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button disabled={curricula.length === 0}>New cohort</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New cohort</DialogTitle>
            </DialogHeader>
            <CreateCohortForm curricula={curricula} onDone={() => setCreateOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {curricula.length === 0 && !isLoading && (
        <p className="text-muted-foreground text-sm">
          Create a curriculum first (Curriculum tab) before adding a cohort.
        </p>
      )}

      <Card>
        <CardContent className="pt-6">
          {isLoading ? (
            <p className="text-muted-foreground text-sm">Loading...</p>
          ) : cohorts.length === 0 ? (
            <p className="text-muted-foreground text-sm">No cohorts yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Start</TableHead>
                  <TableHead>End</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cohorts.map((cohort) => (
                  <TableRow key={cohort.id}>
                    <TableCell className="font-medium">{cohort.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{cohort.status}</Badge>
                    </TableCell>
                    <TableCell>{new Date(cohort.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(cohort.endDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => setRosterCohort(cohort)}>
                          Roster
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setEditing(cohort)}>
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          disabled={deleteMutation.isPending}
                          onClick={() => {
                            if (window.confirm(`Delete cohort "${cohort.name}"?`)) {
                              deleteMutation.mutate(cohort.id);
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={Boolean(editing)} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit cohort</DialogTitle>
          </DialogHeader>
          {editing && (
            <EditCohortForm cohort={editing} curricula={curricula} onDone={() => setEditing(null)} />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(rosterCohort)} onOpenChange={(open) => !open && setRosterCohort(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Roster — {rosterCohort?.name}</DialogTitle>
          </DialogHeader>
          {rosterCohort && <RosterPanel cohort={rosterCohort} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CohortFields({
  form,
  curricula,
}: {
  form: ReturnType<typeof useForm<CohortFormValues>>;
  curricula: Curriculum[];
}) {
  const nameValue = form.watch("name");
  const startDate = form.watch("startDate");
  const slugDirty = form.formState.dirtyFields.slug;

  useEffect(() => {
    if (!slugDirty) form.setValue("slug", slugify(nameValue || ""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameValue]);

  return (
    <>
      <div className="space-y-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...form.register("name")} />
        {form.formState.errors.name && (
          <p className="text-destructive text-xs">{form.formState.errors.name.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" {...form.register("slug")} />
        {form.formState.errors.slug && (
          <p className="text-destructive text-xs">{form.formState.errors.slug.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="curriculumId">Curriculum</Label>
        <Controller
          control={form.control}
          name="curriculumId"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="curriculumId" className="w-full">
                <SelectValue placeholder="Select a curriculum" />
              </SelectTrigger>
              <SelectContent>
                {curricula.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {form.formState.errors.curriculumId && (
          <p className="text-destructive text-xs">{form.formState.errors.curriculumId.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="status">Status</Label>
        <Controller
          control={form.control}
          name="status"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="status" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COHORT_STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="startDate">Start date</Label>
        <Input id="startDate" type="date" {...form.register("startDate")} />
        {form.formState.errors.startDate && (
          <p className="text-destructive text-xs">{form.formState.errors.startDate.message}</p>
        )}
      </div>

      <p className="text-muted-foreground text-sm">
        End date (auto, {WEEKS_DEFAULT} weeks):{" "}
        {startDate ? addWeeks(startDate, WEEKS_DEFAULT).toLocaleDateString() : "—"}
      </p>
    </>
  );
}

function CreateCohortForm({ curricula, onDone }: { curricula: Curriculum[]; onDone: () => void }) {
  const createMutation = useCreateCohort();
  const form = useForm<CohortFormValues>({
    resolver: zodResolver(cohortFormSchema),
    defaultValues: { name: "", slug: "", startDate: "", curriculumId: curricula[0]?.id ?? "", status: "UPCOMING" },
  });

  return (
    <form
      className="space-y-4"
      onSubmit={form.handleSubmit(async (values) => {
        await createMutation.mutateAsync({
          name: values.name,
          slug: values.slug,
          status: values.status,
          startDate: new Date(values.startDate),
          endDate: addWeeks(values.startDate, WEEKS_DEFAULT),
          curriculumId: values.curriculumId,
        });
        form.reset();
        onDone();
      })}
    >
      <CohortFields form={form} curricula={curricula} />
      {createMutation.isError && (
        <p className="text-destructive text-sm">{createMutation.error.message}</p>
      )}
      <Button type="submit" disabled={createMutation.isPending} className="w-full">
        {createMutation.isPending ? "Creating..." : "Create cohort"}
      </Button>
    </form>
  );
}

function EditCohortForm({
  cohort,
  curricula,
  onDone,
}: {
  cohort: Cohort;
  curricula: Curriculum[];
  onDone: () => void;
}) {
  const updateMutation = useUpdateCohort(cohort.id);
  const form = useForm<CohortFormValues>({
    resolver: zodResolver(cohortFormSchema),
    defaultValues: {
      name: cohort.name,
      slug: cohort.slug,
      startDate: cohort.startDate.slice(0, 10),
      curriculumId: cohort.curriculumId,
      status: cohort.status,
    },
  });

  return (
    <form
      className="space-y-4"
      onSubmit={form.handleSubmit(async (values) => {
        await updateMutation.mutateAsync({
          name: values.name,
          slug: values.slug,
          status: values.status,
          startDate: new Date(values.startDate),
          endDate: addWeeks(values.startDate, WEEKS_DEFAULT),
          curriculumId: values.curriculumId,
        });
        onDone();
      })}
    >
      <CohortFields form={form} curricula={curricula} />
      {updateMutation.isError && (
        <p className="text-destructive text-sm">{updateMutation.error.message}</p>
      )}
      <Button type="submit" disabled={updateMutation.isPending} className="w-full">
        {updateMutation.isPending ? "Saving..." : "Save changes"}
      </Button>
    </form>
  );
}

function RosterPanel({ cohort }: { cohort: Cohort }) {
  const { data: enrollments, isLoading } = useEnrollments(cohort.id);
  const { data: users } = useUsers();
  const createEnrollment = useCreateEnrollment();
  const deleteEnrollment = useDeleteEnrollment();
  const [selectedUserId, setSelectedUserId] = useState("");

  const enrolledUserIds = new Set((enrollments ?? []).map((e) => e.userId));
  const availableUsers = (users ?? []).filter((u) => !enrolledUserIds.has(u.id));

  return (
    <div className="space-y-4">
      {isLoading ? (
        <p className="text-muted-foreground text-sm">Loading...</p>
      ) : (enrollments ?? []).length === 0 ? (
        <p className="text-muted-foreground text-sm">No one enrolled yet.</p>
      ) : (
        <ul className="space-y-2">
          {(enrollments ?? []).map((e) => (
            <li key={e.id} className="flex items-center justify-between text-sm">
              <span>
                {e.user.email} <Badge variant="outline">{e.role}</Badge>
              </span>
              <Button
                variant="ghost"
                size="sm"
                disabled={deleteEnrollment.isPending}
                onClick={() => deleteEnrollment.mutate(e.id)}
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-end gap-2 border-t pt-4">
        <div className="flex-1 space-y-1.5">
          <Label htmlFor="enroll-user">Enroll a user</Label>
          <Select value={selectedUserId} onValueChange={setSelectedUserId}>
            <SelectTrigger id="enroll-user" className="w-full">
              <SelectValue placeholder="Select a user" />
            </SelectTrigger>
            <SelectContent>
              {availableUsers.map((u) => (
                <SelectItem key={u.id} value={u.id}>
                  {u.email} ({u.role})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          disabled={!selectedUserId || createEnrollment.isPending}
          onClick={() => {
            createEnrollment.mutate(
              { userId: selectedUserId, cohortId: cohort.id },
              { onSuccess: () => setSelectedUserId("") },
            );
          }}
        >
          Enroll
        </Button>
      </div>
    </div>
  );
}
