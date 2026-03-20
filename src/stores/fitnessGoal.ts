export interface FitnessGoal {
  goalType: "减脂" | "增肌" | "塑形";
  targetWeight: string;
  targetDuration: "1个月" | "3个月" | "6个月";
  startWeight: string;
}

const KEY = "fitness-goal";

export function saveFitnessGoal(goal: FitnessGoal) {
  localStorage.setItem(KEY, JSON.stringify(goal));
}

export function loadFitnessGoal(): FitnessGoal | null {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}
