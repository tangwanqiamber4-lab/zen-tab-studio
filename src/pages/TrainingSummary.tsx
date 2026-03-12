import { useNavigate } from "react-router-dom";
import { Brain, TrendingUp, Target, Clock, Flame, CheckCircle2, AlertTriangle } from "lucide-react";

const TrainingSummary = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 顶部完成横幅 */}
      <div className="hero-gradient px-5 pt-14 pb-8 text-center">
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 size={36} className="text-primary-foreground" />
        </div>
        <h1 className="text-xl font-bold text-primary-foreground">训练完成！</h1>
        <p className="text-sm text-primary-foreground/70 mt-1">AI 教练已为你生成本次训练总结</p>
      </div>

      {/* 训练结果 */}
      <section className="mx-5 -mt-4 bg-card rounded-xl border border-border p-4 shadow-sm">
        <h2 className="text-sm font-bold text-foreground mb-3">训练结果</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2.5 bg-keep-green/[0.08] rounded-lg p-3">
            <Clock size={18} className="text-keep-green flex-shrink-0" />
            <div>
              <p className="text-lg font-bold text-foreground">20分钟</p>
              <p className="text-[10px] text-muted-foreground">训练时长</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 bg-orange/[0.08] rounded-lg p-3">
            <Flame size={18} className="text-orange flex-shrink-0" />
            <div>
              <p className="text-lg font-bold text-foreground">186卡</p>
              <p className="text-[10px] text-muted-foreground">消耗热量</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 bg-secondary/[0.08] rounded-lg p-3">
            <Target size={18} className="text-secondary flex-shrink-0" />
            <div>
              <p className="text-lg font-bold text-foreground">12个</p>
              <p className="text-[10px] text-muted-foreground">完成动作</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 bg-accent/[0.08] rounded-lg p-3">
            <TrendingUp size={18} className="text-accent flex-shrink-0" />
            <div>
              <p className="text-lg font-bold text-foreground">95%</p>
              <p className="text-[10px] text-muted-foreground">训练完成度</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI 教练动作分析 */}
      <section className="mx-5 mt-4 bg-card rounded-xl border border-border p-4">
        <div className="flex items-center gap-2 mb-3">
          <Brain size={18} className="text-keep-green" />
          <h2 className="text-sm font-bold text-foreground">AI 教练动作分析</h2>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-start gap-2 p-3 bg-keep-green/[0.06] rounded-lg">
            <CheckCircle2 size={16} className="text-keep-green mt-0.5 flex-shrink-0" />
            <p className="text-sm text-foreground">深蹲动作标准度：<span className="font-bold text-keep-green">92%</span></p>
          </div>
          <div className="flex items-start gap-2 p-3 bg-keep-green/[0.06] rounded-lg">
            <CheckCircle2 size={16} className="text-keep-green mt-0.5 flex-shrink-0" />
            <p className="text-sm text-foreground">波比跳节奏良好，动作连贯流畅</p>
          </div>
          <div className="flex items-start gap-2 p-3 bg-orange/[0.06] rounded-lg">
            <AlertTriangle size={16} className="text-orange mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">需要改进</p>
              <p className="text-xs text-muted-foreground mt-1">深蹲时膝盖略微前移，建议下次训练注意重心后移，保持膝盖不超过脚尖。</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI 训练建议 */}
      <section className="mx-5 mt-4 hero-gradient rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Brain size={18} className="text-primary-foreground" />
          <h2 className="text-sm font-bold text-primary-foreground">AI 教练建议</h2>
        </div>
        <div className="space-y-2 text-sm text-primary-foreground/90">
          <p>今天训练完成度良好，核心动作标准度持续提升。</p>
          <p>建议明天进行低强度恢复训练或瑜伽拉伸，让肌肉充分恢复。</p>
          <p className="pt-1 text-primary-foreground/70 text-xs">💡 为了提高燃脂效果，建议明天增加10分钟有氧训练。</p>
        </div>
      </section>

      {/* 底部按钮 */}
      <div className="mx-5 mt-6 mb-8 space-y-3">
        <button
          onClick={() => navigate("/training")}
          className="w-full h-12 bg-keep-green text-keep-green-foreground font-bold text-base rounded-xl transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
        >
          查看训练历史
        </button>
        <button
          onClick={() => navigate("/")}
          className="w-full h-12 bg-card text-foreground font-medium text-sm rounded-xl border border-border transition-colors hover:bg-muted/10"
        >
          返回首页
        </button>
      </div>
    </div>
  );
};

export default TrainingSummary;
