import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import Index from "./pages/Index";
import Drive from "./pages/Drive";
import Calendar from "./pages/Calendar";
import Trello from "./pages/Trello";
import Notion from "./pages/Notion";
import Presentations from "./pages/Presentations";
import ProjectFlow from "./pages/ProjectFlow";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/drive" element={<Drive />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/project-flow" element={<ProjectFlow />} />
              <Route path="/trello" element={<Trello />} />
              <Route path="/notion" element={<Notion />} />
              <Route path="/presentations" element={<Presentations />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
