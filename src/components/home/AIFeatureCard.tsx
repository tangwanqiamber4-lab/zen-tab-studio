import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

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
      className="bg-card rounded-xl border border-primary/10 p-4 cursor-pointer transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] flex items-center gap-4"
    >
      {/* Emoji */}
      <span className="text-[36px] leading-none select-none flex-shrink-0">{feature.emoji}</span>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-foreground truncate">{feature.title}</h3>
          <span
            className="flex-shrink-0 text-[10px] text-white font-medium rounded-full px-2 py-0.5"
            style={{ backgroundColor: feature.tagColor }}
          >
            {feature.tagLabel}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1 truncate">
          <span className="line-through opacity-60">{feature.pastProblem}</span>
          <span className="mx-1.5">→</span>
          <span className="text-keep-green font-medium">{feature.nowSolution}</span>
        </p>
      </div>

      {/* Arrow */}
      <ChevronRight size={16} className="text-muted-foreground flex-shrink-0" />
    </div>
  );
};

export default AIFeatureCard;
