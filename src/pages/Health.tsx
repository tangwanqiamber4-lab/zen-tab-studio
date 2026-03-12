import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import TopBar from "@/components/home/TopBar";
import coverChicken from "@/assets/cover-chicken-broccoli.jpg";
import coverPorridge from "@/assets/cover-porridge.jpg";
import coverFish from "@/assets/cover-steamed-fish.jpg";

const recipes = [
  { name: "低脂鸡胸炒西兰花", cal: 350, tag: "减脂推荐", cover: coverChicken },
  { name: "紫薯燕麦粥", cal: 280, tag: "适合早餐", cover: coverPorridge },
  { name: "清蒸鲈鱼", cal: 220, tag: "适合晚餐", cover: coverFish },
];

const nutrients = [
  { name: "蛋白质", cur: 65, max: 80, color: "bg-secondary" },
  { name: "碳水", cur: 180, max: 200, color: "bg-orange" },
  { name: "脂肪", cur: 45, max: 50, color: "bg-pink" },
];

const Health = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <TopBar />

      {/* 今日摄入概览 */}
      <section className="mx-5 mt-4 bg-card rounded-xl border border-primary/10 p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-foreground">今日摄入</h2>
          <button
            onClick={() => navigate("/ai-nutrition")}
            className="text-xs text-keep-green font-medium flex items-center gap-0.5"
          >
            详细分析 <ChevronRight size={14} />
          </button>
        </div>
        <p>
          <span className="text-2xl font-bold text-foreground">1450</span>
          <span className="text-lg text-muted-foreground font-light"> / 1800 卡</span>
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
      </section>

      {/* AI 营养建议 */}
      <section className="mx-5 mt-4 rounded-xl p-4 bg-keep-green/[0.08]">
        <p className="text-sm font-bold text-keep-green mb-2">💡 AI 营养建议</p>
        <p className="text-xs text-foreground">蛋白质还差15g，晚餐建议加一份鸡胸肉炒西兰花</p>
        <p className="text-xs text-muted-foreground mt-1">碳水连续3天偏高，建议减少主食摄入量</p>
      </section>

      {/* 功能入口 */}
      <section className="mx-5 mt-4 grid grid-cols-2 gap-3">
        <button
          onClick={() => navigate("/ai-nutrition")}
          className="bg-card rounded-xl border border-primary/10 p-4 flex items-center gap-3 text-left transition-all duration-300 hover:-translate-y-0.5"
        >
          <span className="text-2xl">🥢</span>
          <div>
            <p className="text-sm font-bold text-foreground">AI 营养师</p>
            <p className="text-[10px] text-muted-foreground">智能饮食分析</p>
          </div>
        </button>
        <button
          onClick={() => navigate("/ai-insights")}
          className="bg-card rounded-xl border border-primary/10 p-4 flex items-center gap-3 text-left transition-all duration-300 hover:-translate-y-0.5"
        >
          <span className="text-2xl">📊</span>
          <div>
            <p className="text-sm font-bold text-foreground">AI 数据分析</p>
            <p className="text-[10px] text-muted-foreground">营养趋势报告</p>
          </div>
        </button>
      </section>

      {/* 中式健康食谱推荐 */}
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

      {/* 饮食记录入口 */}
      <section className="mx-5 mt-4 mb-6">
        <button
          onClick={() => navigate("/ai-nutrition")}
          className="w-full bg-card rounded-xl border border-primary/10 p-4 flex items-center gap-4 transition-all duration-300 hover:-translate-y-0.5"
        >
          <span className="text-3xl">📷</span>
          <div className="flex-1 text-left">
            <p className="text-sm font-bold text-foreground">记录今日饮食</p>
            <p className="text-[10px] text-muted-foreground">拍照识别3000+中式菜品</p>
          </div>
          <ChevronRight size={16} className="text-muted-foreground" />
        </button>
      </section>
    </div>
  );
};

export default Health;
