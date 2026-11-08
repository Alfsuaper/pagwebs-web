import HeroSection from "@/components/sections/HeroSection";
import HolographicDashboardSection from "@/components/sections/HolographicDashboardSection";
import AboutSection from "@/components/sections/AboutSection";
import ScrollStorytellingSection from "@/components/sections/ScrollStorytellingSection";
import ServicesCatalog from "@/components/sections/ServicesCatalog";
import RoadmapSection from "@/components/sections/RoadmapSection";
import EnterpriseArchitecture from "@/components/sections/EnterpriseArchitecture";
import SectorAdaptability from "@/components/sections/SectorAdaptability";
import QuoteFunnel from "@/components/sections/QuoteFunnel";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import FaqSection from "@/components/sections/FaqSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col space-y-12">
      <HeroSection />
      <HolographicDashboardSection />
      <AboutSection />
      <ScrollStorytellingSection />
      <ServicesCatalog />
      <RoadmapSection />
      <EnterpriseArchitecture />
      <SectorAdaptability />
      <QuoteFunnel />
      <CaseStudiesSection />
      <FaqSection />
      <ContactSection />
    </main>
  );
}
