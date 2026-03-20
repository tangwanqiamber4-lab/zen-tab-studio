import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Target, Brain, Utensils } from "lucide-react";
import { toast } from "sonner";
import PageHeader from "@/components/PageHeader";
import { saveFitnessGoal } from "@/stores/fitnessGoal";
import { loadDailyStatus } from "@/stores/dailyStatus";

const goalOptions = ["减脂", "增肌", "塑形"];
const timeOptions = ["1个月", "3个月", "6个月"];

const FitnessGoal = () => {
  const navigate = useNavigate();
  const [goal, setGoal] = useState("减脂");
  const [targetWeight, setTargetWeight] = useState("55");
  const [timeFrame, setTimeFrame] = useState("3个月");
  const [showPlan, setShowPlan] = useState(false);

  const handleGenerate = () => {
    const status = loadDailyStatus();
    saveFitnessGoal({
      goalType: goal as "减脂" | "增肌" | "塑形",
      targetWeight,
      targetDuration: timeFrame as "1个月" | "3个月" | "6个月",
      startWeight: status?.weight ?? "62",
    });
    setShowPlan(true);
    toast.success("AI 计划生成成功！");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PageHeader title="健身目标" />

      {/* 目标设定 */}
      <section className="mx-5 mt-4 bg-card rounded-xl border border-primary/10 p-4">
        <div className="flex items-center gap-1.5 mb-4">
          <Target size={14} className="text-keep-green" />
          <span className="text-sm font-bold text-foreground">设定你的目标</span>
        </div>

        {/* 健身目标 */}
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-2">我的目标</p>
          <div className="grid grid-cols-3 gap-2">
            {goalOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setGoal(opt)}
                className={`py-2 rounded-lg text-xs transition-colors ${
                  goal === opt
                    ? "bg-keep-green text-keep-green-foreground font-medium"
                    : "bg-card border border-primary/10 text-muted-foreground"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* 目标体重 */}
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-2">目标体重</p>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={targetWeight}
              onChange={(e) => setTargetWeight(e.target.value)}
              placeholder="例如：55"
              className="flex-1 h-10 rounded-lg border border-primary/10 bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-keep-green/30"
            />
            <span className="text-sm text-muted-foreground font-medium">kg</span>
          </div>
        </div>

        {/* 期望时间 */}
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-2">期望时间</p>
          <div className="grid grid-cols-3 gap-2">
            {timeOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setTimeFrame(opt)}
                className={`py-2 rounded-lg text-xs transition-colors ${
                  timeFrame === opt
                    ? "bg-keep-green text-keep-green-foreground font-medium"
                    : "bg-card border border-primary/10 text-muted-foreground"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          className="w-full h-12 bg-keep-green text-keep-green-foreground font-bold text-base rounded-xl mt-4 transition-colors active:scale-[0.98]"
        >
          生成我的计划
        </button>
      </section>

      {showPlan && (
        <>
          {/* AI Banner */}
          <section className="mx-5 mt-4">
            <div className="hero-gradient rounded-xl px-4 py-3 mb-4">
              <div className="flex items-center gap-1.5">
                <Brain size={16} className="text-primary-foreground" />
                <span className="text-sm font-bold text-primary-foreground">AI 已为你生成专属计划</span>
              </div>
              <p className="text-xs text-primary-foreground/75 mt-1">基于你的体重差值和时间目标，以下是你的减脂方案</p>
            </div>

            {/* 计划数据 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-keep-green/[0.08] rounded-xl p-4">
                <p className="text-xl font-bold text-keep-green">4次</p>
                <p className="text-[10px] text-muted-foreground mt-1">每周训练次数</p>
              </div>
              <div className="bg-orange/[0.08] rounded-xl p-4">
                <p className="text-xl font-bold text-orange">20分钟</p>
                <p className="text-[10px] text-muted-foreground mt-1">每次建议时长</p>
              </div>
              <div className="bg-secondary/[0.08] rounded-xl p-4">
                <p className="text-xl font-bold text-secondary">500卡</p>
                <p className="text-[10px] text-muted-foreground mt-1">每日热量缺口</p>
              </div>
              <div className="bg-keep-green/[0.08] rounded-xl p-4">
                <p className="text-xl font-bold text-keep-green">3个月</p>
                <p className="text-[10px] text-muted-foreground mt-1">预计达成时间</p>
              </div>
            </div>
          </section>

          {/* 训练重点建议 */}
          <section className="mx-5 mt-4 bg-card rounded-xl border border-primary/10 p-4">
            <div className="flex items-center gap-1.5 mb-3">
              <Brain size={14} className="text-keep-green" />
              <span className="text-sm font-bold text-foreground">训练重点建议</span>
            </div>
            {[
              { color: "bg-keep-green", text: "有氧训练为主，建议 HIIT 或快走，帮助燃烧脂肪" },
              { color: "bg-orange", text: "每周穿插 1-2 次力量训练，防止肌肉流失" },
              { color: "bg-secondary", text: "配合饮食控制，每日热量缺口控制在 500 卡以内效果最佳" },
            ].map((item, i, arr) => (
              <div
                key={i}
                className={`flex items-start gap-2 py-2 ${i < arr.length - 1 ? "border-b border-primary/10" : ""}`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${item.color} mt-1.5 flex-shrink-0`} />
                <p className="text-xs text-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </section>

          {/* 饮食配合建议 */}
          <section className="mx-5 mt-3 mb-6 bg-card rounded-xl border border-primary/10 p-4">
            <div className="flex items-center gap-1.5 mb-3">
              <Utensils size={14} className="text-orange" />
              <span className="text-sm font-bold text-foreground">饮食配合建议</span>
            </div>
            {[
              { color: "bg-orange", text: "每日蛋白质摄入建议 80-100g，优先选择鸡胸肉、鱼肉、豆腐" },
              { color: "bg-secondary", text: "减少精制碳水摄入，晚餐可用杂粮替代白米饭" },
            ].map((item, i, arr) => (
              <div
                key={i}
                className={`flex items-start gap-2 py-2 ${i < arr.length - 1 ? "border-b border-primary/10" : ""}`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${item.color} mt-1.5 flex-shrink-0`} />
                <p className="text-xs text-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
            <p className="text-[10px] text-muted-foreground mt-3 text-center">以上建议由 AI 根据你的目标自动生成，仅供参考</p>
          </section>
        </>
      )}
    </div>
  );
};

export default FitnessGoal;
