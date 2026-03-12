import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import coverHiit from "@/assets/cover-hiit.jpg";
import coverAbs from "@/assets/cover-abs.jpg";
import coverFullbody from "@/assets/cover-fullbody.jpg";
import coverYoga from "@/assets/cover-yoga.jpg";

const alternatives = [
  { title: "15分钟腹肌撕裂", duration: "15分钟", cover: coverAbs },
  { title: "30分钟全身燃脂", duration: "30分钟", cover: coverFullbody },
  { title: "瑜伽拉伸放松", duration: "25分钟", cover: coverYoga },
];

const AIRecommend = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-background min-h-screen">
      <PageHeader title="AI 教练推荐" showShare />

      {/* AI Status Card */}
      <div className="mx-5 mt-5 hero-gradient rounded-xl p-6">
        <p className="text-base font-semibold text-primary-foreground">🤖 AI 教练正在分析你的数据...</p>
        <div className="mt-3 space-y-1.5 text-sm text-primary-foreground/80">
          <p>✓ 睡眠质量：7小时</p>
          <p>✓ 体能状态：良好</p>
          <p>✓ 最近训练：3天前</p>
          <p>✓ 目标：减脂</p>
        </div>
        <p className="mt-4 text-base font-semibold text-primary-foreground">AI 教练建议：中等强度有氧训练</p>
      </div>

      {/* Today's Recommended Training */}
      <div className="mx-5 mt-5 bg-card rounded-xl border border-primary/10 overflow-hidden">
        {/* Cover */}
        <div className="relative h-[200px] overflow-hidden">
          <img src={coverHiit} alt="20分钟HIIT燃脂" className="w-full h-full object-cover" />
          <span className="absolute top-3 left-3 text-xs text-white font-medium rounded-md px-2.5 py-1 bg-accent">
            AI定制
          </span>
        </div>

        <div className="p-4 space-y-4">
          {/* Info */}
          <div>
            <h2 className="text-xl font-bold text-foreground">20分钟HIIT燃脂</h2>
            <p className="text-sm text-muted-foreground mt-1">根据你的体能状态，这个训练强度刚好</p>
            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">K3</span>
              <span>|</span>
              <span>8.7分</span>
              <span>|</span>
              <span>20分钟</span>
            </div>
          </div>

          {/* AI Reason */}
          <div className="bg-keep-green/10 rounded-lg p-4">
            <p className="text-sm font-semibold text-foreground">💡 为什么推荐这个？</p>
            <ul className="mt-2 space-y-1 text-xs text-foreground leading-relaxed">
              <li>• 时长20分钟，适合你的碎片时间</li>
              <li>• HIIT高效燃脂，符合你的减脂目标</li>
              <li>• 强度K3，匹配你的当前体能</li>
            </ul>
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate("/training-detail")}
            className="w-full h-12 bg-keep-green text-keep-green-foreground font-semibold text-base rounded-lg transition-transform duration-200 hover:-translate-y-0.5"
          >
            开始训练
          </button>
        </div>
      </div>

      {/* Alternatives */}
      <div className="mt-6 px-5">
        <h3 className="text-base font-bold text-foreground mb-3">如果你想换换口味</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
          {alternatives.map((alt) => (
            <div
              key={alt.title}
              onClick={() => navigate("/training-detail")}
              className="flex-shrink-0 w-40 bg-card rounded-lg border border-primary/10 overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="h-24 overflow-hidden">
                <img src={alt.cover} alt={alt.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold text-foreground truncate">{alt.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{alt.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Free Usage Prompt */}
      <div className="mx-5 mt-6 mb-6 bg-card rounded-xl border border-primary/10 p-4">
        <p className="text-sm font-semibold text-foreground">今日免费推荐已使用：0/1次</p>
        <div className="mt-3 h-2 bg-muted/40 rounded-full overflow-hidden">
          <div className="h-full w-0 bg-keep-green rounded-full" />
        </div>
        <p className="text-xs text-muted-foreground mt-2">升级会员享无限推荐</p>
      </div>
    </div>
  );
};

export default AIRecommend;
