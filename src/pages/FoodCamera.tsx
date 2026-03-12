import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, RotateCcw, CheckCircle2, UtensilsCrossed } from "lucide-react";
import { toast } from "sonner";
import { useFoodRecords, MealType, mealLabels } from "@/stores/foodRecords";

type RecognitionResult = {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

const mockResults: RecognitionResult[] = [
  { name: "鸡胸肉炒西兰花", calories: 350, protein: 35, carbs: 12, fat: 8 },
  { name: "番茄炒蛋", calories: 220, protein: 14, carbs: 10, fat: 15 },
  { name: "清蒸鲈鱼", calories: 180, protein: 28, carbs: 2, fat: 6 },
  { name: "宫保鸡丁", calories: 310, protein: 25, carbs: 18, fat: 14 },
  { name: "蒜蓉蒸虾", calories: 150, protein: 22, carbs: 3, fat: 5 },
];

const mealOptions: { type: MealType; icon: string }[] = [
  { type: "breakfast", icon: "🌅" },
  { type: "lunch", icon: "☀️" },
  { type: "dinner", icon: "🌙" },
  { type: "snack", icon: "🍎" },
];

const FoodCamera = () => {
  const navigate = useNavigate();
  const addRecord = useFoodRecords((s) => s.addRecord);
  const [phase, setPhase] = useState<"meal" | "camera" | "recognizing" | "result">("meal");
  const [selectedMeal, setSelectedMeal] = useState<MealType | null>(null);
  const [result, setResult] = useState<RecognitionResult | null>(null);

  const handleSelectMeal = (meal: MealType) => {
    setSelectedMeal(meal);
    setPhase("camera");
  };

  const handleCapture = () => {
    setPhase("recognizing");
    setTimeout(() => {
      const r = mockResults[Math.floor(Math.random() * mockResults.length)];
      setResult(r);
      setPhase("result");
    }, 1500);
  };

  const handleConfirm = () => {
    if (!result || !selectedMeal) return;
    const now = new Date();
    addRecord({
      name: result.name,
      calories: result.calories,
      protein: result.protein,
      carbs: result.carbs,
      fat: result.fat,
      meal: selectedMeal,
      date: now.toISOString().slice(0, 10),
      time: `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`,
    });
    toast.success("已记录到今日摄入");
    setTimeout(() => navigate("/health"), 600);
  };

  const handleRetry = () => {
    setResult(null);
    setPhase("camera");
  };

  const handleBackToMeal = () => {
    setSelectedMeal(null);
    setPhase("meal");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 顶部导航 */}
      <div className="flex items-center gap-3 px-4 pt-12 pb-4">
        <button onClick={() => (phase === "camera" ? handleBackToMeal() : navigate(-1))} className="p-1">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">拍照记录饮食</h1>
        {selectedMeal && (
          <span className="ml-auto text-xs text-keep-green font-medium bg-keep-green/10 px-2.5 py-1 rounded-full">
            {mealLabels[selectedMeal]}
          </span>
        )}
      </div>

      <div className="flex-1 flex flex-col px-5 pb-8">
        {/* 选择餐次 */}
        {phase === "meal" && (
          <div className="flex-1 flex flex-col items-center justify-center gap-6">
            <div className="w-16 h-16 rounded-full bg-keep-green/10 flex items-center justify-center">
              <UtensilsCrossed size={32} className="text-keep-green" />
            </div>
            <div className="text-center">
              <p className="text-base font-bold text-foreground">选择餐次</p>
              <p className="text-xs text-muted-foreground mt-1">请先选择这顿饭的类型</p>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full max-w-[280px]">
              {mealOptions.map((m) => (
                <button
                  key={m.type}
                  onClick={() => handleSelectMeal(m.type)}
                  className="bg-card rounded-xl border border-border p-4 flex flex-col items-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-keep-green/30"
                >
                  <span className="text-2xl">{m.icon}</span>
                  <span className="text-sm font-medium text-foreground">{mealLabels[m.type]}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 相机取景区域 */}
        {(phase === "camera" || phase === "recognizing" || phase === "result") && (
          <div className="flex-1 rounded-2xl border-2 border-dashed border-border bg-muted/10 flex flex-col items-center justify-center gap-4 min-h-[320px] relative overflow-hidden">
            {phase === "camera" && (
              <>
                <div className="w-20 h-20 rounded-full bg-keep-green/10 flex items-center justify-center">
                  <Camera size={40} className="text-keep-green" />
                </div>
                <p className="text-sm text-foreground font-medium">将餐食放入取景框内</p>
                <p className="text-xs text-muted-foreground text-center px-8">
                  拍摄你的{mealLabels[selectedMeal!]}，AI 将自动识别菜品并更新今日摄入
                </p>
              </>
            )}

            {phase === "recognizing" && (
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full border-4 border-keep-green border-t-transparent animate-spin" />
                <p className="text-sm font-medium text-foreground">AI 正在识别中…</p>
              </div>
            )}

            {phase === "result" && result && (
              <div className="w-full p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 size={20} className="text-keep-green" />
                  <p className="text-sm font-bold text-foreground">识别结果</p>
                </div>

                <div className="bg-card rounded-xl border border-border p-4 space-y-3">
                  <p className="text-lg font-bold text-foreground">{result.name}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-orange/[0.08] rounded-lg p-3 text-center">
                      <p className="text-lg font-bold text-orange">{result.calories}</p>
                      <p className="text-[10px] text-muted-foreground">卡路里</p>
                    </div>
                    <div className="bg-secondary/[0.08] rounded-lg p-3 text-center">
                      <p className="text-lg font-bold text-secondary">{result.protein}g</p>
                      <p className="text-[10px] text-muted-foreground">蛋白质</p>
                    </div>
                    <div className="bg-keep-green/[0.08] rounded-lg p-3 text-center">
                      <p className="text-lg font-bold text-keep-green">{result.carbs}g</p>
                      <p className="text-[10px] text-muted-foreground">碳水</p>
                    </div>
                    <div className="bg-pink/[0.08] rounded-lg p-3 text-center">
                      <p className="text-lg font-bold text-pink">{result.fat}g</p>
                      <p className="text-[10px] text-muted-foreground">脂肪</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 底部按钮 */}
        <div className="mt-5 space-y-3">
          {phase === "camera" && (
            <button
              onClick={handleCapture}
              className="w-full h-12 bg-keep-green text-keep-green-foreground font-bold text-base rounded-xl transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              拍照识别
            </button>
          )}

          {phase === "result" && (
            <>
              <button
                onClick={handleConfirm}
                className="w-full h-12 bg-keep-green text-keep-green-foreground font-bold text-base rounded-xl transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                确认记录
              </button>
              <button
                onClick={handleRetry}
                className="w-full h-12 bg-card text-foreground font-medium text-sm rounded-xl border border-border flex items-center justify-center gap-2 transition-colors hover:bg-muted/10"
              >
                <RotateCcw size={16} />
                重新拍照
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCamera;
