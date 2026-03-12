import { useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { useFoodRecords, mealLabels } from "@/stores/foodRecords";

const FoodHistory = () => {
  const navigate = useNavigate();
  const { getAllDates, getRecordsByDate } = useFoodRecords();

  const dates = getAllDates();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex items-center gap-3 px-4 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">饮食历史</h1>
      </div>

      <div className="px-5 pb-8 space-y-4">
        {dates.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <CalendarDays size={40} className="mb-3 opacity-40" />
            <p className="text-sm">暂无饮食记录</p>
          </div>
        )}

        {dates.map((date) => {
          const records = getRecordsByDate(date);
          const totalCal = records.reduce((s, r) => s + r.calories, 0);
          const formatted = new Date(date + "T00:00:00").toLocaleDateString("zh-CN", {
            month: "long",
            day: "numeric",
            weekday: "short",
          });

          return (
            <div key={date} className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold text-foreground">{formatted}</p>
                <span className="text-xs text-orange font-medium">{totalCal} 卡</span>
              </div>
              <div className="space-y-2">
                {records.map((r) => (
                  <div key={r.id} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-keep-green bg-keep-green/10 px-1.5 py-0.5 rounded">
                        {mealLabels[r.meal]}
                      </span>
                      <span className="text-sm text-foreground">{r.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{r.calories}卡</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FoodHistory;
