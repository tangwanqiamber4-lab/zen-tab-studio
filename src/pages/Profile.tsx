import { useNavigate } from "react-router-dom";
import { ChevronRight, Target, Settings, Crown, UserCircle, ClipboardEdit } from "lucide-react";
import { toast } from "sonner";

const menuItems = [
  { icon: UserCircle, label: "个人信息", desc: "身高、体重、年龄", action: "info" },
  { icon: Target, label: "健身目标", desc: "减脂、增肌、塑形", action: "goal" },
  { icon: Settings, label: "AI 偏好设置", desc: "训练强度、饮食习惯", action: "prefs" },
  { icon: Crown, label: "会员订阅", desc: "管理你的会员方案", action: "membership" },
];

const Profile = () => {
  const navigate = useNavigate();

  const handleMenuClick = (action: string) => {
    toast.info("功能开发中，敬请期待");
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

      {/* 今日状态记录入口 */}
      <section className="mx-5 mt-4">
        <button
          onClick={() => navigate("/daily-status")}
          className="w-full bg-card rounded-xl border border-keep-green/20 px-4 py-4 flex items-center gap-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md text-left"
        >
          <ClipboardEdit size={20} className="text-keep-green flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-foreground">今日状态记录</p>
            <p className="text-[10px] text-muted-foreground">记录体重、睡眠和身体状态</p>
          </div>
          <ChevronRight size={16} className="text-muted-foreground flex-shrink-0" />
        </button>
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
