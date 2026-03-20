import { useState } from "react";
import { Search, X } from "lucide-react";
import { toast } from "sonner";
import { useFoodRecords, MealType, mealLabels } from "@/stores/foodRecords";
import PageHeader from "@/components/PageHeader";

const foodDatabase = [
  { name: "大白菜", unit: "100g", cal: 21, protein: 1.7, carbs: 3.1, fat: 0.2 },
  { name: "菠菜", unit: "100g", cal: 24, protein: 2.6, carbs: 1.8, fat: 0.3 },
  { name: "番茄", unit: "1个(200g)", cal: 38, protein: 1.8, carbs: 7.0, fat: 0.4 },
  { name: "西兰花", unit: "100g", cal: 34, protein: 2.8, carbs: 4.3, fat: 0.4 },
  { name: "冬瓜", unit: "100g", cal: 11, protein: 0.4, carbs: 1.9, fat: 0.2 },
  { name: "茄子", unit: "100g", cal: 21, protein: 1.1, carbs: 4.6, fat: 0.2 },
  { name: "黄瓜", unit: "1根(200g)", cal: 32, protein: 1.6, carbs: 5.2, fat: 0.4 },
  { name: "菜花", unit: "100g", cal: 24, protein: 2.1, carbs: 3.4, fat: 0.2 },
  { name: "芹菜", unit: "100g", cal: 17, protein: 0.6, carbs: 3.9, fat: 0.1 },
  { name: "韭菜", unit: "100g", cal: 26, protein: 2.4, carbs: 3.9, fat: 0.4 },
  { name: "土豆", unit: "1个(150g)", cal: 77, protein: 2.6, carbs: 17.0, fat: 0.3 },
  { name: "红薯", unit: "1个(150g)", cal: 83, protein: 1.4, carbs: 18.9, fat: 0.2 },
  { name: "玉米", unit: "1根(200g)", cal: 172, protein: 5.0, carbs: 38.0, fat: 2.0 },
  { name: "南瓜", unit: "100g", cal: 22, protein: 0.7, carbs: 4.5, fat: 0.1 },
  { name: "莲藕", unit: "100g", cal: 70, protein: 1.9, carbs: 15.2, fat: 0.2 },
  { name: "木耳(水发)", unit: "100g", cal: 21, protein: 1.5, carbs: 3.6, fat: 0.2 },
  { name: "香菇", unit: "100g", cal: 19, protein: 2.2, carbs: 1.9, fat: 0.3 },
  { name: "豆角", unit: "100g", cal: 30, protein: 2.5, carbs: 4.6, fat: 0.2 },
  { name: "豆腐", unit: "100g", cal: 81, protein: 8.1, carbs: 3.8, fat: 3.7 },
  { name: "豆腐(北)", unit: "100g", cal: 98, protein: 12.2, carbs: 1.5, fat: 4.8 },
  { name: "豆腐干", unit: "100g", cal: 140, protein: 16.2, carbs: 10.7, fat: 3.6 },
  { name: "豆浆", unit: "1杯(250ml)", cal: 33, protein: 4.5, carbs: 0.0, fat: 1.8 },
  { name: "豆腐脑", unit: "1碗(200g)", cal: 20, protein: 3.8, carbs: 0.0, fat: 1.6 },
  { name: "米饭", unit: "1碗(150g)", cal: 174, protein: 3.2, carbs: 38.1, fat: 0.5 },
  { name: "馒头", unit: "1个(80g)", cal: 176, protein: 6.0, carbs: 37.0, fat: 1.0 },
  { name: "面条(熟)", unit: "1碗(200g)", cal: 140, protein: 4.5, carbs: 28.0, fat: 1.0 },
  { name: "包子", unit: "1个(80g)", cal: 175, protein: 6.0, carbs: 30.0, fat: 4.0 },
  { name: "饺子", unit: "10个(200g)", cal: 340, protein: 14.0, carbs: 48.0, fat: 10.0 },
  { name: "粥", unit: "1碗(300g)", cal: 108, protein: 2.0, carbs: 24.0, fat: 0.3 },
  { name: "方便面", unit: "1包(100g)", cal: 472, protein: 9.5, carbs: 60.9, fat: 21.1 },
  { name: "粉丝", unit: "100g", cal: 335, protein: 0.8, carbs: 82.6, fat: 0.2 },
  { name: "油条", unit: "1根(70g)", cal: 247, protein: 5.0, carbs: 31.0, fat: 12.0 },
  { name: "馄饨", unit: "1份(200g)", cal: 280, protein: 12.0, carbs: 40.0, fat: 8.0 },
  { name: "猪肉(瘦)", unit: "100g", cal: 143, protein: 20.3, carbs: 1.5, fat: 6.2 },
  { name: "猪肉(肥)", unit: "100g", cal: 395, protein: 14.0, carbs: 2.0, fat: 37.0 },
  { name: "牛肉", unit: "100g", cal: 125, protein: 19.9, carbs: 1.0, fat: 4.2 },
  { name: "羊肉", unit: "100g", cal: 203, protein: 19.0, carbs: 0.0, fat: 14.0 },
  { name: "鸡胸肉", unit: "100g", cal: 133, protein: 25.0, carbs: 0.0, fat: 3.0 },
  { name: "鸡腿", unit: "1个(100g)", cal: 181, protein: 16.0, carbs: 0.0, fat: 13.0 },
  { name: "北京烤鸭", unit: "100g", cal: 436, protein: 16.6, carbs: 6.0, fat: 38.4 },
  { name: "叉烧肉", unit: "100g", cal: 279, protein: 23.8, carbs: 7.9, fat: 16.9 },
  { name: "猪肝", unit: "100g", cal: 129, protein: 19.3, carbs: 5.0, fat: 3.5 },
  { name: "鸡蛋", unit: "1个(50g)", cal: 72, protein: 6.0, carbs: 0.4, fat: 5.0 },
  { name: "鸭蛋", unit: "1个(60g)", cal: 180, protein: 8.7, carbs: 1.3, fat: 14.0 },
  { name: "草鱼", unit: "100g", cal: 112, protein: 16.6, carbs: 0.0, fat: 5.2 },
  { name: "带鱼", unit: "100g", cal: 127, protein: 17.7, carbs: 3.1, fat: 4.9 },
  { name: "鲳鱼", unit: "100g", cal: 142, protein: 18.5, carbs: 0.0, fat: 7.8 },
  { name: "大黄鱼", unit: "100g", cal: 96, protein: 17.7, carbs: 0.8, fat: 2.5 },
  { name: "对虾", unit: "100g", cal: 93, protein: 18.6, carbs: 2.8, fat: 0.8 },
  { name: "螃蟹", unit: "100g", cal: 103, protein: 17.5, carbs: 2.3, fat: 2.6 },
  { name: "鲤鱼", unit: "100g", cal: 109, protein: 17.6, carbs: 0.5, fat: 4.1 },
  { name: "牛奶", unit: "1杯(250ml)", cal: 135, protein: 7.0, carbs: 10.0, fat: 5.0 },
  { name: "酸奶", unit: "1杯(200g)", cal: 140, protein: 8.0, carbs: 16.0, fat: 4.0 },
  { name: "苹果", unit: "1个(200g)", cal: 104, protein: 0.4, carbs: 27.0, fat: 0.6 },
  { name: "香蕉", unit: "1根(120g)", cal: 107, protein: 1.6, carbs: 27.0, fat: 0.4 },
  { name: "橙子", unit: "1个(200g)", cal: 94, protein: 1.6, carbs: 23.0, fat: 0.4 },
  { name: "西瓜", unit: "1片(300g)", cal: 75, protein: 1.8, carbs: 18.0, fat: 0.3 },
  { name: "葡萄", unit: "100g", cal: 43, protein: 0.5, carbs: 9.9, fat: 0.2 },
  { name: "草莓", unit: "100g", cal: 30, protein: 1.0, carbs: 6.0, fat: 0.2 },
  { name: "芒果", unit: "1个(200g)", cal: 130, protein: 1.6, carbs: 32.0, fat: 0.4 },
  { name: "梨", unit: "1个(200g)", cal: 100, protein: 0.8, carbs: 25.0, fat: 0.2 },
  { name: "花生", unit: "1把(30g)", cal: 171, protein: 8.0, carbs: 5.0, fat: 15.0 },
  { name: "核桃", unit: "3个(30g)", cal: 196, protein: 4.6, carbs: 3.6, fat: 19.0 },
  { name: "腰果", unit: "1把(30g)", cal: 172, protein: 5.2, carbs: 10.5, fat: 13.0 },
  { name: "杏仁", unit: "1把(30g)", cal: 173, protein: 6.3, carbs: 6.3, fat: 14.5 },
  { name: "番茄炒蛋", unit: "1份(200g)", cal: 180, protein: 10.0, carbs: 8.0, fat: 12.0 },
  { name: "宫保鸡丁", unit: "1份(200g)", cal: 310, protein: 25.0, carbs: 18.0, fat: 14.0 },
  { name: "红烧肉", unit: "1份(150g)", cal: 510, protein: 18.0, carbs: 12.0, fat: 44.0 },
  { name: "清蒸鲈鱼", unit: "1份(200g)", cal: 180, protein: 28.0, carbs: 2.0, fat: 6.0 },
  { name: "蒜蓉炒菜心", unit: "1份(200g)", cal: 80, protein: 4.0, carbs: 8.0, fat: 4.0 },
  { name: "凉拌黄瓜", unit: "1份(150g)", cal: 40, protein: 1.5, carbs: 6.0, fat: 1.0 },
  { name: "蛋炒饭", unit: "1份(200g)", cal: 320, protein: 10.0, carbs: 48.0, fat: 10.0 },
  { name: "皮蛋瘦肉粥", unit: "1碗(300g)", cal: 180, protein: 12.0, carbs: 28.0, fat: 3.0 },
  { name: "燕麦片", unit: "1份(80g)", cal: 280, protein: 9.0, carbs: 52.0, fat: 5.0 },
  { name: "紫薯", unit: "1个(150g)", cal: 130, protein: 2.0, carbs: 30.0, fat: 0.2 },
  { name: "荷包蛋", unit: "1个(60g)", cal: 86, protein: 7.0, carbs: 0.5, fat: 6.0 },
  { name: "咖啡(黑)", unit: "1杯(250ml)", cal: 10, protein: 0.3, carbs: 1.0, fat: 0.0 },
  { name: "奶茶", unit: "1杯(500ml)", cal: 380, protein: 4.0, carbs: 60.0, fat: 12.0 },
];

const quickTags = ["鸡蛋", "米饭", "鸡胸肉", "番茄炒蛋", "豆腐", "西兰花", "苹果", "牛奶", "燕麦片", "馒头"];

const mealOptions: { type: MealType; icon: string }[] = [
  { type: "breakfast", icon: "🌅" },
  { type: "lunch", icon: "☀️" },
  { type: "dinner", icon: "🌙" },
  { type: "snack", icon: "🍎" },
];

const getDefaultMeal = (): MealType => {
  const hour = new Date().getHours();
  if (hour < 10) return "breakfast";
  if (hour < 14) return "lunch";
  if (hour < 20) return "dinner";
  return "snack";
};

const FoodSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedMeal, setSelectedMeal] = useState<MealType>(getDefaultMeal());
  const addRecord = useFoodRecords((s) => s.addRecord);

  const results = searchValue
    ? foodDatabase.filter((f) =>
        f.name.includes(searchValue) ||
        searchValue.includes(f.name.slice(0, 2))
      )
    : [];

  return (
    <div className="flex flex-col">
      <PageHeader title="搜索食物" />

      {/* 餐次选择 */}
      <div className="mx-5 mt-4 mb-1">
        <p className="text-xs text-muted-foreground mb-2">记录到哪一餐？</p>
        <div className="grid grid-cols-4 gap-2">
          {mealOptions.map((item) => (
            <button
              key={item.type}
              onClick={() => setSelectedMeal(item.type)}
              className={`rounded-xl py-2.5 text-center cursor-pointer transition-colors ${
                selectedMeal === item.type
                  ? "bg-keep-green text-keep-green-foreground"
                  : "bg-card border border-primary/10 text-muted-foreground"
              }`}
            >
              <span className="text-base block">{item.icon}</span>
              <span className="text-xs font-medium mt-0.5 block">{mealLabels[item.type]}</span>
            </button>
          ))}
        </div>
      </div>

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
                  onClick={() => {
                    const now = new Date();
                    addRecord({
                      name: food.name,
                      calories: food.cal,
                      protein: food.protein,
                      carbs: food.carbs,
                      fat: food.fat,
                      meal: "lunch",
                      date: now.toISOString().slice(0, 10),
                      time: `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`,
                    });
                    toast.success(`已将 ${food.name} 记录到今日摄入`);
                  }}
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
