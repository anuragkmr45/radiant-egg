import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";
import { themeTokens } from "@/theme/tokens";

type PageContainerProps = ComponentPropsWithoutRef<"div">;

export function PageContainer({
  className,
  style,
  ...props
}: PageContainerProps) {
  return (
    <div
      className={cn("page-container", className)}
      style={{
        maxWidth: themeTokens.sizes.containerMax,
        ...style,
      }}
      {...props}
    />
  );
}
