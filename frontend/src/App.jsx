import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
/* PUBLIC PAGES          */
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Help from "./pages/Help";
import About from "./pages/About";
/* PROTECTED PAGES       */
/* (Require Login)       */
import Dashboard from "./pages/Dashboard";
import Simulation from "./pages/Simulation";
import SpendDNA from "./pages/SpendDNA";
import Nudges from "./pages/Nudges";
import Optimization from "./pages/Optimization";
import Negotiation from "./pages/Negotiation";
import AddExpense from "./pages/AddExpense";
import Goals from "./pages/Goals";
import AddGoal from "./pages/AddGoalsForm";
import Settings from "./pages/Settings";
/* FALLBACK              */
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" richColors />

      <BrowserRouter>
        <Routes>
          {/* PUBLIC ROUTES         */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/help" element={<Help />} />
          <Route path="/about" element={<About />} />

          {/* PROTECTED ROUTES      */}
          {/* (User must be logged) */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/spend-dna" element={<SpendDNA />} />
          <Route path="/nudges" element={<Nudges />} />
          <Route path="/optimization" element={<Optimization />} />
          <Route path="/negotiation" element={<Negotiation />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/add-goal" element={<AddGoal />} />
          <Route path="/settings" element={<Settings />} />
          {/* 404 ROUTE             */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
