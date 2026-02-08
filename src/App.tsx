import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import TabBar from "./components/TabBar";
import Index from "./pages/Index";
import Coach from "./pages/Coach";
import Exercise from "./pages/Exercise";
import Shop from "./pages/Shop";
import Profile from "./pages/Profile";
import AIRecommend from "./pages/AIRecommend";
import TrainingDetail from "./pages/TrainingDetail";
import Workout from "./pages/Workout";
import NotFound from "./pages/NotFound";
const queryClient = new QueryClient();

const tabRoutes = ["/", "/coach", "/exercise", "/shop", "/profile"];

const AppContent = () => {
  const location = useLocation();
  const showTabBar = tabRoutes.includes(location.pathname);

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-card relative">
      <main className={showTabBar ? "pb-16" : ""}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/coach" element={<Coach />} />
          <Route path="/exercise" element={<Exercise />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ai-recommend" element={<AIRecommend />} />
          <Route path="/training-detail" element={<TrainingDetail />} />
          <Route path="/workout" element={<Workout />} />
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
