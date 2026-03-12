import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, CalendarDays, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import coverChicken from "@/assets/cover-chicken-broccoli.jpg";
import coverPorridge from "@/assets/cover-porridge.jpg";
import coverFish from "@/assets/cover-steamed-fish.jpg";

/* ── Date helpers ── */
const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"];
const buildRecentDays = () => {
  const days: { label: string; weekday: string; isToday: boolean }[] = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    days.push({
      label: `${d.getMonth() + 1}/${d.getDate()}`,
      weekday: WEEKDAYS[d.getDay()],
      isToday: i === 0,
    });
  }
  return days;
};

/* ── Nutrient bar data ── */
const nutrients = [
  { name: "蛋白质", cur: 65, max: 80, unit: "g", color: "bg-secondary" },
  { name: "碳水", cur: 180, max: 200, unit: "g", color: "bg-orange" },
  { name: "脂肪", cur: 45, max: 50, unit: "g", color: "bg-pink" },
  { name: "膳食纤维", cur: 18, max: 25, unit: "g", color: "bg-keep-green" },
];

/* ── AI suggestions ── */
const suggestions = [
  {
    emoji: "🥩",
    title: "蛋白质还差15g",
    advice: "晚餐建议加一份鸡胸肉炒西兰花（约100g鸡胸）",
    tag: "适合减脂",
    tagBg: "bg-secondary/15",
    tagText: "text-secondary",
  },
  {
    emoji: "🍚",
    title: "碳水连续3天超标",
    advice: "建议减少主食量，午餐米饭从150g减到100g",
    tag: "影响减脂效果",
    tagBg: "bg-orange/15",
    tagText: "text-orange",
  },
  {
    emoji: "💪",
    title: "今天训练强度提升了",
    advice: "蛋白质要跟上，加餐可以吃1个水煮蛋+一杯牛奶",
    tag: "帮助恢复",
    tagBg: "bg-keep-green/15",
    tagText: "text-keep-green",
  },
];

/* ── Recipes ── */
const recipes = [
  {
    name: "低脂鸡胸炒西兰花",
    region: "家常菜",
    cal: 350, protein: 35, carb: 15, fat: 12,
    fit: "💚 适合减脂",
    cover: coverChicken,
  },
  {
    name: "紫薯燕麦粥",
    region: "养生粥",
    cal: 280, protein: 8, carb: 52, fat: 3,
    fit: "🌅 适合早餐",
    cover: coverPorridge,
  },
  {
    name: "清蒸鲈鱼",
    region: "粤菜",
    cal: 220, protein: 28, carb: 2, fat: 10,
    fit: "🥢 适合晚餐",
    cover: coverFish,
  },
];

/* ── Feature buttons ── */
const features = [
  {
    emoji: "📷",
    title: "拍照识别中式菜品",
    sub: "支持3000+家常菜、外卖菜品",
    examples: "豆腐、米饭、炒菜、包子...",
  },
  {
    emoji: "🛵",
    title: "外卖热量速查",
    sub: "美团/饿了么常见菜品热量库",
    examples: "黄焖鸡、麻辣烫、兰州拉面...",
  },
];

/* ══════════════════════════════════ Component ══════════════════════════════════ */

const AINutrition = () => {
  const navigate = useNavigate();
  const days = buildRecentDays();
  const [selectedDay, setSelectedDay] = useState(days.length - 1);

  return (
    <div className="flex flex-col bg-background min-h-screen pb-20">
      {/* ── Top bar ── */}
      <header
        className="sticky top-0 z-40 flex items-center justify-between px-4 bg-card"
        style={{ height: 56, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
      >
        <button onClick={() => navigate(-1)} className="text-foreground p-1 -ml-1">
          <ChevronLeft size={24} strokeWidth={1.8} />
        </button>
        <span className="text-lg font-semibold text-foreground">AI营养师</span>
        <button className="text-foreground p-1 -mr-1">
          <CalendarDays size={20} strokeWidth={1.8} />
        </button>
      </header>

      {/* ── Hero ── */}
      <div className="mx-5 mt-5 hero-gradient rounded-xl p-6">
        <span className="text-5xl leading-none select-none">🥢</span>
        <h1 className="mt-3 text-xl font-bold text-primary-foreground">懂中国人的AI营养师</h1>
        <div className="mt-3 space-y-1.5 text-sm text-primary-foreground/90">
          <p>✓ 识别3000+中式菜品</p>
          <p>✓ 适配川粤湘鲁等8大菜系</p>
          <p>✓ 支持方言食材名称</p>
          <p>✓ 根据节气推荐应季食物</p>
        </div>
      </div>

      {/* ── Date selector ── */}
      <div className="flex gap-2 overflow-x-auto px-5 mt-5 pb-1 scrollbar-hide">
        {days.map((d, i) => (
          <button
            key={i}
            onClick={() => setSelectedDay(i)}
            className={`flex flex-col items-center flex-shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-colors ${
              i === selectedDay
                ? "bg-keep-green text-keep-green-foreground"
                : "bg-card text-foreground border border-border"
            }`}
          >
            <span>{d.weekday}</span>
            <span className="mt-0.5">{d.label}</span>
          </button>
        ))}
      </div>

      {/* ── Intake summary ── */}
      <div className="mx-5 mt-5 bg-card rounded-xl border border-primary/10 p-5">
        <p className="text-base font-semibold text-foreground">今日摄入</p>
        <p className="mt-2">
          <span className="text-[28px] font-bold text-foreground">1450</span>
          <span className="text-[28px] text-muted-foreground font-light"> / 1800 卡</span>
        </p>
        <div className="mt-4 space-y-3">
          {nutrients.map((n) => (
            <div key={n.name}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">
                  {n.name} {n.cur}{n.unit} / {n.max}{n.unit}
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted/40 overflow-hidden">
                <div
                  className={`h-full rounded-full ${n.color} transition-all duration-500`}
                  style={{ width: `${Math.min((n.cur / n.max) * 100, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── AI 营养师发现 ── */}
      <div className="mx-5 mt-5 rounded-xl p-5 bg-keep-green/[0.08]">
        <p className="text-sm font-bold text-keep-green">💡 AI 营养师发现</p>
        <div className="mt-4 space-y-4">
          {suggestions.map((s, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-2xl flex-shrink-0 mt-0.5">{s.emoji}</span>
              <div>
                <p className="text-sm font-bold text-foreground">{s.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.advice}</p>
                <span className={`inline-block mt-1.5 text-[10px] font-medium rounded-full px-2 py-0.5 ${s.tagBg} ${s.tagText}`}>
                  {s.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Recipes ── */}
      <h3 className="text-base font-bold text-foreground mx-5 mt-6 mb-3">为你推荐中式健康食谱</h3>
      <div className="flex gap-3 overflow-x-auto px-5 pb-2 scrollbar-hide">
        {recipes.map((r) => (
          <div
            key={r.name}
            className="flex-shrink-0 w-[280px] bg-card rounded-xl border border-primary/10 overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="h-40 overflow-hidden">
              <img src={r.cover} alt={r.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 space-y-2">
              <h4 className="text-base font-bold text-foreground">{r.name}</h4>
              <span className="inline-block text-[10px] bg-muted/50 text-muted-foreground rounded px-2 py-0.5">
                {r.region}
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                热量：{r.cal}卡 | 蛋白质：{r.protein}g
                <br />
                碳水：{r.carb}g | 脂肪：{r.fat}g
              </p>
              <p className="text-xs text-keep-green">{r.fit}</p>
              <button className="text-sm font-medium text-keep-green mt-1">查看做法</button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Feature buttons ── */}
      {features.map((f) => (
        <div
          key={f.title}
          onClick={() => toast.info("功能开发中，敬请期待")}
          className="mx-5 mt-5 bg-card rounded-xl border border-primary/10 p-5 flex items-center gap-4 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
        >
          <span className="text-5xl flex-shrink-0">{f.emoji}</span>
          <div className="flex-1 min-w-0">
            <p className="text-base font-bold text-foreground">{f.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{f.sub}</p>
            <p className="text-[10px] text-muted-foreground/60 mt-1">{f.examples}</p>
          </div>
          <ChevronRight size={18} className="text-muted-foreground flex-shrink-0" />
        </div>
      ))}

      {/* ── Seasonal tips ── */}
      <div className="mx-5 mt-5 rounded-xl p-5 bg-accent/10">
        <div className="flex items-start gap-3">
          <span className="text-4xl flex-shrink-0">🌸</span>
          <div>
            <span className="inline-block text-[10px] text-white font-medium rounded-full px-2.5 py-0.5 bg-accent mb-2">
              立春养生
            </span>
            <p className="text-sm font-semibold text-foreground">宜食温补阳气食材</p>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              推荐：韭菜、春笋、豆芽、葱姜
              <br />
              功效：助阳气升发，健脾养胃
            </p>
          </div>
        </div>
      </div>

      {/* ── Free usage ── */}
      <div className="mx-5 mt-5 bg-card rounded-xl border border-primary/10 p-4">
        <p className="text-sm font-semibold text-foreground">今日免费AI分析：0 / 1次</p>
        <div className="mt-3 h-2 bg-muted/40 rounded-full overflow-hidden">
          <div className="h-full w-0 bg-keep-green rounded-full" />
        </div>
        <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
          升级会员享：
          <br />
          ✓ 无限次AI营养分析
          <br />
          ✓ 个性化食谱定制
          <br />
          ✓ 外卖热量自动识别
        </p>
        <a href="#" className="inline-block mt-2 text-sm font-medium text-keep-green">
          了解会员 →
        </a>
      </div>
    </div>
  );
};

export default AINutrition;
