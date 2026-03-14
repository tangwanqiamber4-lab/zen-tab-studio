import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Brain } from "lucide-react";
import TopBar from "@/components/home/TopBar";
import coverHiit from "@/assets/cover-hiit.jpg";
import coverFullbody from "@/assets/cover-fullbody.jpg";
import coverYoga from "@/assets/cover-yoga.jpg";
import { loadDailyStatus, getAIAnalysis } from "@/stores/dailyStatus";

const coverMap: Record<string, string> = {
  HIIT: coverHiit,
  燃脂: coverHiit,
  全身: coverFullbody,
  激活: coverFullbody,
  快速: coverHiit,
  瑜伽: coverYoga,
  拉伸: coverYoga,
  放松: coverYoga,
};

function getCover(name: string) {
  for (const [key, src] of Object.entries(coverMap)) {
    if (name.includes(key)) return src;
  }
  return coverHiit;
}

const Index = () => {
  const navigate = useNavigate();

  const ai = useMemo(() => {
    const status = loadDailyStatus();
    if (!status) return null;
    return getAIAnalysis(status);
  }, []);

  const statusLabel = ai?.statusLabel ?? "良好";
  const sleepDisplay = ai?.sleep ?? "7h";
  const weightDisplay = ai ? `${ai.weight}kg` : "62kg";
  const analysisLines = ai?.analysis ?? [
    "根据你的睡眠（7h）和体能状态，今天适合中等强度训练",
    "本周已训练2次，建议完成第3次训练",
  ];
  const training = ai?.training ?? {
    name: "20分钟HIIT燃脂",
    intensity: "K3",
    tag: "高效燃脂",
    duration: "20分钟",
  };

  const statusColor = statusLabel === "良好" ? "text-keep-green" : statusLabel === "一般" ? "text-secondary" : "text-orange";

  return (
    <div className="flex flex-col">
      <TopBar />

      {/* 今日身体状态 */}
      <section className="mx-5 mt-4 bg-card rounded-xl border border-primary/10 p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-foreground">今日身体状态</h2>
          <button
            onClick={() => navigate("/daily-status")}
            className="text-[10px] text-keep-green font-medium"
          >
            {ai ? "更新今日状态" : "记录今日状态"} →
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center gap-0.5 bg-keep-green/[0.08] rounded-lg py-2.5">
            <span className={`text-base font-bold ${statusColor}`}>{statusLabel}</span>
            <span className="text-[10px] text-muted-foreground">体能状态</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 bg-secondary/[0.08] rounded-lg py-2.5">
            <span className="text-base font-bold text-secondary">{sleepDisplay}</span>
            <span className="text-[10px] text-muted-foreground">睡眠时长</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 bg-orange/[0.08] rounded-lg py-2.5">
            <span className="text-base font-bold text-orange">{weightDisplay}</span>
            <span className="text-[10px] text-muted-foreground">当前体重</span>
          </div>
        </div>
      </section>

      {/* AI 教练建议 */}
      <section className="mx-5 mt-3 hero-gradient rounded-xl px-4 py-3">
        <div className="flex items-center gap-2 mb-2">
          <Brain size={16} className="text-primary-foreground flex-shrink-0" />
          <span className="text-sm font-bold text-primary-foreground">AI 教练建议</span>
        </div>
        <div className="space-y-1 text-sm text-primary-foreground/90">
          {analysisLines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
          <p className="mt-2 font-medium text-primary-foreground">推荐训练：{training.name}</p>
        </div>
      </section>

      {/* AI 教练推荐训练 — 核心模块 */}
      <section className="mx-5 mt-3 bg-card rounded-2xl border-2 border-keep-green/20 overflow-hidden shadow-lg shadow-keep-green/[0.06]">
        <div className="relative h-[180px] overflow-hidden">
          <img src={getCover(training.name)} alt="今日推荐训练" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <span className="absolute top-3 left-3 text-[10px] text-white font-semibold rounded-md px-2.5 py-1 bg-accent">
            AI 教练推荐
          </span>
          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="text-lg font-bold text-white">{training.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-white/80">强度 {training.intensity}</span>
              <span className="text-white/50">·</span>
              <span className="text-xs text-white/80">{training.duration}</span>
              <span className="text-white/50">·</span>
              <span className="text-xs text-white/80">适合当前状态</span>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] text-keep-green bg-keep-green/10 rounded-full px-2.5 py-0.5 font-medium">减脂推荐</span>
            <span className="text-[10px] text-orange bg-orange/10 rounded-full px-2.5 py-0.5 font-medium">{training.tag}</span>
          </div>
          <button
            onClick={() => navigate("/training-detail")}
            className="w-full h-12 bg-keep-green text-keep-green-foreground font-bold text-base rounded-xl transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            开始训练
          </button>
        </div>
      </section>


      {/* 最近训练 */}
      <section className="mx-5 mt-3 bg-card rounded-xl border border-primary/10 p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-foreground">最近训练</h2>
          <button
            onClick={() => navigate("/training-history")}
            className="flex items-center gap-0.5 text-xs text-keep-green font-medium"
          >
            查看全部 <ChevronRight size={12} />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">HIIT燃脂</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">昨天 · 20分钟</p>
          </div>
          <span className="text-xs text-orange font-medium">215卡</span>
        </div>
      </section>

      {/* AI训练总结 */}
      <section className="mx-5 mt-3 bg-card rounded-xl border border-primary/10 p-4">
        <div className="flex items-center gap-2 mb-1">
          <Brain size={14} className="text-keep-green flex-shrink-0" />
          <h2 className="text-sm font-bold text-foreground">AI训练总结</h2>
        </div>
        <p className="text-[10px] text-muted-foreground mb-3">根据你最近7天的训练记录分析</p>
        <div className="space-y-2.5 text-sm">
          <div>
            <p className="font-medium text-foreground text-xs mb-1">AI发现：</p>
            <ul className="space-y-0.5 text-xs text-muted-foreground">
              <li>• 最近训练以核心训练为主</li>
              <li>• 有氧训练比例偏少</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-foreground text-xs mb-1">AI建议：</p>
            <ul className="space-y-0.5 text-xs text-muted-foreground">
              <li>• 本周建议增加1次HIIT训练</li>
              <li>• 帮助提升燃脂效率</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 会员订阅 */}
      <section className="mx-5 mt-3 mb-6">
        <div onClick={() => navigate("/membership")} className="bg-card rounded-xl border border-primary/10 px-4 py-3 flex items-center gap-3 cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md">
          <span className="text-xl leading-none select-none">👑</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-foreground">解锁全部 AI 功能</p>
            <p className="text-[10px] text-muted-foreground">免费试用7天 · 之后 ¥49/月</p>
          </div>
          <ChevronRight size={16} className="text-muted-foreground flex-shrink-0" />
        </div>
      </section>
    </div>
  );
};

export default Index;
