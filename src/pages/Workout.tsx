import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";

const feedbacks = [
  { text: "✓ 很好！背部保持挺直", type: "success" as const },
  { text: "⚠️ 膝盖快超过脚尖了，往后坐", type: "warn" as const },
  { text: "✓ 下蹲深度完美，继续保持", type: "success" as const },
  { text: "⚠️ 注意呼吸节奏，下蹲吸气", type: "warn" as const },
  { text: "✓ 核心收紧，动作很标准", type: "success" as const },
];

const Workout = () => {
  const navigate = useNavigate();
  const [feedbackIndex, setFeedbackIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFeedbackIndex((prev) => (prev + 1) % feedbacks.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const currentFeedback = feedbacks[feedbackIndex];

  const handleFinish = () => {
    toast.success("训练已完成！");
    setTimeout(() => navigate("/"), 800);
  };

  return (
    <div className="fixed inset-0 flex flex-col" style={{ background: "#1a1a1a" }}>
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 flex-shrink-0 z-20" style={{ height: 56, background: "rgba(0,0,0,0.5)" }}>
        <button onClick={() => navigate(-1)} className="text-white p-1" aria-label="返回">
          <ChevronLeft size={24} strokeWidth={1.8} />
        </button>
        <span className="text-white text-base font-medium">深蹲训练 · AI指导中</span>
        <span className="text-white text-sm font-bold tracking-wide">Keep</span>
      </header>

      {/* Progress bar */}
      <div className="flex items-center justify-between px-5 py-3 flex-shrink-0" style={{ background: "rgba(0,0,0,0.3)" }}>
        <span className="text-white/80 text-sm">第1组 / 共3组</span>
        <span className="text-white text-2xl font-bold tabular-nums">00:45</span>
      </div>
      <div className="px-5 pb-3 flex-shrink-0" style={{ background: "rgba(0,0,0,0.3)" }}>
        <div className="h-1 w-full rounded-full bg-white/20 overflow-hidden">
          <div className="h-full w-1/3 rounded-full bg-keep-green transition-all duration-500" />
        </div>
      </div>

      {/* Free usage label */}
      <div className="absolute top-[120px] left-4 z-30">
        <span className="text-[10px] text-white font-medium rounded px-2 py-1 bg-orange">
          剩余1次免费纠正
        </span>
      </div>

      {/* Camera area */}
      <div className="flex-1 relative flex items-center justify-center mx-5 my-3">
        <div className="w-full h-full rounded-xl border-2 border-dashed border-white/30 flex flex-col items-center justify-center gap-3 relative">
          <span className="text-5xl select-none">📹</span>
          <p className="text-white text-base">摄像头实时画面</p>
          <p className="text-white/60 text-xs">请将手机放置在合适位置</p>

          {/* Stick figure overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 400">
            {/* Head */}
            <circle cx="150" cy="80" r="16" fill="none" stroke="#00FF88" strokeWidth="2.5" />
            {/* Neck */}
            <line x1="150" y1="96" x2="150" y2="120" stroke="#00FF88" strokeWidth="2.5" />
            {/* Shoulders */}
            <line x1="110" y1="120" x2="190" y2="120" stroke="#00FF88" strokeWidth="2.5" />
            {/* Left arm */}
            <line x1="110" y1="120" x2="90" y2="180" stroke="#00FF88" strokeWidth="2.5" />
            <line x1="90" y1="180" x2="85" y2="230" stroke="#00FF88" strokeWidth="2.5" />
            {/* Right arm */}
            <line x1="190" y1="120" x2="210" y2="180" stroke="#00FF88" strokeWidth="2.5" />
            <line x1="210" y1="180" x2="215" y2="230" stroke="#00FF88" strokeWidth="2.5" />
            {/* Torso */}
            <line x1="150" y1="120" x2="150" y2="220" stroke="#00FF88" strokeWidth="2.5" />
            {/* Hips */}
            <line x1="120" y1="220" x2="180" y2="220" stroke="#00FF88" strokeWidth="2.5" />
            {/* Left leg */}
            <line x1="120" y1="220" x2="105" y2="300" stroke="#00FF88" strokeWidth="2.5" />
            <line x1="105" y1="300" x2="100" y2="360" stroke="#00FF88" strokeWidth="2.5" />
            {/* Right leg */}
            <line x1="180" y1="220" x2="195" y2="300" stroke="#00FF88" strokeWidth="2.5" />
            <line x1="195" y1="300" x2="200" y2="360" stroke="#00FF88" strokeWidth="2.5" />
            {/* Joint dots */}
            {[
              [110, 120], [190, 120], [90, 180], [210, 180], [85, 230], [215, 230],
              [150, 120], [150, 220], [120, 220], [180, 220],
              [105, 300], [195, 300], [100, 360], [200, 360],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="4" fill="#00FF88" />
            ))}
          </svg>
        </div>

        {/* Score badge */}
        <div
          className="absolute top-4 right-4 rounded-full flex flex-col items-center justify-center border-[3px] border-keep-green"
          style={{ width: 80, height: 80, background: "rgba(255,255,255,0.9)" }}
        >
          <span className="text-[28px] font-bold text-keep-green leading-none">92</span>
          <span className="text-xs text-muted-foreground leading-none mt-0.5">分</span>
          <span className="text-[10px] text-muted-foreground leading-none mt-0.5">动作标准度</span>
        </div>

        {/* Correction count */}
        <div className="absolute bottom-4 right-4 rounded-lg px-3 py-2" style={{ background: "rgba(255,255,255,0.15)" }}>
          <span className="text-xs text-white/80">本次纠正：5次</span>
        </div>
      </div>

      {/* Real-time feedback card */}
      <div className="mx-4 mb-3 bg-card rounded-xl p-5 flex-shrink-0" style={{ boxShadow: "0 -4px 12px rgba(0,0,0,0.2)" }}>
        <p className="text-xs text-muted-foreground mb-2">🤖 AI实时指导</p>
        <p
          className={`text-xl font-bold transition-all duration-300 ${
            currentFeedback.type === "success" ? "text-keep-green" : "text-orange"
          }`}
        >
          {currentFeedback.text}
        </p>
      </div>

      {/* Finish button */}
      <div className="px-[5%] pb-5 flex-shrink-0">
        <button
          onClick={handleFinish}
          className="w-full h-12 bg-keep-green text-keep-green-foreground font-semibold text-base rounded-full transition-opacity duration-200 hover:opacity-90"
        >
          完成训练
        </button>
      </div>
    </div>
  );
};

export default Workout;
