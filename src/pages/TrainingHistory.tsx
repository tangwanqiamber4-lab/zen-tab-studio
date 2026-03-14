import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Brain, Circle } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const WEEKDAYS = ["一", "二", "三", "四", "五", "六", "日"];
const DATES = [10, 11, 12, 13, 14, 15, 16];
const TRAINED_DAYS = [0, 2, 4]; // 周一、周三、周五
const TODAY_INDEX = 4; // 周五

const weeklyCalories = [215, 0, 150, 0, 320, 0, 0];
const weekLabels = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const monthlyData = [2, 3, 1, 3];
const monthLabels = ["第1周", "第2周", "第3周", "第4周"];

const records = [
  {
    group: "今天",
    items: [] as { name: string; intensity: string; duration: string; cal: number }[],
  },
  {
    group: "昨天",
    items: [{ name: "20分钟HIIT燃脂", intensity: "K3", duration: "20分钟", cal: 215 }],
  },
  {
    group: "3月11日",
    items: [{ name: "15分钟腹肌撕裂", intensity: "K2", duration: "15分钟", cal: 150 }],
  },
  {
    group: "3月9日",
    items: [{ name: "30分钟全身燃脂", intensity: "K4", duration: "30分钟", cal: 320 }],
  },
  {
    group: "上周",
    items: [
      { name: "瑜伽拉伸放松", intensity: "K1", duration: "25分钟", cal: 100 },
      { name: "20分钟HIIT燃脂", intensity: "K3", duration: "20分钟", cal: 215 },
    ],
  },
];

const BarChart = ({
  data,
  labels,
  maxVal,
  unit,
}: {
  data: number[];
  labels: string[];
  maxVal: number;
  unit: string;
}) => {
  const ticks = [0, Math.round(maxVal / 2), maxVal];
  return (
    <div className="relative h-[120px] flex items-end gap-0 mt-3">
      {/* Grid lines */}
      {ticks.map((t) => (
        <div
          key={t}
          className="absolute left-0 right-0 border-t border-dashed border-muted/30"
          style={{ bottom: `${(t / maxVal) * 100}%` }}
        >
          <span className="absolute -left-1 -top-3 text-[8px] text-muted-foreground">
            {t}
            {unit}
          </span>
        </div>
      ))}
      {/* Bars */}
      <div className="flex items-end justify-around w-full h-full pl-7">
        {data.map((v, i) => (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            <div
              className="w-5 rounded-t-md"
              style={{
                height: v > 0 ? `${Math.max((v / maxVal) * 100, 6)}%` : "0%",
                backgroundColor: "hsl(var(--keep-green))",
              }}
            />
            <span className="text-[8px] text-muted-foreground">{labels[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const TrainingHistory = () => {
  const navigate = useNavigate();
  const [chartMode, setChartMode] = useState<"week" | "month">("week");

  return (
    <div className="flex flex-col pb-6">
      <PageHeader title="训练历史" />

      {/* ① 本周训练日历 */}
      <section className="mx-5 mt-4 bg-card rounded-xl border border-primary/10 p-4">
        <div className="flex justify-around">
          {WEEKDAYS.map((d, i) => {
            const trained = TRAINED_DAYS.includes(i);
            const isToday = i === TODAY_INDEX;
            return (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <span className="text-[10px] text-muted-foreground">{d}</span>
                <div className="relative">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      trained
                        ? "bg-keep-green text-keep-green-foreground"
                        : "border border-muted"
                    }`}
                  >
                    {trained ? "✓" : ""}
                  </div>
                  {isToday && (
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-keep-green" />
                  )}
                </div>
                <span className="text-[10px] text-muted-foreground">{DATES[i]}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ② 本周数据统计 */}
      <section className="mx-5 mt-3 bg-card rounded-xl border border-primary/10 p-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center gap-0.5 bg-keep-green/[0.08] rounded-lg py-2.5">
            <span className="text-base font-bold text-keep-green">3次</span>
            <span className="text-[10px] text-muted-foreground">本周训练</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 bg-secondary/[0.08] rounded-lg py-2.5">
            <span className="text-base font-bold text-secondary">65分钟</span>
            <span className="text-[10px] text-muted-foreground">累计时长</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 bg-orange/[0.08] rounded-lg py-2.5">
            <span className="text-base font-bold text-orange">635卡</span>
            <span className="text-[10px] text-muted-foreground">已消耗</span>
          </div>
        </div>
      </section>

      {/* ③ 周/月切换统计图 */}
      <section className="mx-5 mt-3 bg-card rounded-xl border border-primary/10 p-4">
        <div className="flex gap-2 mb-1">
          <button
            onClick={() => setChartMode("week")}
            className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
              chartMode === "week"
                ? "bg-keep-green text-keep-green-foreground"
                : "text-muted-foreground"
            }`}
          >
            按周
          </button>
          <button
            onClick={() => setChartMode("month")}
            className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
              chartMode === "month"
                ? "bg-keep-green text-keep-green-foreground"
                : "text-muted-foreground"
            }`}
          >
            按月
          </button>
        </div>
        {chartMode === "week" ? (
          <BarChart data={weeklyCalories} labels={weekLabels} maxVal={400} unit="卡" />
        ) : (
          <BarChart data={monthlyData} labels={monthLabels} maxVal={4} unit="次" />
        )}
      </section>

      {/* ④ 训练记录列表 */}
      <div className="mx-5 mt-3">
        {records.map((group, gi) => (
          <div key={gi} className={gi > 0 ? "mt-4" : ""}>
            <p className="text-xs text-muted-foreground font-medium mb-2">{group.group}</p>
            {group.items.length === 0 ? (
              <div className="flex flex-col items-center py-6 bg-card rounded-xl border border-dashed border-muted">
                <Circle size={40} className="text-muted-foreground/30 mb-2" strokeDasharray="4 3" />
                <p className="text-xs text-muted-foreground mb-3">今天还没有训练记录</p>
                <button
                  onClick={() => navigate("/training")}
                  className="text-xs font-medium text-keep-green-foreground bg-keep-green px-4 py-1.5 rounded-lg"
                >
                  去训练
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {group.items.map((item, ii) => (
                  <button
                    key={ii}
                    onClick={() => navigate("/training-detail")}
                    className="bg-card rounded-xl border border-primary/10 p-3 flex items-center transition-all hover:-translate-y-0.5 hover:shadow-sm w-full text-left"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground">{item.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {item.intensity} · {item.duration}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-orange mr-1">{item.cal}卡</span>
                    <ChevronRight size={14} className="text-muted-foreground flex-shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ⑤ AI 训练洞察 */}
      <section className="mx-5 mt-3 mb-6 hero-gradient rounded-xl px-4 py-3">
        <div className="flex items-center gap-2 mb-2">
          <Brain size={16} className="text-primary-foreground flex-shrink-0" />
          <span className="text-sm font-bold text-primary-foreground">AI 训练洞察</span>
        </div>
        <div className="space-y-1 text-sm text-primary-foreground/90">
          <p>本周训练3次，比上周多1次 💪</p>
          <p>HIIT训练占比最高，燃脂效率良好</p>
          <p>建议本周再完成1次力量训练，均衡发展</p>
        </div>
      </section>
    </div>
  );
};

export default TrainingHistory;
