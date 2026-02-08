import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TabBar from "./components/TabBar";
import Index from "./pages/Index";
import Coach from "./pages/Coach";
import Exercise from "./pages/Exercise";
import Shop from "./pages/Shop";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <div className="max-w-lg mx-auto min-h-screen bg-card relative">
          <main className="pb-16">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/coach" element={<Coach />} />
              <Route path="/exercise" element={<Exercise />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <TabBar />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
