import { HomeAboutSection } from "@/components/sections/home/HomeAboutSection";
import { HomeClientsSection } from "@/components/sections/home/HomeClientsSection";
import { HomeCredentialsStrip } from "@/components/sections/home/HomeCredentialsStrip";
import { HomeCtaBanner } from "@/components/sections/home/HomeCtaBanner";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { HomeIndustriesSection } from "@/components/sections/home/HomeIndustriesSection";
import { HomeReasonsSection } from "@/components/sections/home/HomeReasonsSection";
import { HomeServicesSection } from "@/components/sections/home/HomeServicesSection";
import type { HomePageContent } from "@/types/content";

interface HomePageViewProps {
  content: HomePageContent;
}

export function HomePageView({ content }: HomePageViewProps) {
  return (
    <>
      <HomeHero content={content.hero} />
      <HomeCredentialsStrip items={content.credentials} />
      <HomeAboutSection content={content.about} />
      <HomeServicesSection content={content.services} />
      <HomeReasonsSection content={content.reasons} />
      <HomeIndustriesSection content={content.industries} />
      <HomeClientsSection content={content.clients} />
      <HomeCtaBanner content={content.cta} />
    </>
  );
}
