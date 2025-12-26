import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* PUBLIC PAGES */
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Help from "./pages/Help";
import About from "./pages/About";

/* PROTECTED PAGES */
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import EmotionAnalysis from "./pages/EmotionalAnalysis";
import FinancialTwin from "./pages/FinancialTwin";
import Negotiation from "./pages/Negotiation";
import SmartNudges from "./pages/SmartNudges";
import SpendDNA from "./pages/SpendDNA";
import Goals from "./pages/Goals";
import AddGoal from "./pages/AddGoalsForm";
import Settings from "./pages/Settings";


/* FALLBACK */
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" richColors />

      <BrowserRouter>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/help" element={<Help />} />
          <Route path="/about" element={<About />} />

          {/* PROTECTED ROUTES */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-expense" element={<AddExpense />} />
          
          {/* Expenses */}
          <Route path="/expenses/add" element={<AddExpense />} />
          
          {/* AI Features - Phase 1 */}
          <Route path="/emotion-analysis" element={<EmotionAnalysis />} />
          <Route path="/financial-twin" element={<FinancialTwin />} />
          <Route path="/negotiation" element={<Negotiation />} />
          <Route path="/nudges" element={<SmartNudges />} />
          <Route path="/spend-dna" element={<SpendDNA />} />
          
          {/* Goals */}
          <Route path="/goals" element={<Goals />} />
          <Route path="/goals/add" element={<AddGoal />} />
          
          {/* Settings */}
          <Route path="/settings" element={<Settings />} />

          {/* 404 ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;