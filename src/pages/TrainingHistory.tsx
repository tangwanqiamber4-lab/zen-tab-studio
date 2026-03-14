import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Brain } from "lucide-react";
import PageHeader from "@/components/PageHeader";

interface TrainingRecord {
  name: string;
  intensity: string;
  duration: string;
  cal: number;
}

const trainingData: Record<string, TrainingRecord[]> = {
  "2026-3-3": [{ name: "20分钟HIIT燃脂", intensity: "K3", duration: "20分钟", cal: 215 }],
  "2026-3-5": [{ name: "瑜伽拉伸放松", intensity: "K1", duration: "25分钟", cal: 100 }],
  "2026-3-7": [{ name: "30分钟全身燃脂", intensity: "K4", duration: "30分钟", cal: 320 }],
  "2026-3-10": [{ name: "15分钟腹肌撕裂", intensity: "K2", duration: "15分钟", cal: 150 }],
  "2026-3-12": [{ name: "20分钟HIIT燃脂", intensity: "K3", duration: "20分钟", cal: 215 }],
};

const WEEKDAY_HEADERS = ["一", "二", "三", "四", "五", "六", "日"];

const today = new Date();
const todayKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  const day = new Date(year, month - 1, 1).getDay();
  return day === 0 ? 6 : day - 1; // Monday=0
}

function dateKey(year: number, month: number, day: number) {
  return `${year}-${month}-${day}`;
}

const TrainingHistory = () => {
  const navigate = useNavigate();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);
  const daysInPrevMonth = getDaysInMonth(year, month === 1 ? 12 : month - 1);

  const cells: { day: number; currentMonth: boolean; key: string }[] = [];
  // Previous month padding
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    const m = month === 1 ? 12 : month - 1;
    const y = month === 1 ? year - 1 : year;
    cells.push({ day: d, currentMonth: false, key: dateKey(y, m, d) });
  }
  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, currentMonth: true, key: dateKey(year, month, d) });
  }
  // Next month padding
  const remaining = 7 - (cells.length % 7);
  if (remaining < 7) {
    for (let d = 1; d <= remaining; d++) {
      const m = month === 12 ? 1 : month + 1;
      const y = month === 12 ? year + 1 : year;
      cells.push({ day: d, currentMonth: false, key: dateKey(y, m, d) });
    }
  }

  const prevMonth = () => {
    setSelectedDate(null);
    if (month === 1) { setYear(year - 1); setMonth(12); }
    else setMonth(month - 1);
  };
  const nextMonth = () => {
    setSelectedDate(null);
    if (month === 12) { setYear(year + 1); setMonth(1); }
    else setMonth(month + 1);
  };

  const handleDateClick = (cell: typeof cells[0]) => {
    if (!cell.currentMonth) return;
    const k = cell.key;
    const isFuture = new Date(year, month - 1, cell.day) > today;
    if (isFuture) return;
    setSelectedDate(selectedDate === k ? null : k);
  };

  const selectedRecords = selectedDate ? trainingData[selectedDate] : undefined;
  const isSelectedToday = selectedDate === todayKey;

  // Parse selected date for display
  const selectedParts = selectedDate?.split("-").map(Number);

  return (
    <div className="flex flex-col pb-6">
      <PageHeader title="训练历史" />

      {/* ② 月历卡片 */}
      <section className="mx-5 mt-4 bg-card rounded-xl border border-primary/10 p-4">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-3">
          <button onClick={prevMonth} className="p-1 text-foreground" aria-label="上个月">
            <ChevronLeft size={18} strokeWidth={1.8} />
          </button>
          <span className="text-sm font-bold text-foreground">{year}年{month}月</span>
          <button onClick={nextMonth} className="p-1 text-foreground" aria-label="下个月">
            <ChevronRight size={18} strokeWidth={1.8} />
          </button>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 mb-1">
          {WEEKDAY_HEADERS.map((w) => (
            <span key={w} className="text-center text-[10px] text-muted-foreground">{w}</span>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7">
          {cells.map((cell, i) => {
            const hasTrain = !!trainingData[cell.key] && cell.currentMonth;
            const isToday = cell.key === todayKey && cell.currentMonth;
            const isFuture = cell.currentMonth && new Date(year, month - 1, cell.day) > today;
            const isSelected = selectedDate === cell.key;

            return (
              <button
                key={i}
                onClick={() => handleDateClick(cell)}
                disabled={!cell.currentMonth || isFuture}
                className={`flex flex-col items-center justify-center py-1.5 rounded-lg transition-colors ${
                  !cell.currentMonth || isFuture
                    ? "text-muted-foreground opacity-40 cursor-default"
                    : hasTrain
                    ? "bg-keep-green/10 text-keep-green font-medium cursor-pointer"
                    : "text-foreground cursor-pointer"
                } ${isSelected ? "ring-1 ring-keep-green" : ""}`}
              >
                <span className={`text-xs ${isToday ? "font-bold" : ""}`}>{cell.day}</span>
                {hasTrain && (
                  <div className="w-[5px] h-[5px] rounded-full bg-keep-green mt-0.5" />
                )}
                {isToday && !hasTrain && (
                  <div className="w-[5px] h-[5px] rounded-full bg-keep-green mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Expanded training detail */}
        {selectedDate && (
          <div className="bg-keep-green/[0.06] rounded-xl p-3 mt-3 border border-keep-green/20">
            {isSelectedToday && !selectedRecords ? (
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">今天还没有训练</span>
                <button
                  onClick={() => navigate("/training")}
                  className="text-xs font-medium text-keep-green"
                >
                  去训练 →
                </button>
              </div>
            ) : selectedRecords ? (
              <>
                <p className="text-[11px] text-keep-green font-medium mb-2">
                  {selectedParts![1]}月{selectedParts![2]}日 的训练
                </p>
                {selectedRecords.map((r, ri) => (
                  <div
                    key={ri}
                    className={`flex items-center justify-between py-2 ${
                      ri < selectedRecords.length - 1 ? "border-b border-keep-green/10" : ""
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold text-foreground">{r.name}</p>
                      <p className="text-[10px] text-muted-foreground">{r.intensity} · {r.duration}</p>
                    </div>
                    <span className="text-xs font-bold text-orange">{r.cal}卡</span>
                  </div>
                ))}
              </>
            ) : (
              <p className="text-xs text-muted-foreground">该日无训练记录</p>
            )}
          </div>
        )}
      </section>

      {/* ③ 本月统计三格 */}
      <section className="mx-5 mt-3 bg-card rounded-xl border border-primary/10 p-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center gap-0.5 bg-keep-green/[0.08] rounded-lg py-2.5">
            <span className="text-base font-bold text-keep-green">8次</span>
            <span className="text-[10px] text-muted-foreground">本月训练</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 bg-secondary/[0.08] rounded-lg py-2.5">
            <span className="text-base font-bold text-secondary">185分钟</span>
            <span className="text-[10px] text-muted-foreground">累计时长</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 bg-orange/[0.08] rounded-lg py-2.5">
            <span className="text-base font-bold text-orange">1850卡</span>
            <span className="text-[10px] text-muted-foreground">已消耗</span>
          </div>
        </div>
      </section>

      {/* ④ AI 训练洞察 */}
      <section className="mx-5 mt-3 mb-6 hero-gradient rounded-xl px-4 py-3">
        <div className="flex items-center gap-2 mb-2">
          <Brain size={16} className="text-primary-foreground flex-shrink-0" />
          <span className="text-sm font-bold text-primary-foreground">AI 训练洞察</span>
        </div>
        <div className="divide-y divide-primary-foreground/10">
          {[
            { label: "规律", labelClass: "bg-primary-foreground/15 text-primary-foreground", text: "你习惯在周一三五训练，周末容易断，建议周六加一次轻量拉伸" },
            { label: "趋势", labelClass: "bg-keep-green/30 text-white", text: "前两周训练频率高，本周有所下降，注意保持节奏" },
            { label: "记录", labelClass: "bg-orange/30 text-white", text: "本月最长连续训练 5 天，是你这个月的最佳记录" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 py-2.5">
              <span className={`${item.labelClass} text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 mt-0.5`}>
                {item.label}
              </span>
              <p className="text-xs text-primary-foreground/85 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TrainingHistory;
