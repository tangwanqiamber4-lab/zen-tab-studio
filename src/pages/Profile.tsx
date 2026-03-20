import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Target, Settings, Crown, UserCircle } from "lucide-react";
import { toast } from "sonner";
import { loadFitnessGoal } from "@/stores/fitnessGoal";
import { loadDailyStatus } from "@/stores/dailyStatus";

const menuItems = [
  { icon: UserCircle, label: "个人信息", desc: "身高、体重、年龄", action: "info" },
  { icon: Target, label: "健身目标", desc: "减脂、增肌、塑形", action: "goal" },
  { icon: Settings, label: "AI 偏好设置", desc: "训练强度、饮食习惯", action: "prefs" },
  { icon: Crown, label: "会员订阅", desc: "管理你的会员方案", action: "membership" },
];

const Profile = () => {
  const navigate = useNavigate();

  const goalData = useMemo(() => {
    const goal = loadFitnessGoal();
    const status = loadDailyStatus();
    
    const currentWeight = parseFloat(status?.weight ?? "62");
    const targetWeight = parseFloat(goal?.targetWeight ?? "55");
    const startWeight = parseFloat(goal?.startWeight ?? "63");
    const goalType = goal?.goalType ?? "减脂";
    
    const totalDiff = Math.abs(startWeight - targetWeight);
    const achieved = Math.abs(startWeight - currentWeight);
    const remaining = Math.abs(currentWeight - targetWeight);
    const progress = totalDiff > 0 
      ? Math.min(Math.round((achieved / totalDiff) * 100), 100) 
      : 0;

    return { currentWeight, targetWeight, remaining: remaining.toFixed(1), progress, goalType };
  }, []);

  const handleMenuClick = (action: string) => {
    if (action === "membership") {
      navigate("/membership");
    } else if (action === "goal") {
      navigate("/fitness-goal");
    } else {
      toast.info("功能开发中，敬请期待");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 顶部个人信息 */}
      <div className="hero-gradient px-5 pt-12 pb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 overflow-hidden flex-shrink-0 border-2 border-white/30">
            <img
              src="https://api.dicebear.com/9.x/avataaars/svg?seed=keep-user"
              alt="用户头像"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary-foreground">健身达人</h1>
            <p className="text-sm text-primary-foreground/70 mt-0.5">已坚持运动 28 天</p>
          </div>
        </div>

        {/* 数据概览 */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className="bg-white/10 rounded-lg py-3 text-center">
            <p className="text-lg font-bold text-primary-foreground">12</p>
            <p className="text-[10px] text-primary-foreground/70">本月训练</p>
          </div>
          <div className="bg-white/10 rounded-lg py-3 text-center">
            <p className="text-lg font-bold text-primary-foreground">3280</p>
            <p className="text-[10px] text-primary-foreground/70">消耗(卡)</p>
          </div>
          <div className="bg-white/10 rounded-lg py-3 text-center">
            <p className="text-lg font-bold text-primary-foreground">28</p>
            <p className="text-[10px] text-primary-foreground/70">连续天数</p>
          </div>
        </div>
      </div>

      {/* 会员卡片 */}
      <section className="mx-5 -mt-4 bg-card rounded-xl border border-primary/10 p-4 flex items-center gap-3 shadow-sm">
        <span className="text-2xl">👑</span>
        <div className="flex-1">
          <p className="text-sm font-bold text-foreground">免费用户</p>
          <p className="text-[10px] text-muted-foreground">升级会员解锁全部 AI 功能</p>
        </div>
        <button className="h-8 px-4 bg-keep-green text-keep-green-foreground text-xs font-semibold rounded-lg">
          升级
        </button>
      </section>

      {/* 目标体重进度 */}
      <section className="mx-5 mt-3 bg-card rounded-xl border border-primary/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Target size={14} className="text-keep-green" />
            <span className="text-sm font-bold text-foreground">{goalData.goalType}目标进度</span>
          </div>
          <button className="text-[10px] text-keep-green">编辑</button>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-3">
          <div className="bg-keep-green/[0.08] rounded-lg py-2.5 text-center">
            <p className="text-base font-bold text-keep-green">{goalData.currentWeight}kg</p>
            <p className="text-[10px] text-muted-foreground">当前体重</p>
          </div>
          <div className="bg-orange/[0.08] rounded-lg py-2.5 text-center">
            <p className="text-base font-bold text-orange">{goalData.targetWeight}kg</p>
            <p className="text-[10px] text-muted-foreground">目标体重</p>
          </div>
          <div className="bg-secondary/[0.08] rounded-lg py-2.5 text-center">
            <p className="text-base font-bold text-secondary">{goalData.remaining}kg</p>
            <p className="text-[10px] text-muted-foreground">还差</p>
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground">进度 {goalData.progress}%</span>
            <span className="text-[10px] text-muted-foreground">已坚持 28 天</span>
          </div>
          <div className="mt-1.5 h-2 w-full rounded-full bg-muted/30 overflow-hidden">
            <div className="h-full rounded-full bg-keep-green" style={{ width: `${goalData.progress}%` }} />
          </div>
          <p className="text-[10px] text-muted-foreground mt-1.5 text-center">距目标还差 {goalData.remaining}kg，继续加油！💪</p>
        </div>
      </section>

      {/* 菜单列表 */}
      <section className="mx-5 mt-4 mb-6 bg-card rounded-xl border border-primary/10 divide-y divide-border">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.action}
              onClick={() => handleMenuClick(item.action)}
              className="w-full px-4 py-4 flex items-center gap-3 text-left transition-colors hover:bg-muted/10"
            >
              <Icon size={20} className="text-muted-foreground flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-[10px] text-muted-foreground">{item.desc}</p>
              </div>
              <ChevronRight size={16} className="text-muted-foreground flex-shrink-0" />
            </button>
          );
        })}
      </section>
    </div>
  );
};

export default Profile;
