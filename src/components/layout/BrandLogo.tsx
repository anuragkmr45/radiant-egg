import Image from "next/image";

import { cn } from "@/lib/utils";

type BrandLogoVariant = "compact" | "full" | "mark" | "lockup" | "nav" | "footer";
type BrandLogoTone = "plain" | "panel";

interface BrandLogoProps {
  variant: BrandLogoVariant;
  tone?: BrandLogoTone;
  className?: string;
  priority?: boolean;
}

const BRAND_ASSETS: Record<
  BrandLogoVariant,
  { src: string; width: number; height: number; alt: string; unoptimized?: boolean }
> = {
  compact: {
    src: "/brand/recpl-mark.png",
    width: 512,
    height: 512,
    alt: "RECPL emblem",
  },
  full: {
    src: "/brand/recpl-mark.png",
    width: 512,
    height: 512,
    alt: "RECPL emblem",
  },
  mark: {
    src: "/brand/recpl-mark.png",
    width: 512,
    height: 512,
    alt: "RECPL emblem",
  },
  lockup: {
    src: "/brand/recpl-logo-yellow-removebg.png",
    width: 508,
    height: 424,
    alt: "RECPL logo",
  },
  nav: {
    src: "/brand/recpl_nav.webp",
    width: 960,
    height: 317,
    alt: "RECPL navbar logo",
  },
  footer: {
    src: "/brand/recpl_footer.webp",
    width: 640,
    height: 537,
    alt: "RECPL footer logo",
  },
};

export function BrandLogo({
  variant,
  tone = "plain",
  className,
  priority = false,
}: BrandLogoProps) {
  const asset = BRAND_ASSETS[variant];

  return (
    <span
      className={cn(
        "brand-logo",
        `brand-logo--${variant}`,
        tone === "panel" ? "brand-logo--panel" : null,
        className,
      )}
    >
      <Image
        alt={asset.alt}
        className="brand-logo__image"
        height={asset.height}
        priority={priority}
        sizes="(max-width: 767px) 180px, 320px"
        src={asset.src}
        width={asset.width}
        {...(asset.unoptimized ? { unoptimized: true } : {})}
      />
    </span>
  );
}
