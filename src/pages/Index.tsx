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
      <section className="mx-5 mt-4 bg-card rounded-xl border border-primary/10 p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-foreground">今日身体状态</h2>
          <span className="text-xs text-muted-foreground">更新于 08:30</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center gap-1 bg-keep-green/[0.08] rounded-lg py-3">
            <span className="text-lg font-bold text-keep-green">良好</span>
            <span className="text-[10px] text-muted-foreground">体能状态</span>
          </div>
          <div className="flex flex-col items-center gap-1 bg-secondary/[0.08] rounded-lg py-3">
            <span className="text-lg font-bold text-secondary">7h</span>
            <span className="text-[10px] text-muted-foreground">睡眠时长</span>
          </div>
          <div className="flex flex-col items-center gap-1 bg-orange/[0.08] rounded-lg py-3">
            <span className="text-lg font-bold text-orange">62kg</span>
            <span className="text-[10px] text-muted-foreground">当前体重</span>
          </div>
        </div>
      </section>

      {/* AI 分析 */}
      <section className="mx-5 mt-4 hero-gradient rounded-xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <Brain size={18} className="text-primary-foreground" />
          <span className="text-sm font-bold text-primary-foreground">AI 智能分析</span>
        </div>
        <div className="space-y-1.5 text-sm text-primary-foreground/85">
          <p>✓ 体能恢复良好，适合中高强度训练</p>
          <p>✓ 近3天蛋白质摄入偏低，建议加强</p>
          <p>✓ 本周已训练2次，建议今日完成第3次</p>
        </div>
      </section>

      {/* AI 今日训练建议 */}
      <section className="mx-5 mt-4 bg-card rounded-xl border border-primary/10 overflow-hidden">
        <div className="relative h-[160px] overflow-hidden">
          <img src={coverHiit} alt="今日推荐训练" className="w-full h-full object-cover" />
          <span className="absolute top-3 left-3 text-[10px] text-white font-medium rounded-md px-2 py-1 bg-accent">
            AI 推荐
          </span>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-foreground">20分钟HIIT燃脂</h3>
              <p className="text-xs text-muted-foreground mt-1">强度K3 · 20分钟 · 适合你当前状态</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] text-keep-green bg-keep-green/10 rounded-full px-2 py-0.5">减脂推荐</span>
            <span className="text-[10px] text-orange bg-orange/10 rounded-full px-2 py-0.5">高效燃脂</span>
          </div>
          <button
            onClick={() => navigate("/training-detail")}
            className="w-full mt-4 h-11 bg-keep-green text-keep-green-foreground font-semibold text-sm rounded-lg transition-transform duration-200 hover:-translate-y-0.5"
          >
            开始训练
          </button>
        </div>
      </section>

      {/* 快捷功能入口 */}
      <section className="mx-5 mt-4 mb-4 grid grid-cols-2 gap-3">
        <button
          onClick={() => navigate("/ai-nutrition")}
          className="bg-card rounded-xl border border-primary/10 p-4 flex items-center gap-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md text-left"
        >
          <span className="text-2xl">🥢</span>
          <div>
            <p className="text-sm font-bold text-foreground">AI 营养师</p>
            <p className="text-[10px] text-muted-foreground">今日已摄入 1450卡</p>
          </div>
        </button>
        <button
          onClick={() => navigate("/ai-insights")}
          className="bg-card rounded-xl border border-primary/10 p-4 flex items-center gap-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md text-left"
        >
          <span className="text-2xl">📊</span>
          <div>
            <p className="text-sm font-bold text-foreground">数据分析</p>
            <p className="text-[10px] text-muted-foreground">本周训练3次</p>
          </div>
        </button>
      </section>

      {/* 会员提示 */}
      <section className="mx-5 mb-6">
        <div className="bg-card rounded-xl border border-primary/10 px-5 py-3 flex items-center gap-4">
          <span className="text-2xl leading-none select-none">👑</span>
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
