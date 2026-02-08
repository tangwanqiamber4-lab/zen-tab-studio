import { useNavigate } from "react-router-dom";
import { X, Check } from "lucide-react";

export interface AIFeatureData {
  route: string;
  emoji: string;
  tagLabel: string;
  tagColor: string;
  title: string;
  pastProblem: string;
  nowSolution: string;
  ctaText: string;
}

const AIFeatureCard = ({ feature }: { feature: AIFeatureData }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(feature.route)}
      className="bg-card rounded-xl border border-primary/10 overflow-hidden cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
    >
      {/* Visual area */}
      <div className="hero-gradient flex items-center justify-center" style={{ height: 240 }}>
        <span className="text-[80px] leading-none select-none">{feature.emoji}</span>
      </div>

      {/* Info area */}
      <div className="p-6">
        {/* Tag */}
        <span
          className="inline-block text-xs text-white font-medium rounded-full px-3 py-1 mb-4"
          style={{ backgroundColor: feature.tagColor }}
        >
          {feature.tagLabel}
        </span>

        {/* Title */}
        <h3 className="text-2xl font-bold text-foreground mb-5">{feature.title}</h3>

        {/* Past vs Now comparison */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">过去</p>
            <p className="text-sm text-foreground">{feature.pastProblem}</p>
            <X size={16} className="text-destructive" strokeWidth={2.5} />
          </div>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">现在</p>
            <p className="text-sm text-foreground">{feature.nowSolution}</p>
            <Check size={16} className="text-keep-green" strokeWidth={2.5} />
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-end">
          <button className="bg-keep-green text-keep-green-foreground text-sm font-medium rounded-lg transition-transform duration-200 hover:-translate-y-0.5" style={{ width: 120, height: 40 }}>
            {feature.ctaText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIFeatureCard;
