export interface DailyStatus {
  date: string;
  weight: string;
  sleep: string;
  fatigue: string;
  exerciseTime: string;
}

const STORAGE_KEY = "daily-status";

export function saveDailyStatus(status: DailyStatus) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(status));
}

export function loadDailyStatus(): DailyStatus | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as DailyStatus;
  } catch {
    return null;
  }
}

export function getAIAnalysis(status: DailyStatus) {
  const sleepHours = parseInt(status.sleep) || 7;
  const fatigue = status.fatigue;
  const time = status.exerciseTime;

  let condition: "good" | "moderate" | "poor" = "moderate";
  if (sleepHours >= 7 && fatigue === "精力充沛") condition = "good";
  else if (sleepHours <= 5 || fatigue === "很疲劳") condition = "poor";

  const analysisMap = {
    good: [
      `根据你的睡眠（${sleepHours}h）和体能状态，今天适合中等强度训练`,
      `本周已训练2次，建议完成第3次训练`,
    ],
    moderate: [
      `睡眠${sleepHours}h，恢复状态一般，建议适度训练`,
      `推荐${time}的轻中强度训练，避免过度疲劳`,
    ],
    poor: [
      `睡眠仅${sleepHours}h，身体恢复不足，建议以恢复为主`,
      "推荐瑜伽拉伸或轻量训练，帮助身体恢复",
    ],
  };

  const trainingMap = {
    good: { name: "20分钟HIIT燃脂", intensity: "K3", tag: "高效燃脂", duration: "20分钟" },
    moderate: { name: "15分钟全身激活", intensity: "K2", tag: "适度训练", duration: "15分钟" },
    poor: { name: "瑜伽拉伸放松", intensity: "K1", tag: "恢复放松", duration: "15分钟" },
  };

  // Override duration with user preference
  const training = { ...trainingMap[condition] };
  if (time.includes("30")) {
    training.duration = "30分钟";
    if (condition === "good") training.name = "30分钟全身燃脂";
  } else if (time.includes("10")) {
    training.duration = "10分钟";
    if (condition !== "poor") training.name = "10分钟快速燃脂";
  }

  const statusLabel = condition === "good" ? "良好" : condition === "moderate" ? "一般" : "疲劳";

  return {
    condition,
    statusLabel,
    analysis: analysisMap[condition],
    training,
    weight: status.weight || "62",
    sleep: `${sleepHours}h`,
  };
}
