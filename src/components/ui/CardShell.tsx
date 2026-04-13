import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { BadgePill } from "@/components/ui/BadgePill";
import { cn } from "@/lib/utils";

interface CardShellProps extends ComponentPropsWithoutRef<"article"> {
  eyebrow?: string;
  title?: string;
  description?: string;
  footer?: ReactNode;
  tone?: "light" | "dark";
}

export function CardShell({
  eyebrow,
  title,
  description,
  footer,
  tone = "light",
  className,
  children,
  ...props
}: CardShellProps) {
  return (
    <article className={cn("card-shell", `card-shell--${tone}`, className)} {...props}>
      {eyebrow ? (
        <div className="card-shell__eyebrow">
          <BadgePill tone={tone === "dark" ? "dark" : "light"}>{eyebrow}</BadgePill>
        </div>
      ) : null}
      {title ? <h3 className="card-shell__title">{title}</h3> : null}
      {description ? <p className="card-shell__description">{description}</p> : null}
      {children ? <div className="card-shell__content">{children}</div> : null}
      {footer ? <div className="card-shell__footer">{footer}</div> : null}
    </article>
  );
}
