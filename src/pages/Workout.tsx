import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import coverHiit from "@/assets/cover-hiit.jpg";

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
  const isWarn = currentFeedback.type === "warn";

  const handleFinish = () => {
    toast.success("训练已完成！");
    setTimeout(() => navigate("/training-summary"), 800);
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
        <div className="w-full h-full rounded-xl relative overflow-hidden" style={{ background: "#2a2a2a" }}>
          {/* Real camera background image */}
          <img src={coverHiit} alt="训练画面" className="absolute inset-0 w-full h-full object-cover opacity-70" />
          {/* Dark overlay for contrast */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Human figure SVG with skeleton tracking */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid meet">
            {/* Body silhouette (semi-transparent white) */}
            {/* Head */}
            <ellipse cx="180" cy="85" rx="22" ry="26" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
            {/* Torso */}
            <path d="M155 115 Q150 120 148 160 L145 240 Q145 250 155 255 L205 255 Q215 250 215 240 L212 160 Q210 120 205 115 Z" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
            {/* Left arm */}
            <path d="M148 125 Q130 150 115 175 Q105 195 120 220 L145 240" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
            {/* Right arm */}
            <path d="M212 125 Q230 150 245 175 Q255 195 240 220 L215 240" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
            {/* Left leg - bent for squat */}
            <path d="M155 255 Q140 290 125 330 Q115 355 130 380 L140 420" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
            {/* Right leg - bent for squat */}
            <path d="M205 255 Q220 290 235 330 Q245 355 230 380 L220 420" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />

            {/* AI skeleton tracking overlay (green lines) */}
            {/* Head */}
            <circle cx="180" cy="80" r="14" fill="none" stroke="#00FF88" strokeWidth="2.5" />
            {/* Neck */}
            <line x1="180" y1="94" x2="180" y2="120" stroke="#00FF88" strokeWidth="2.5" />
            {/* Shoulders */}
            <line x1="145" y1="125" x2="215" y2="125" stroke="#00FF88" strokeWidth="2.5" />
            {/* Left upper arm */}
            <line x1="145" y1="125" x2="120" y2="170" stroke="#00FF88" strokeWidth="2.5" />
            {/* Left forearm - extended forward */}
            <line x1="120" y1="170" x2="105" y2="210" stroke="#00FF88" strokeWidth="2.5" />
            {/* Right upper arm */}
            <line x1="215" y1="125" x2="240" y2="170" stroke="#00FF88" strokeWidth="2.5" />
            {/* Right forearm - extended forward */}
            <line x1="240" y1="170" x2="255" y2="210" stroke="#00FF88" strokeWidth="2.5" />
            {/* Spine */}
            <line x1="180" y1="120" x2="180" y2="250" stroke="#00FF88" strokeWidth="2.5" />
            {/* Hips */}
            <line x1="155" y1="250" x2="205" y2="250" stroke="#00FF88" strokeWidth="2.5" />
            {/* Left thigh - bent */}
            <line x1="155" y1="250" x2="130" y2="330" stroke="#00FF88" strokeWidth="2.5" />
            {/* Left shin */}
            <line x1="130" y1="330" x2="135" y2="410" stroke="#00FF88" strokeWidth="2.5" />
            {/* Right thigh - bent */}
            <line x1="205" y1="250" x2="230" y2="330" stroke="#00FF88" strokeWidth="2.5" />
            {/* Right shin */}
            <line x1="230" y1="330" x2="225" y2="410" stroke="#00FF88" strokeWidth="2.5" />

            {/* Joint dots */}
            {[
              [180, 80],   // head
              [180, 120],  // neck
              [145, 125], [215, 125],  // shoulders
              [120, 170], [240, 170],  // elbows
              [105, 210], [255, 210],  // wrists
              [180, 250],  // center hip
              [155, 250], [205, 250],  // hips
              [135, 410], [225, 410],  // ankles
            ].map(([cx, cy], i) => (
              <circle key={`joint-${i}`} cx={cx} cy={cy} r="5" fill="#00FF88" />
            ))}

            {/* Knee joints - dynamic color based on feedback */}
            <circle cx={130} cy={330} r="5" fill={isWarn ? "#F97316" : "#00FF88"} />
            <circle cx={230} cy={330} r="5" fill={isWarn ? "#F97316" : "#00FF88"} />

            {/* Knee warning marker - only visible on warn */}
            {isWarn && (
              <g className="animate-pulse">
                <circle cx={130} cy={330} r="18" fill="none" stroke="#F97316" strokeWidth="2" opacity="0.8" />
                <circle cx={130} cy={330} r="12" fill="rgba(249,115,22,0.2)" />
                <text x={130} y={335} textAnchor="middle" fill="#F97316" fontSize="14" fontWeight="bold">!</text>

                <circle cx={230} cy={330} r="18" fill="none" stroke="#F97316" strokeWidth="2" opacity="0.8" />
                <circle cx={230} cy={330} r="12" fill="rgba(249,115,22,0.2)" />
                <text x={230} y={335} textAnchor="middle" fill="#F97316" fontSize="14" fontWeight="bold">!</text>
              </g>
            )}

            {/* Tracking lines glow effect */}
            <line x1="180" y1="94" x2="180" y2="120" stroke="#00FF88" strokeWidth="1" opacity="0.3" filter="url(#glow)" />
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>

          {/* Score badge */}
          <div
            className="absolute top-4 right-4 rounded-full flex flex-col items-center justify-center"
            style={{ width: 76, height: 76, background: "rgba(255,255,255,0.12)", border: "2px solid rgba(0,255,136,0.5)" }}
          >
            <span className="text-2xl font-bold leading-none" style={{ color: "#00FF88" }}>92</span>
            <span className="text-[10px] leading-none mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>动作评分</span>
          </div>

          {/* Correction count */}
          <div className="absolute bottom-4 right-4 rounded-lg px-3 py-2" style={{ background: "rgba(255,255,255,0.1)" }}>
            <span className="text-xs text-white/70">本次纠正：5次</span>
          </div>

          {/* Camera indicator */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] text-white/50 font-medium">REC</span>
          </div>
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
