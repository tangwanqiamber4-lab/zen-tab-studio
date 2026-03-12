import { useNavigate } from "react-router-dom";
import { ChevronRight, TrendingUp, Zap, Brain } from "lucide-react";
import TopBar from "@/components/home/TopBar";
import coverHiit from "@/assets/cover-hiit.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <TopBar />

      {/* 今日身体状态 */}
      <section className="mx-5 mt-4 bg-card rounded-xl border border-primary/10 p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-foreground">今日身体状态</h2>
          <span className="text-[10px] text-muted-foreground">更新于 08:30</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center gap-0.5 bg-keep-green/[0.08] rounded-lg py-2.5">
            <span className="text-base font-bold text-keep-green">良好</span>
            <span className="text-[10px] text-muted-foreground">体能状态</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 bg-secondary/[0.08] rounded-lg py-2.5">
            <span className="text-base font-bold text-secondary">7h</span>
            <span className="text-[10px] text-muted-foreground">睡眠时长</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 bg-orange/[0.08] rounded-lg py-2.5">
            <span className="text-base font-bold text-orange">62kg</span>
            <span className="text-[10px] text-muted-foreground">当前体重</span>
          </div>
        </div>
      </section>

      {/* AI 智能分析 — 精简为2条 */}
      <section className="mx-5 mt-3 hero-gradient rounded-xl px-4 py-3 flex items-start gap-2.5">
        <Brain size={16} className="text-primary-foreground mt-0.5 flex-shrink-0" />
        <div className="space-y-1 text-sm text-primary-foreground/90">
          <p>今日体能恢复良好，适合中等强度训练</p>
          <p>本周已训练2次，建议完成第3次</p>
        </div>
      </section>

      {/* AI 今日训练建议 — 核心模块，视觉突出 */}
      <section className="mx-5 mt-3 bg-card rounded-2xl border-2 border-keep-green/20 overflow-hidden shadow-lg shadow-keep-green/[0.06]">
        <div className="relative h-[180px] overflow-hidden">
          <img src={coverHiit} alt="今日推荐训练" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <span className="absolute top-3 left-3 text-[10px] text-white font-semibold rounded-md px-2.5 py-1 bg-accent">
            AI 推荐
          </span>
          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="text-lg font-bold text-white">20分钟HIIT燃脂</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-white/80">强度 K3</span>
              <span className="text-white/50">·</span>
              <span className="text-xs text-white/80">20分钟</span>
              <span className="text-white/50">·</span>
              <span className="text-xs text-white/80">适合当前状态</span>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] text-keep-green bg-keep-green/10 rounded-full px-2.5 py-0.5 font-medium">减脂推荐</span>
            <span className="text-[10px] text-orange bg-orange/10 rounded-full px-2.5 py-0.5 font-medium">高效燃脂</span>
          </div>
          <button
            onClick={() => navigate("/training-detail")}
            className="w-full h-12 bg-keep-green text-keep-green-foreground font-bold text-base rounded-xl transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            开始训练
          </button>
        </div>
      </section>

      {/* 健康管理入口 */}
      <section className="mx-5 mt-3">
        <button
          onClick={() => navigate("/health")}
          className="w-full bg-card rounded-xl border border-primary/10 px-4 py-3.5 flex items-center gap-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md text-left"
        >
          <span className="text-2xl">💚</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-foreground">健康管理</p>
            <p className="text-[10px] text-muted-foreground">查看营养摄入与身体数据分析</p>
          </div>
          <ChevronRight size={16} className="text-muted-foreground flex-shrink-0" />
        </button>
      </section>

      {/* 会员订阅 */}
      <section className="mx-5 mt-3 mb-6">
        <div className="bg-card rounded-xl border border-primary/10 px-4 py-3 flex items-center gap-3">
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
