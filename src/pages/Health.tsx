import { useNavigate } from "react-router-dom";
import { Brain, Camera, AlertTriangle, CheckCircle2 } from "lucide-react";
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

      {/* 今日摄入 */}
      <section className="mx-5 mt-4 bg-card rounded-xl border border-primary/10 p-5">
        <h2 className="text-base font-bold text-foreground mb-3">今日摄入</h2>
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

      {/* AI 营养师分析 */}
      <section className="mx-5 mt-4 bg-card rounded-xl border border-border p-4">
        <div className="flex items-center gap-2 mb-3">
          <Brain size={18} className="text-keep-green" />
          <h2 className="text-sm font-bold text-foreground">AI 营养师分析</h2>
        </div>
        <div className="space-y-2.5">
          <div className="flex items-start gap-2 p-3 bg-orange/[0.06] rounded-lg">
            <AlertTriangle size={15} className="text-orange mt-0.5 flex-shrink-0" />
            <p className="text-xs text-foreground">蛋白质还差<span className="font-bold text-orange">15g</span>，建议晚餐增加一份鸡胸肉。</p>
          </div>
          <div className="flex items-start gap-2 p-3 bg-orange/[0.06] rounded-lg">
            <AlertTriangle size={15} className="text-orange mt-0.5 flex-shrink-0" />
            <p className="text-xs text-foreground">碳水摄入略高，建议减少主食分量。</p>
          </div>
          <div className="flex items-start gap-2 p-3 bg-keep-green/[0.06] rounded-lg">
            <CheckCircle2 size={15} className="text-keep-green mt-0.5 flex-shrink-0" />
            <p className="text-xs text-foreground">脂肪摄入正常，与今日训练强度匹配。</p>
          </div>
        </div>
      </section>

      {/* 拍照记录今日饮食 */}
      <section className="mx-5 mt-4">
        <button
          onClick={() => navigate("/food-camera")}
          className="w-full bg-card rounded-2xl border-2 border-keep-green/20 p-5 flex items-center gap-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md shadow-sm text-left"
        >
          <div className="w-14 h-14 rounded-xl bg-keep-green/10 flex items-center justify-center flex-shrink-0">
            <Camera size={28} className="text-keep-green" />
          </div>
          <div className="flex-1">
            <p className="text-base font-bold text-foreground">拍照记录今日饮食</p>
            <p className="text-xs text-muted-foreground mt-0.5">拍照识别中式菜品，自动更新今日摄入</p>
          </div>
        </button>
      </section>

      {/* 中式健康食谱推荐 */}
      <section className="mx-5 mt-5 mb-6">
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
    </div>
  );
};

export default Health;
