import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

interface ButtonLinkProps
  extends LinkProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconEnd?: ReactNode;
}

export function buttonClassName(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  return cn(
    "action-button",
    `action-button--${variant}`,
    `action-button--${size}`,
    className,
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  iconEnd,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonClassName(variant, size, className)} {...props}>
      <span>{children}</span>
      {iconEnd ? <span aria-hidden="true">{iconEnd}</span> : null}
    </Link>
  );
}

export function PrimaryButton(props: Omit<ButtonLinkProps, "variant">) {
  return <ButtonLink variant="primary" {...props} />;
}

export function SecondaryButton(props: Omit<ButtonLinkProps, "variant">) {
  return <ButtonLink variant="secondary" {...props} />;
}
