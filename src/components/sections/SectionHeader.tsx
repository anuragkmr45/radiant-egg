import type { ReactNode } from "react";

import { BadgePill } from "@/components/ui/BadgePill";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  actions,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("section-header", `section-header--${align}`, className)}>
      {eyebrow ? <BadgePill>{eyebrow}</BadgePill> : null}
      <div className="section-header__body">
        <h1 className="display-title">{title}</h1>
        {description ? <p className="lead">{description}</p> : null}
      </div>
      {actions ? <div className="section-header__actions">{actions}</div> : null}
    </div>
  );
}
