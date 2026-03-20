import { useState } from "react";
import { Search, X } from "lucide-react";
import { toast } from "sonner";
import { useFoodRecords } from "@/stores/foodRecords";
import PageHeader from "@/components/PageHeader";

const foodDatabase = [
  { name: "鸡蛋", unit: "1个（50g）", cal: 72, protein: 6, carbs: 0.4, fat: 5 },
  { name: "米饭", unit: "1碗（150g）", cal: 174, protein: 3, carbs: 38, fat: 0.3 },
  { name: "鸡胸肉", unit: "100g", cal: 133, protein: 25, carbs: 0, fat: 3 },
  { name: "牛奶", unit: "1杯（250ml）", cal: 135, protein: 7, carbs: 10, fat: 5 },
  { name: "燕麦", unit: "1份（80g）", cal: 304, protein: 11, carbs: 52, fat: 6 },
  { name: "西兰花", unit: "100g", cal: 34, protein: 3, carbs: 5, fat: 0.4 },
  { name: "苹果", unit: "1个（200g）", cal: 104, protein: 0.5, carbs: 27, fat: 0.3 },
  { name: "豆腐", unit: "100g", cal: 76, protein: 8, carbs: 2, fat: 4 },
  { name: "香蕉", unit: "1根（120g）", cal: 107, protein: 1.3, carbs: 27, fat: 0.3 },
  { name: "三文鱼", unit: "100g", cal: 208, protein: 20, carbs: 0, fat: 13 },
  { name: "牛肉", unit: "100g", cal: 250, protein: 26, carbs: 0, fat: 16 },
  { name: "花生", unit: "1小把（30g）", cal: 171, protein: 8, carbs: 5, fat: 15 },
];

const quickTags = ["鸡蛋", "米饭", "鸡胸肉", "牛奶", "燕麦", "西兰花", "苹果", "豆腐"];

const FoodSearch = () => {
  const [searchValue, setSearchValue] = useState("");

  const results = searchValue
    ? foodDatabase.filter((f) => f.name.includes(searchValue))
    : [];

  return (
    <div className="flex flex-col">
      <PageHeader title="搜索食物" />

      {/* 搜索框 */}
      <div className="mx-5 mt-4 bg-card rounded-xl border border-primary/10 px-4 py-3 flex items-center gap-3">
        <Search size={16} className="text-muted-foreground flex-shrink-0" />
        <input
          className="flex-1 text-sm outline-none bg-transparent placeholder:text-muted-foreground"
          placeholder="输入食物名称，如：鸡蛋、米饭..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {searchValue && (
          <button onClick={() => setSearchValue("")} className="text-muted-foreground text-xs">
            <X size={14} />
          </button>
        )}
      </div>

      {/* 常用食物 or 搜索结果 */}
      {!searchValue ? (
        <section className="mx-5 mt-4">
          <p className="text-xs text-muted-foreground mb-2">常用食物</p>
          <div className="flex flex-wrap gap-2">
            {quickTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchValue(tag)}
                className="bg-card border border-primary/10 text-xs text-foreground px-3 py-1.5 rounded-full cursor-pointer transition-all active:scale-[0.97]"
              >
                {tag}
              </button>
            ))}
          </div>
        </section>
      ) : results.length > 0 ? (
        <section className="mx-5 mt-4 mb-6">
          {results.map((food) => (
            <div
              key={food.name}
              className="bg-card rounded-xl border border-primary/10 p-4 flex items-center justify-between mb-2"
            >
              <div>
                <p className="text-sm font-bold text-foreground">{food.name}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{food.unit}</p>
                <div className="flex gap-2 mt-1">
                  <span className="text-[10px] text-keep-green">蛋白质{food.protein}g</span>
                  <span className="text-[10px] text-secondary">碳水{food.carbs}g</span>
                  <span className="text-[10px] text-muted-foreground">脂肪{food.fat}g</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-sm font-bold text-orange">{food.cal}卡</span>
                <button
                  onClick={() => toast.success("已记录到今日摄入")}
                  className="text-[10px] bg-keep-green/10 text-keep-green px-2.5 py-1 rounded-full font-medium transition-all active:scale-[0.95]"
                >
                  + 记录
                </button>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <section className="mx-5 mt-16 flex flex-col items-center">
          <Search size={32} className="text-muted-foreground opacity-40" />
          <p className="text-sm text-muted-foreground mt-3">没有找到相关食物</p>
          <p className="text-[10px] text-muted-foreground mt-1">试试其他关键词，或使用拍照识别</p>
        </section>
      )}
    </div>
  );
};

export default FoodSearch;
