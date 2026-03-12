import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import TabBar from "./components/TabBar";
import Index from "./pages/Index";
import Training from "./pages/Training";
import Health from "./pages/Health";
import Profile from "./pages/Profile";
import AIRecommend from "./pages/AIRecommend";
import TrainingDetail from "./pages/TrainingDetail";
import Workout from "./pages/Workout";
import AICorrection from "./pages/AICorrection";
import AINutrition from "./pages/AINutrition";
import AIInsights from "./pages/AIInsights";
import AICompanion from "./pages/AICompanion";
import DailyStatus from "./pages/DailyStatus";
import TrainingSummary from "./pages/TrainingSummary";
import FoodCamera from "./pages/FoodCamera";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const tabRoutes = ["/", "/training", "/health", "/profile"];

const AppContent = () => {
  const location = useLocation();
  const showTabBar = tabRoutes.includes(location.pathname);

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-card relative">
      <main className={showTabBar ? "pb-16" : ""}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/training" element={<Training />} />
          <Route path="/health" element={<Health />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ai-recommend" element={<AIRecommend />} />
          <Route path="/training-detail" element={<TrainingDetail />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/ai-correction" element={<AICorrection />} />
          <Route path="/ai-nutrition" element={<AINutrition />} />
          <Route path="/ai-insights" element={<AIInsights />} />
          <Route path="/ai-companion" element={<AICompanion />} />
          <Route path="/daily-status" element={<DailyStatus />} />
          <Route path="/training-summary" element={<TrainingSummary />} />
          <Route path="/food-camera" element={<FoodCamera />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {showTabBar && <TabBar />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
