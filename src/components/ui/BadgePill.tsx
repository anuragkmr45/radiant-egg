import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

interface BadgePillProps extends ComponentPropsWithoutRef<"span"> {
  tone?: "light" | "dark" | "outline";
}

export function BadgePill({
  tone = "light",
  className,
  ...props
}: BadgePillProps) {
  return <span className={cn("badge-pill", `badge-pill--${tone}`, className)} {...props} />;
}
