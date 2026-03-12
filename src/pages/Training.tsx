import { useNavigate } from "react-router-dom";
import { ChevronRight, Clock, Flame, History } from "lucide-react";
import TopBar from "@/components/home/TopBar";
import coverHiit from "@/assets/cover-hiit.jpg";
import coverAbs from "@/assets/cover-abs.jpg";
import coverFullbody from "@/assets/cover-fullbody.jpg";
import coverYoga from "@/assets/cover-yoga.jpg";

const courses = [
  { title: "20分钟HIIT燃脂", duration: "20分钟", cal: 220, level: "K3", cover: coverHiit, tag: "AI 教练推荐" },
  { title: "15分钟腹肌撕裂", duration: "15分钟", cal: 150, level: "K2", cover: coverAbs, tag: "" },
  { title: "30分钟全身燃脂", duration: "30分钟", cal: 320, level: "K4", cover: coverFullbody, tag: "热门" },
  { title: "瑜伽拉伸放松", duration: "25分钟", cal: 100, level: "K1", cover: coverYoga, tag: "" },
];

const history = [
  { title: "HIIT燃脂", date: "昨天", duration: "20分钟", cal: 215 },
  { title: "腹肌训练", date: "3天前", duration: "15分钟", cal: 142 },
  { title: "全身燃脂", date: "5天前", duration: "30分钟", cal: 310 },
];

const Training = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <TopBar />

      {/* 今日训练任务 */}
      <section className="mx-5 mt-4 bg-card rounded-xl border border-primary/10 overflow-hidden">
        <div className="relative h-[140px] overflow-hidden">
          <img src={coverHiit} alt="今日训练" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4">
            <p className="text-white text-base font-bold">今日训练计划</p>
            <p className="text-white/80 text-xs mt-0.5">20分钟HIIT燃脂 · AI 为你定制</p>
          </div>
        </div>
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Clock size={14} /> 20分钟</span>
            <span className="flex items-center gap-1"><Flame size={14} /> 220卡</span>
          </div>
          <button
            onClick={() => navigate("/training-detail")}
            className="h-9 px-5 bg-keep-green text-keep-green-foreground font-semibold text-sm rounded-lg transition-transform duration-200 hover:-translate-y-0.5"
          >
            开始训练
          </button>
        </div>
      </section>

      {/* 快捷入口 */}
      <section className="mx-5 mt-4 grid grid-cols-2 gap-3">
        <button
          onClick={() => navigate("/ai-correction")}
          className="bg-card rounded-xl border border-primary/10 p-4 flex items-center gap-3 text-left transition-all duration-300 hover:-translate-y-0.5"
        >
          <span className="text-2xl">📹</span>
          <div>
            <p className="text-sm font-bold text-foreground">AI 教练纠正</p>
            <p className="text-[10px] text-muted-foreground">实时动作指导</p>
          </div>
        </button>
        <button
          onClick={() => navigate("/ai-recommend")}
          className="bg-card rounded-xl border border-primary/10 p-4 flex items-center gap-3 text-left transition-all duration-300 hover:-translate-y-0.5"
        >
          <span className="text-2xl">⚡</span>
          <div>
            <p className="text-sm font-bold text-foreground">AI 教练推荐</p>
            <p className="text-[10px] text-muted-foreground">智能匹配训练课程</p>
          </div>
        </button>
      </section>

      {/* 课程列表 */}
      <section className="mx-5 mt-5">
        <h2 className="text-base font-bold text-foreground mb-3">全部课程</h2>
        <div className="flex flex-col gap-3">
          {courses.map((c) => (
            <div
              key={c.title}
              onClick={() => navigate("/training-detail")}
              className="bg-card rounded-xl border border-primary/10 flex overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="w-28 h-20 flex-shrink-0 overflow-hidden relative">
                <img src={c.cover} alt={c.title} className="w-full h-full object-cover" />
                {c.tag && (
                  <span className="absolute top-1.5 left-1.5 text-[9px] text-white font-medium rounded px-1.5 py-0.5 bg-accent">
                    {c.tag}
                  </span>
                )}
              </div>
              <div className="flex-1 p-3 flex flex-col justify-center">
                <p className="text-sm font-bold text-foreground">{c.title}</p>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                  <span>{c.level}</span>
                  <span>·</span>
                  <span>{c.duration}</span>
                  <span>·</span>
                  <span>{c.cal}卡</span>
                </div>
              </div>
              <div className="flex items-center pr-3">
                <ChevronRight size={16} className="text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 训练历史 */}
      <section className="mx-5 mt-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-foreground">训练历史</h2>
          <button className="flex items-center gap-0.5 text-xs text-keep-green font-medium">
            <History size={12} />
            查看全部
          </button>
        </div>
        <div className="bg-card rounded-xl border border-primary/10 divide-y divide-border">
          {history.map((h, i) => (
            <div key={i} className="px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{h.title}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{h.date} · {h.duration}</p>
              </div>
              <span className="text-xs text-orange font-medium">{h.cal}卡</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Training;
