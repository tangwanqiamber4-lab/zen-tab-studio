import AIFeatureCard, { type AIFeatureData } from "./AIFeatureCard";

const features: AIFeatureData[] = [
  {
    route: "/ai-recommend",
    emoji: "⚡",
    tagLabel: "免费体验",
    tagColor: "#00C261",
    title: "AI智能训练推荐",
    pastProblem: "AI功能付费墙阻隔",
    nowSolution: "每天免费体验1次",
    ctaText: "立即体验",
  },
  {
    route: "/ai-correction",
    emoji: "📹",
    tagLabel: "Beta测试",
    tagColor: "#FF9D42",
    title: "AI实时动作纠正",
    pastProblem: "动作错误无人纠正",
    nowSolution: "AI实时语音指导",
    ctaText: "体验纠正",
  },
  {
    route: "/ai-nutrition",
    emoji: "🥗",
    tagLabel: "全新功能",
    tagColor: "#FF6B9D",
    title: "AI本地化营养师",
    pastProblem: "西式食谱不适用",
    nowSolution: "中式健康食谱",
    ctaText: "查看食谱",
  },
  {
    route: "/ai-insights",
    emoji: "📊",
    tagLabel: "智能分析",
    tagColor: "#5B9BFF",
    title: "AI数据分析师",
    pastProblem: "数据多无洞察",
    nowSolution: "AI给出改进建议",
    ctaText: "分析数据",
  },
  {
    route: "/ai-companion",
    emoji: "💪",
    tagLabel: "长期陪伴",
    tagColor: "#A78BFA",
    title: "AI健身伙伴",
    pastProblem: "坚持率低易放弃",
    nowSolution: "AI每日激励+伙伴匹配",
    ctaText: "找伙伴",
  },
];

const AIFeaturesSection = () => {
  return (
    <section className="section-gradient px-5 pt-10 pb-6">
      <div className="flex flex-col gap-6">
        {features.map((feature) => (
          <AIFeatureCard key={feature.route} feature={feature} />
        ))}
      </div>
    </section>
  );
};

export default AIFeaturesSection;
