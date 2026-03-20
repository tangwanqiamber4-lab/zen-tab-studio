import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import TopBar from "@/components/home/TopBar";
import coverHiit from "@/assets/cover-hiit.jpg";
import coverAbs from "@/assets/cover-abs.jpg";
import coverFullbody from "@/assets/cover-fullbody.jpg";
import coverYoga from "@/assets/cover-yoga.jpg";

const goalFilters = ["全部", "减脂", "增肌", "塑形", "恢复"];
const durationFilters = ["10分钟", "20分钟", "30分钟+"];

const freeCourses = [
  { title: "20分钟HIIT燃脂", level: "K3", duration: "20分钟", cal: 215, cover: coverHiit, tag: "热门" },
  { title: "瑜伽拉伸放松", level: "K1", duration: "25分钟", cal: 100, cover: coverYoga, tag: "放松" },
  { title: "10分钟快速唤醒", level: "K1", duration: "10分钟", cal: 80, cover: coverFullbody, tag: "入门" },
];

const memberCourses = [
  { title: "15分钟腹肌撕裂", level: "K2", duration: "15分钟", cal: 150, cover: coverAbs, status: "trial" as const },
  { title: "搏击燃脂20分钟", level: "K4", duration: "20分钟", cal: 260, cover: coverHiit, status: "member" as const },
  { title: "哑铃全身塑形", level: "K3", duration: "25分钟", cal: 200, cover: coverFullbody, status: "member" as const },
  { title: "核心稳定训练", level: "K3", duration: "20分钟", cal: 180, cover: coverAbs, status: "member" as const },
];

const Training = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("全部");

  return (
    <div className="flex flex-col">
      <TopBar />

      {/* Title row */}
      <div className="mx-5 mt-4 flex items-end justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">课程库</h1>
          <p className="text-[10px] text-muted-foreground">持续更新中</p>
        </div>
        <button className="text-keep-green text-xs font-medium">筛选</button>
      </div>

      {/* Filter chips */}
      <div className="mx-5 mt-3 space-y-2">
        <div className="grid grid-cols-5 gap-2">
          {goalFilters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                activeFilter === f
                  ? "bg-keep-green text-keep-green-foreground font-medium"
                  : "bg-card border border-primary/10 text-muted-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {durationFilters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                activeFilter === f
                  ? "bg-keep-green text-keep-green-foreground font-medium"
                  : "bg-card border border-primary/10 text-muted-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Weekly recommend banner */}
      <div className="mx-5 mt-4 rounded-xl overflow-hidden border border-primary/10">
        <div className="relative h-[100px]">
          <img src={coverFullbody} alt="本周推荐" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <span className="absolute top-2.5 left-2.5 bg-accent text-white text-[10px] font-medium px-2.5 py-1 rounded-md">
            本周推荐
          </span>
          <div className="absolute bottom-2.5 left-3">
            <p className="text-base font-bold text-white">30分钟全身燃脂冲击</p>
            <p className="text-xs text-white/75">K4 · 30分钟 · 320卡</p>
          </div>
        </div>
        <div className="bg-card p-3 flex items-center justify-between">
          <div className="flex gap-1.5">
            <span className="text-[10px] bg-muted/40 text-muted-foreground px-2 py-0.5 rounded-full">减脂</span>
            <span className="text-[10px] bg-muted/40 text-muted-foreground px-2 py-0.5 rounded-full">进阶</span>
          </div>
          <button
            onClick={() => navigate("/training-detail")}
            className="bg-keep-green text-keep-green-foreground text-xs font-medium px-3 py-1.5 rounded-lg"
          >
            免费试用
          </button>
        </div>
      </div>

      {/* Free courses */}
      <section className="mx-5 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-foreground">免费课程</h2>
          <button className="text-xs text-keep-green font-medium">更多 ›</button>
        </div>
        {freeCourses.map((c) => (
          <div
            key={c.title}
            onClick={() => navigate("/training-detail")}
            className="bg-card rounded-xl border border-primary/10 flex overflow-hidden mb-3 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
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
              <div className="flex items-center gap-1 mt-1 text-[10px] text-muted-foreground">
                <span>{c.level}</span><span>·</span><span>{c.duration}</span><span>·</span><span>{c.cal}卡</span>
              </div>
            </div>
            <div className="flex flex-col items-end justify-between p-3">
              <span className="text-[10px] text-keep-green font-medium">免费</span>
              <ChevronRight size={14} className="text-muted-foreground" />
            </div>
          </div>
        ))}
      </section>

      {/* Member courses */}
      <section className="mx-5 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-foreground">会员课程</h2>
          <button className="text-xs text-keep-green font-medium">更多 ›</button>
        </div>
        {memberCourses.map((c) => (
          <div
            key={c.title}
            onClick={() => navigate("/training-detail")}
            className="bg-card rounded-xl border border-primary/10 flex overflow-hidden mb-3 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="w-28 h-20 flex-shrink-0 overflow-hidden relative">
              <img src={c.cover} alt={c.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 p-3 flex flex-col justify-center">
              <p className="text-sm font-bold text-foreground">{c.title}</p>
              <div className="flex items-center gap-1 mt-1 text-[10px] text-muted-foreground">
                <span>{c.level}</span><span>·</span><span>{c.duration}</span><span>·</span><span>{c.cal}卡</span>
              </div>
            </div>
            <div className="flex flex-col items-end justify-between p-3">
              {c.status === "trial" ? (
                <span className="text-[10px] bg-keep-green/10 text-keep-green px-2 py-0.5 rounded-full font-medium">可试用</span>
              ) : (
                <span className="text-[10px] bg-orange/10 text-orange px-2 py-0.5 rounded-full font-medium">👑 会员</span>
              )}
              <ChevronRight size={14} className="text-muted-foreground" />
            </div>
          </div>
        ))}
      </section>

      {/* Membership CTA bar */}
      <div className="mx-5 mt-5 mb-6 hero-gradient rounded-xl px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-primary-foreground">👑 解锁更多课程与会员权益</p>
          <p className="text-[10px] text-primary-foreground/65 mt-0.5">AI专属计划 · 无限课程 · 动作纠正</p>
        </div>
        <button
          onClick={() => navigate("/membership")}
          className="bg-primary-foreground/20 text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-lg flex-shrink-0"
        >
          去了解
        </button>
      </div>
    </div>
  );
};

export default Training;
