import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Scale, Percent, Moon, Battery, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { saveDailyStatus, loadDailyStatus } from "@/stores/dailyStatus";

const sleepOptions = ["4h", "5h", "6h", "7h", "8h", "9h+"];
const fatigueOptions = ["很疲劳", "一般", "精力充沛"];
const exerciseOptions = [
  { value: "10分钟", label: "10分钟", desc: "轻量训练" },
  { value: "20分钟", label: "20分钟", desc: "标准训练" },
  { value: "30分钟", label: "30分钟", desc: "完整训练" },
];

const DailyStatus = () => {
  const navigate = useNavigate();
  const existing = loadDailyStatus();
  const isToday = existing?.date === new Date().toISOString().slice(0, 10);

  const [weight, setWeight] = useState(isToday ? existing?.weight ?? "" : "");
  const [bodyFat, setBodyFat] = useState(isToday ? existing?.bodyFat ?? "" : "");
  const [sleep, setSleep] = useState(isToday ? existing?.sleep ?? "7h" : "7h");
  const [fatigue, setFatigue] = useState(isToday ? existing?.fatigue ?? "一般" : "一般");
  const [exerciseTime, setExerciseTime] = useState(isToday ? existing?.exerciseTime ?? "20分钟" : "20分钟");

  const handleSave = () => {
    if (!weight.trim()) {
      toast.error("请输入当前体重");
      return;
    }
    const num = parseFloat(weight);
    if (isNaN(num) || num < 20 || num > 300) {
      toast.error("请输入合理的体重数值（20-300kg）");
      return;
    }

    saveDailyStatus({
      date: new Date().toISOString().slice(0, 10),
      weight: weight.trim(),
      bodyFat: bodyFat.trim() || undefined,
      sleep,
      fatigue,
      exerciseTime,
    });

    toast.success("状态已保存，AI 正在为你生成今日训练建议");
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 顶部导航 */}
      <div className="flex items-center gap-3 px-4 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">今日状态记录</h1>
      </div>

      <div className="flex-1 px-5 pb-8 space-y-5">
        {/* 当前体重 */}
        <section className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <Scale size={18} className="text-keep-green" />
            <h2 className="text-sm font-bold text-foreground">当前体重</h2>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="例如：62"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="flex-1"
              min={20}
              max={300}
              step={0.1}
            />
            <span className="text-sm text-muted-foreground font-medium">kg</span>
          </div>
        </section>

        {/* 体脂率（可选） */}
        <section className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <Percent size={18} className="text-secondary" />
            <h2 className="text-sm font-bold text-foreground">体脂率（可选）</h2>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="例如：18"
              value={bodyFat}
              onChange={(e) => setBodyFat(e.target.value)}
              className="flex-1"
              min={3}
              max={60}
              step={0.1}
            />
            <span className="text-sm text-muted-foreground font-medium">%</span>
          </div>
        </section>

        {/* 昨晚睡眠时长 */}
        <section className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <Moon size={18} className="text-secondary" />
            <h2 className="text-sm font-bold text-foreground">昨晚睡眠时长</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {sleepOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setSleep(opt)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  sleep === opt
                    ? "bg-keep-green text-keep-green-foreground"
                    : "bg-muted/10 text-foreground border border-border"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </section>

        {/* 今日疲劳程度 */}
        <section className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <Battery size={18} className="text-orange" />
            <h2 className="text-sm font-bold text-foreground">今日疲劳程度</h2>
          </div>
          <RadioGroup value={fatigue} onValueChange={setFatigue} className="space-y-2">
            {fatigueOptions.map((opt) => (
              <div key={opt} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                <RadioGroupItem value={opt} id={`fatigue-${opt}`} />
                <Label htmlFor={`fatigue-${opt}`} className="text-sm text-foreground cursor-pointer">
                  {opt}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </section>

        {/* 今日运动时间意愿 */}
        <section className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock size={18} className="text-accent" />
            <h2 className="text-sm font-bold text-foreground">今日运动时间意愿</h2>
          </div>
          <RadioGroup value={exerciseTime} onValueChange={setExerciseTime} className="space-y-2">
            {exerciseOptions.map((opt) => (
              <div key={opt.value} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                <RadioGroupItem value={opt.value} id={`exercise-${opt.value}`} />
                <Label htmlFor={`exercise-${opt.value}`} className="text-sm text-foreground cursor-pointer">
                  {opt.label}
                  <span className="text-muted-foreground ml-1">（{opt.desc}）</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </section>

        {/* 保存按钮 */}
        <Button
          onClick={handleSave}
          className="w-full h-12 bg-keep-green text-keep-green-foreground font-bold text-base rounded-xl hover:bg-keep-green/90"
        >
          保存今日状态
        </Button>
      </div>
    </div>
  );
};

export default DailyStatus;
