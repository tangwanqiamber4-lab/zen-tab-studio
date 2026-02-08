import TopBar from "@/components/home/TopBar";
import HeroSection from "@/components/home/HeroSection";
import AIFeaturesSection from "@/components/home/AIFeaturesSection";
import PricingCard from "@/components/home/PricingCard";

const Index = () => (
  <div className="flex flex-col">
    <TopBar />
    <HeroSection />
    <AIFeaturesSection />
    <PricingCard />
  </div>
);

export default Index;
