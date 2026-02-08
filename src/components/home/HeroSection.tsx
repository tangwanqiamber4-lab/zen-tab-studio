import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="hero-gradient flex flex-col items-center justify-center text-center px-6" style={{ height: 200 }}>
      <h1 className="text-[32px] font-bold text-primary-foreground leading-tight tracking-tight">
        AI驱动的智能健身
      </h1>
      <p className="mt-3 text-base text-primary-foreground/80 leading-relaxed">
        5大AI功能升级 · 让科学健身触手可及
      </p>
      <div className="mt-5 animate-bounce-down text-primary-foreground/60">
        <ChevronDown size={20} strokeWidth={2} />
      </div>
    </section>
  );
};

export default HeroSection;
