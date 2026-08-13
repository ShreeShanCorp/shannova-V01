import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import { useCreateCurriculum, useCurricula } from "@/hooks/use-curricula";

export const Route = createFileRoute("/admin/curriculum/")({
  component: CurriculumListPage,
});

const formSchema = z.object({
  name: z.string().min(1, "Required"),
  description: z.string().optional(),
  version: z.string().optional(),
});
type FormValues = z.infer<typeof formSchema>;

function CurriculumListPage() {
  const { data, isLoading } = useCurricula({ pageSize: 100 });
  const createMutation = useCreateCurriculum();
  const [open, setOpen] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", description: "", version: "1.0" },
  });

  const curricula = data?.data ?? [];

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Curriculum</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>New curriculum</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New curriculum</DialogTitle>
            </DialogHeader>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(async (values) => {
                await createMutation.mutateAsync(values);
                form.reset();
                setOpen(false);
              })}
            >
              <div className="space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...form.register("name")} />
                {form.formState.errors.name && (
                  <p className="text-destructive text-xs">{form.formState.errors.name.message}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" {...form.register("description")} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="version">Version</Label>
                <Input id="version" {...form.register("version")} />
              </div>
              {createMutation.isError && (
                <p className="text-destructive text-sm">{createMutation.error.message}</p>
              )}
              <Button type="submit" disabled={createMutation.isPending} className="w-full">
                {createMutation.isPending ? "Creating..." : "Create curriculum"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="pt-6">
          {isLoading ? (
            <p className="text-muted-foreground text-sm">Loading...</p>
          ) : curricula.length === 0 ? (
            <p className="text-muted-foreground text-sm">No curricula yet.</p>
          ) : (
            <ul className="divide-y">
              {curricula.map((c) => (
                <li key={c.id} className="flex items-center justify-between py-3">
                  <div>
                    <Link
                      to="/admin/curriculum/$curriculumId"
                      params={{ curriculumId: c.id }}
                      className="font-medium hover:underline"
                    >
                      {c.name}
                    </Link>
                    <p className="text-muted-foreground text-sm">v{c.version}</p>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/admin/curriculum/$curriculumId" params={{ curriculumId: c.id }}>
                      Manage
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
