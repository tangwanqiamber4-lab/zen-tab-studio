import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import coverHiit from "@/assets/cover-hiit.jpg";

const exercises = [
  { name: "开合跳", duration: "1分钟" },
  { name: "深蹲", duration: "1分钟" },
  { name: "波比跳", duration: "1分钟" },
  { name: "高抬腿", duration: "1分钟" },
  { name: "平板支撑", duration: "1分钟" },
];

const TrainingDetail = () => {
  const navigate = useNavigate();
  const [aiCorrectionOn, setAiCorrectionOn] = useState(true);

  return (
    <div className="flex flex-col bg-background min-h-screen pb-20">
      <PageHeader title="训练详情" />

      {/* Cover */}
      <div className="relative h-[300px] overflow-hidden">
        <img src={coverHiit} alt="20分钟HIIT燃脂" className="w-full h-full object-cover" />
        <span className="absolute top-3 left-3 text-xs text-white font-medium rounded-md px-2.5 py-1 bg-accent">
          AI定制
        </span>
      </div>

      {/* Basic Info */}
      <div className="bg-card p-5">
        <h1 className="text-2xl font-bold text-foreground">20分钟HIIT燃脂</h1>
        <p className="text-sm text-muted-foreground mt-1">高效燃脂 · 适合你的强度</p>
        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">K3</span>
          <span>|</span>
          <span>8.7分</span>
          <span>|</span>
          <span>20分钟</span>
          <span>|</span>
          <span>官方精品</span>
        </div>
      </div>

      {/* AI Reason */}
      <div className="mx-5 mt-5 bg-card rounded-xl border-2 border-keep-green p-5">
        <p className="text-base font-semibold text-foreground">💡 AI教练推荐理由</p>
        <div className="mt-3 space-y-2.5 text-sm text-foreground">
          <div className="flex items-start gap-2">
            <span className="text-keep-green mt-0.5">●</span>
            <p>睡眠时间：<span className="font-medium">7h</span>，恢复状态良好</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-keep-green mt-0.5">●</span>
            <p>本周训练：<span className="font-medium">2次</span>，建议完成第3次训练</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-keep-green mt-0.5">●</span>
            <p>当前目标：<span className="font-medium">减脂</span></p>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-border">
          <p className="text-sm text-muted-foreground">因此推荐：</p>
          <p className="text-base font-bold text-foreground mt-1">20分钟 HIIT燃脂训练</p>
        </div>
      </div>

      {/* Exercise List */}
      <div className="bg-card mt-5 p-5">
        <h3 className="text-base font-bold text-foreground mb-4">训练内容（8个动作）</h3>
        <div className="space-y-0">
          {exercises.map((ex, i) => (
            <div
              key={ex.name}
              className="flex items-center justify-between py-3 border-b border-border last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-muted/40 flex items-center justify-center text-xs font-semibold text-muted-foreground">
                  {i + 1}
                </span>
                <span className="text-sm font-medium text-foreground">{ex.name}</span>
              </div>
              <span className="text-xs text-muted-foreground">{ex.duration}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Correction Toggle */}
      <div className="mx-5 mt-5 bg-card rounded-xl border border-primary/10 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <p className="text-base font-semibold text-foreground">开启AI实时动作纠正</p>
            <p className="text-xs text-muted-foreground mt-1">AI会实时检测你的动作，防止受伤</p>
            <span className="inline-block mt-2 text-xs text-white font-medium rounded-full px-2.5 py-0.5 bg-orange">
              剩余2次免费体验
            </span>
          </div>
          <button
            onClick={() => setAiCorrectionOn(!aiCorrectionOn)}
            className={`relative flex-shrink-0 w-12 h-7 rounded-full transition-colors duration-200 ${
              aiCorrectionOn ? "bg-keep-green" : "bg-muted/60"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform duration-200 ${
                aiCorrectionOn ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="max-w-lg mx-auto px-5 pb-5 pt-3 bg-gradient-to-t from-card via-card to-transparent">
          <button
            onClick={() => navigate("/workout")}
            className="w-full h-14 bg-keep-green text-keep-green-foreground font-bold text-lg rounded-xl transition-transform duration-200 hover:-translate-y-0.5 shadow-lg"
          >
            开始训练
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainingDetail;
