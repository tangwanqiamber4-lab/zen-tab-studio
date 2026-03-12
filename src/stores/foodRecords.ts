import { create } from "zustand";

export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export const mealLabels: Record<MealType, string> = {
  breakfast: "早餐",
  lunch: "午餐",
  dinner: "晚餐",
  snack: "加餐",
};

export type FoodRecord = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meal: MealType;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
};

type FoodRecordsState = {
  records: FoodRecord[];
  addRecord: (record: Omit<FoodRecord, "id">) => void;
  getTodayRecords: () => FoodRecord[];
  getTodayTotals: () => { calories: number; protein: number; carbs: number; fat: number };
  getRecordsByDate: (date: string) => FoodRecord[];
  getAllDates: () => string[];
};

const getToday = () => new Date().toISOString().slice(0, 10);

export const useFoodRecords = create<FoodRecordsState>((set, get) => ({
  records: [
    // Demo data
    {
      id: "demo-1",
      name: "鸡胸肉炒西兰花",
      calories: 350,
      protein: 35,
      carbs: 12,
      fat: 8,
      meal: "lunch" as MealType,
      date: getToday(),
      time: "12:30",
    },
    {
      id: "demo-2",
      name: "紫薯燕麦粥",
      calories: 280,
      protein: 8,
      carbs: 52,
      fat: 4,
      meal: "breakfast" as MealType,
      date: getToday(),
      time: "08:00",
    },
  ],

  addRecord: (record) =>
    set((state) => ({
      records: [
        ...state.records,
        { ...record, id: `food-${Date.now()}-${Math.random().toString(36).slice(2, 6)}` },
      ],
    })),

  getTodayRecords: () => {
    const today = getToday();
    return get().records.filter((r) => r.date === today);
  },

  getTodayTotals: () => {
    const today = getToday();
    const todayRecords = get().records.filter((r) => r.date === today);
    return todayRecords.reduce(
      (acc, r) => {
        acc.calories += r.calories;
        acc.protein += r.protein;
        acc.carbs += r.carbs;
        acc.fat += r.fat;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  },

  getRecordsByDate: (date) => get().records.filter((r) => r.date === date),

  getAllDates: () => {
    const dates = [...new Set(get().records.map((r) => r.date))];
    return dates.sort((a, b) => b.localeCompare(a));
  },
}));
