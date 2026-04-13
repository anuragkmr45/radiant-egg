import {
  Award,
  BadgeCheck,
  Bolt,
  BriefcaseBusiness,
  Building2,
  ClipboardCheck,
  Droplets,
  Factory,
  FlaskConical,
  Fuel,
  GraduationCap,
  HardHat,
  Layers3,
  Package,
  ScrollText,
  SearchCheck,
  ShieldCheck,
  TrainFront,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";

import type { HomeIconKey } from "@/types/content";

const iconMap: Record<HomeIconKey, ComponentType<LucideProps>> = {
  award: Award,
  badge: BadgeCheck,
  bolt: Bolt,
  briefcase: BriefcaseBusiness,
  building: Building2,
  clipboard: ClipboardCheck,
  droplets: Droplets,
  factory: Factory,
  flask: FlaskConical,
  fuel: Fuel,
  graduation: GraduationCap,
  hardhat: HardHat,
  layers: Layers3,
  package: Package,
  scroll: ScrollText,
  search: SearchCheck,
  shield: ShieldCheck,
  train: TrainFront,
};

interface HomeIconProps extends LucideProps {
  name: HomeIconKey;
}

export function HomeIcon({ name, ...props }: HomeIconProps) {
  const Icon = iconMap[name];

  return <Icon aria-hidden="true" {...props} />;
}
