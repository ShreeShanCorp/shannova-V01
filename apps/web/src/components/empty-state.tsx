import { Inbox, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Consistent "nothing here yet" treatment: icon + message + optional CTA,
 * used in place of ad-hoc muted-text-only empty states across the app. */
export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center gap-3 py-10 text-center", className)}>
      <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full">
        <Icon className="size-6" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium">{title}</p>
        {description && <p className="text-muted-foreground max-w-xs text-sm">{description}</p>}
      </div>
      {action}
    </div>
  );
}
