import { useNavigate } from "react-router-dom";
import { Brain, Zap, Utensils, BookOpen } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import coverAbs from "@/assets/cover-abs.jpg";
import coverHiit from "@/assets/cover-hiit.jpg";
import coverFullbody from "@/assets/cover-fullbody.jpg";

const benefits = [
  { icon: Brain, bg: "bg-keep-green/10", color: "text-keep-green", title: "AI 专属训练计划", desc: "根据你的身体状态每周自动生成计划，动态调整训练强度" },
  { icon: Zap, bg: "bg-secondary/10", color: "text-secondary", title: "AI 实时动作纠正", desc: "摄像头实时检测动作标准度，有效防止运动损伤" },
  { icon: Utensils, bg: "bg-orange/10", color: "text-orange", title: "AI 营养饮食分析", desc: "拍照识别食物，智能分析每日营养摄入与健身目标匹配度" },
  { icon: BookOpen, bg: "bg-keep-green/10", color: "text-keep-green", title: "全部课程无限解锁", desc: "畅享全部健身课程，内容持续更新，永久有效" },
];

const previewCourses = [
  { title: "腹肌撕裂", duration: "15分钟", cover: coverAbs },
  { title: "搏击燃脂", duration: "20分钟", cover: coverHiit },
  { title: "哑铃塑形", duration: "25分钟", cover: coverFullbody },
  { title: "核心稳定", duration: "20分钟", cover: coverAbs },
];

const MembershipPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PageHeader title="会员权益" />

      {/* Hero Banner */}
      <div className="mx-5 mt-4 hero-gradient rounded-2xl px-5 py-6 text-center">
        <p className="text-3xl">👑</p>
        <p className="text-lg font-bold text-primary-foreground mt-2">解锁全部 AI 健身功能</p>
        <p className="text-xs text-primary-foreground/65 mt-1">专属课程 · 智能计划 · 实时纠姿</p>
        <p className="text-sm text-primary-foreground/80 mt-3 font-medium">免费试用 7 天，之后 ¥49/月</p>
        <button className="mt-4 w-full h-11 bg-primary-foreground text-primary font-bold text-sm rounded-xl">
          开始免费试用
        </button>
      </div>

      {/* Benefits */}
      <section className="mx-5 mt-5">
        <h2 className="text-sm font-bold text-foreground mb-3">会员专属权益</h2>
        {benefits.map((b) => {
          const Icon = b.icon;
          return (
            <div key={b.title} className="bg-card rounded-xl border border-primary/10 p-4 flex items-start gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${b.bg}`}>
                <Icon size={20} className={b.color} />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{b.title}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">{b.desc}</p>
              </div>
            </div>
          );
        })}
      </section>

      {/* Course preview */}
      <section className="mx-5 mt-5">
        <h2 className="text-sm font-bold text-foreground">会员课程预览</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide mt-3">
          {previewCourses.map((c) => (
            <div key={c.title} className="flex-shrink-0 w-[140px] bg-card rounded-xl border border-primary/10 overflow-hidden">
              <img src={c.cover} alt={c.title} className="h-20 w-full object-cover" />
              <div className="p-2">
                <p className="text-xs font-bold text-foreground">{c.title}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{c.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-5 mt-5">
        <h2 className="text-sm font-bold text-foreground mb-3">选择方案</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card rounded-xl border border-primary/10 p-4 text-center">
            <p className="text-xs text-muted-foreground">月度会员</p>
            <p className="text-2xl font-bold text-foreground mt-1">¥49</p>
            <p className="text-xs text-muted-foreground">/月</p>
          </div>
          <div className="bg-card rounded-xl border-2 border-keep-green p-4 text-center relative">
            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-keep-green text-keep-green-foreground text-[10px] font-bold px-3 py-0.5 rounded-full">
              推荐
            </span>
            <p className="text-xs text-muted-foreground">年度会员</p>
            <p className="text-2xl font-bold text-keep-green mt-1">¥199</p>
            <p className="text-xs text-muted-foreground">/年</p>
            <span className="text-[10px] text-keep-green bg-keep-green/10 px-2 py-0.5 rounded-full mt-1 inline-block">
              省 ¥389
            </span>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="mx-5 mt-5 mb-6">
        <button className="w-full h-12 bg-keep-green text-keep-green-foreground font-bold text-base rounded-xl">
          开始免费试用 7 天
        </button>
        <p className="text-[10px] text-muted-foreground text-center mt-2">随时可取消，无隐藏费用</p>
      </div>
    </div>
  );
};

export default MembershipPage;
