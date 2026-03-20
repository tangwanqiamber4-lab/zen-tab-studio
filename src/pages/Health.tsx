import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Camera, AlertTriangle, CheckCircle2, History, Search, ChevronDown, ChevronUp } from "lucide-react";

import TopBar from "@/components/home/TopBar";
import { useFoodRecords, mealLabels } from "@/stores/foodRecords";
import coverChicken from "@/assets/cover-chicken-broccoli.jpg";
import coverPorridge from "@/assets/cover-porridge.jpg";
import coverFish from "@/assets/cover-steamed-fish.jpg";

const recipes = [
  { name: "低脂鸡胸炒西兰花", cal: 350, tag: "减脂推荐", cover: coverChicken },
  { name: "紫薯燕麦粥", cal: 280, tag: "适合早餐", cover: coverPorridge },
  { name: "清蒸鲈鱼", cal: 220, tag: "适合晚餐", cover: coverFish },
];

const targets = { calories: 1800, protein: 80, carbs: 200, fat: 50 };

const Health = () => {
  const navigate = useNavigate();
  const records = useFoodRecords((s) => s.records);

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const todayRecords = useMemo(() => records.filter((r) => r.date === today), [records, today]);

  const totals = useMemo(() => {
    return todayRecords.reduce(
      (acc, r) => {
        acc.calories += r.calories;
        acc.protein += r.protein;
        acc.carbs += r.carbs;
        acc.fat += r.fat;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [todayRecords]);

  const nutrients = [
    { name: "蛋白质", cur: totals.protein, max: targets.protein, color: "bg-secondary" },
    { name: "碳水", cur: totals.carbs, max: targets.carbs, color: "bg-orange" },
    { name: "脂肪", cur: totals.fat, max: targets.fat, color: "bg-pink" },
  ];

  // AI analysis based on actual intake
  const analyses = (() => {
    const items: { type: "warn" | "ok"; text: string }[] = [];
    const proteinGap = targets.protein - totals.protein;
    if (proteinGap > 10) {
      items.push({ type: "warn", text: `蛋白质还差${proteinGap}g，建议补充一份鸡胸肉或鱼肉。` });
    } else {
      items.push({ type: "ok", text: "蛋白质摄入达标，保持当前饮食即可。" });
    }
    if (totals.carbs > targets.carbs * 0.9) {
      items.push({ type: "warn", text: "碳水摄入略高，建议减少主食分量。" });
    } else {
      items.push({ type: "ok", text: "碳水摄入正常，与今日训练强度匹配。" });
    }
    if (totals.fat > targets.fat * 0.9) {
      items.push({ type: "warn", text: "脂肪摄入接近上限，晚餐建议选择清蒸菜品。" });
    } else {
      items.push({ type: "ok", text: "脂肪摄入正常，继续保持。" });
    }
    return items;
  })();

  return (
    <div className="flex flex-col">
      <TopBar />

      {/* ① 记录今日饮食 */}
      <section className="mx-5 mt-4">
        <button
          onClick={() => navigate("/food-camera")}
          className="w-full bg-card rounded-2xl border-2 border-keep-green/20 p-5 flex items-center gap-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md shadow-sm text-left"
        >
          <div className="w-14 h-14 rounded-xl bg-keep-green/10 flex items-center justify-center flex-shrink-0">
            <Camera size={28} className="text-keep-green" />
          </div>
          <div className="flex-1">
            <p className="text-base font-bold text-foreground">记录今日饮食</p>
            <p className="text-xs text-muted-foreground mt-0.5">拍照识别中式菜品，自动更新今日摄入</p>
          </div>
        </button>
      </section>

      {/* 快捷入口 */}
      <section className="mx-5 mt-3 grid grid-cols-2 gap-3">
        <button
          onClick={() => navigate("/food-camera")}
          className="bg-card rounded-xl border border-primary/10 p-3 flex items-center gap-2 text-left"
        >
          <Camera size={16} className="text-keep-green flex-shrink-0" />
          <span className="text-sm font-medium text-foreground">拍照识别</span>
        </button>
        <button
          onClick={() => navigate("/food-search")}
          className="bg-card rounded-xl border border-primary/10 p-3 flex items-center gap-2 text-left"
        >
          <Search size={16} className="text-muted-foreground flex-shrink-0" />
          <span className="text-sm font-medium text-foreground">搜索食物</span>
        </button>
      </section>

      {/* ② 今日摄入 */}
      <section className="mx-5 mt-4 bg-card rounded-xl border border-primary/10 p-5">
        <h2 className="text-base font-bold text-foreground mb-3">今日摄入</h2>
        <p>
          <span className="text-2xl font-bold text-foreground">{totals.calories}</span>
          <span className="text-lg text-muted-foreground font-light"> / {targets.calories} 卡</span>
        </p>
        <div className="mt-3 space-y-2">
          {nutrients.map((n) => (
            <div key={n.name} className="flex items-center gap-3">
              <span className="text-[10px] text-muted-foreground w-10">{n.name}</span>
              <div className="flex-1 h-1.5 rounded-full bg-muted/30 overflow-hidden">
                <div
                  className={`h-full rounded-full ${n.color} transition-all`}
                  style={{ width: `${Math.min((n.cur / n.max) * 100, 100)}%` }}
                />
              </div>
              <span className="text-[10px] text-muted-foreground w-14 text-right">{n.cur}/{n.max}g</span>
            </div>
          ))}
        </div>

        {/* 今日已记录食物列表 - 按餐次分组 */}
        <div className="flex items-center justify-between mt-4 mb-2">
          <span className="text-xs font-medium text-foreground">今日已记录</span>
          <button onClick={() => navigate("/food-history")} className="text-[10px] text-keep-green font-medium">查看全部 ›</button>
        </div>
        {mealOrder.filter(m => mealGroups[m]).length > 0 ? (
          <div>
            {mealOrder.filter(m => mealGroups[m]).map((meal) => {
              const items = mealGroups[meal]!;
              const totalCal = items.reduce((s, r) => s + r.calories, 0);
              const isOpen = expandedMeal === meal;
              return (
                <div key={meal}>
                  <div
                    onClick={() => setExpandedMeal(isOpen ? null : meal)}
                    className="flex items-center justify-between py-2.5 border-b border-primary/10 last:border-0 cursor-pointer"
                  >
                    <div className="flex items-center">
                      <span className="text-[10px] bg-keep-green/10 text-keep-green px-1.5 py-0.5 rounded font-medium">{mealLabels[meal as keyof typeof mealLabels]}</span>
                      <span className="text-xs text-muted-foreground ml-2">{items.length}样食物</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-orange font-medium">{totalCal}卡</span>
                      {isOpen ? <ChevronUp size={12} className="text-muted-foreground ml-2" /> : <ChevronDown size={12} className="text-muted-foreground ml-2" />}
                    </div>
                  </div>
                  {isOpen && items.map((r) => (
                    <div key={r.id} className="flex items-center justify-between py-1.5 pl-4 border-b border-primary/5 last:border-0 bg-muted/20">
                      <span className="text-xs text-foreground">{r.name}</span>
                      <span className="text-[10px] text-muted-foreground">{r.calories}卡</span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-[10px] text-muted-foreground text-center py-3">今天还没有记录，快去拍照或搜索食物吧</p>
        )}
      </section>

      {/* ③ AI 营养分析 */}
      <section className="mx-5 mt-4 bg-card rounded-xl border border-border p-4">
        <div className="flex items-center gap-2 mb-3">
          <Brain size={18} className="text-keep-green" />
          <h2 className="text-sm font-bold text-foreground">AI 营养分析</h2>
        </div>
        <div className="space-y-2.5">
          {analyses.map((a, i) =>
            a.type === "warn" ? (
              <div key={i} className="flex items-start gap-2 p-3 bg-orange/[0.06] rounded-lg">
                <AlertTriangle size={15} className="text-orange mt-0.5 flex-shrink-0" />
                <p className="text-xs text-foreground">{a.text}</p>
              </div>
            ) : (
              <div key={i} className="flex items-start gap-2 p-3 bg-keep-green/[0.06] rounded-lg">
                <CheckCircle2 size={15} className="text-keep-green mt-0.5 flex-shrink-0" />
                <p className="text-xs text-foreground">{a.text}</p>
              </div>
            )
          )}
        </div>
      </section>

      {/* ④ 中式健康食谱推荐 */}
      <section className="mx-5 mt-5">
        <h2 className="text-base font-bold text-foreground mb-3">中式健康食谱推荐</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
          {recipes.map((r) => (
            <div
              key={r.name}
              className="flex-shrink-0 w-[200px] bg-card rounded-xl border border-primary/10 overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="h-28 overflow-hidden">
                <img src={r.cover} alt={r.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <p className="text-sm font-bold text-foreground">{r.name}</p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[10px] text-muted-foreground">{r.cal}卡</span>
                  <span className="text-[10px] text-keep-green">{r.tag}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ⑤ 饮食历史 */}
      <section className="mx-5 mt-4 mb-6">
        <button
          onClick={() => navigate("/food-history")}
          className="w-full bg-card rounded-xl border border-border p-4 flex items-center gap-3 text-left transition-all hover:-translate-y-0.5 hover:shadow-sm"
        >
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <History size={20} className="text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-foreground">饮食历史</p>
            <p className="text-[10px] text-muted-foreground">查看每日饮食记录和营养统计</p>
          </div>
        </button>
      </section>
    </div>
  );
};

export default Health;
