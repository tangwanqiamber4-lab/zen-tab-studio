import { Search, Bell } from "lucide-react";

const TopBar = () => {
  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between px-4 bg-card"
      style={{ height: 64, boxShadow: "var(--shadow-topbar)" }}
    >
      {/* Left: Avatar */}
      <div className="flex items-center">
        <div className="w-9 h-9 rounded-full bg-muted/40 overflow-hidden flex-shrink-0">
          <img
            src="https://api.dicebear.com/9.x/avataaars/svg?seed=keep-user"
            alt="用户头像"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Center: Logo */}
      <span className="text-lg font-bold tracking-wide text-primary select-none">
        Keep
      </span>

      {/* Right: Icons */}
      <div className="flex items-center gap-6">
        <button className="text-foreground" aria-label="搜索">
          <Search size={20} strokeWidth={1.8} />
        </button>
        <button className="relative text-foreground" aria-label="消息">
          <Bell size={20} strokeWidth={1.8} />
          {/* Red dot */}
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-destructive" />
        </button>
      </div>
    </header>
  );
};

export default TopBar;
