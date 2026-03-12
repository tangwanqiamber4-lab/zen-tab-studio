import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="hero-gradient flex flex-col items-center justify-center text-center px-6 py-6">
      <h1 className="text-2xl font-bold text-primary-foreground leading-tight tracking-tight">
        AI驱动的智能健身
      </h1>
      <p className="mt-1.5 text-sm text-primary-foreground/80 leading-relaxed">
        5大AI功能升级 · 让科学健身触手可及
      </p>
      <div className="mt-2 animate-bounce-down text-primary-foreground/60">
        <ChevronDown size={16} strokeWidth={2} />
      </div>
    </section>
  );
};

export default HeroSection;
