import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Target,
  PlusCircle,
  Plane,
  Car,
  Home,
  GraduationCap,
  PiggyBank,
  Smartphone,
  Gift,
  TrendingUp,
  Calendar,
  Sparkles,
  CheckCircle,
  MoreVertical,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

/* ================= DATA ================= */

const initialGoals = [
  {
    id: 1,
    title: "Emergency Fund",
    icon: PiggyBank,
    target: 300000,
    current: 180000,
    deadline: "Dec 2024",
    color: "bg-success",
    monthlySaving: 15000,
    priority: "high",
    term: "long",
  },
  {
    id: 2,
    title: "New iPhone 16",
    icon: Smartphone,
    target: 120000,
    current: 45000,
    deadline: "Mar 2025",
    color: "bg-primary",
    monthlySaving: 8000,
    priority: "medium",
    term: "short",
  },
  {
    id: 3,
    title: "Goa Trip",
    icon: Plane,
    target: 50000,
    current: 32000,
    deadline: "Feb 2025",
    color: "bg-accent",
    monthlySaving: 6000,
    priority: "low",
    term: "short",
  },
  {
    id: 4,
    title: "Car Down Payment",
    icon: Car,
    target: 500000,
    current: 125000,
    deadline: "Jun 2025",
    color: "bg-warning",
    monthlySaving: 25000,
    priority: "high",
    term: "long",
  },
];

const completedGoals = [
  { title: "Birthday Gift for Mom", amount: 15000, completedDate: "Oct 2024" },
  { title: "New Laptop", amount: 85000, completedDate: "Aug 2024" },
];

const suggestedGoals = [
  { title: "Wedding Fund", icon: Gift, suggestedAmount: 500000 },
  { title: "Home Down Payment", icon: Home, suggestedAmount: 1000000 },
  { title: "Higher Education", icon: GraduationCap, suggestedAmount: 300000 },
];

/* ================= COMPONENT ================= */

export default function Goals() {
  const [goals, setGoals] = useState(initialGoals);

  const updatePriority = (id, priority) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, priority } : g))
    );
  };

  const totalSaved = goals.reduce((a, g) => a + g.current, 0);
  const totalTarget = goals.reduce((a, g) => a + g.target, 0);

  return (
    <DashboardLayout
      title="Goals"
      subtitle="Track your savings goals"
      headerAction={
        <div className="flex gap-3">
          <Link to="/add-goal">
            <Button variant="outline">
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Goal
            </Button>
          </Link>
          <Button className="bg-gradient-to-r from-primary to-accent text-white">
            ✨ Auto-Optimize
          </Button>
        </div>
      }
    >
      {/* ================= SUMMARY ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="stat-card">
          <span className="text-sm text-muted-foreground">Active Goals</span>
          <p className="text-2xl font-bold">{goals.length}</p>
        </div>

        <div className="stat-card">
          <span className="text-sm text-muted-foreground">Total Saved</span>
          <p className="text-2xl font-bold">
            ₹{(totalSaved / 100000).toFixed(1)}L
          </p>
        </div>

        <div className="stat-card">
          <span className="text-sm text-muted-foreground">Total Target</span>
          <p className="text-2xl font-bold">
            ₹{(totalTarget / 100000).toFixed(1)}L
          </p>
        </div>

        <div className="stat-card bg-gradient-to-br from-primary/20 to-card">
          <span className="text-sm text-muted-foreground">Overall Progress</span>
          <p className="text-2xl font-bold">
            {totalTarget > 0
              ? Math.round((totalSaved / totalTarget) * 100)
              : 0}
            %
          </p>
        </div>
      </div>

      {/* ================= ACTIVE GOALS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold">Active Goals</h3>

          {goals.map((goal) => {
            // ✅ CORRECT & SAFE FORMULA
            const progress =
              goal.target > 0
                ? Math.min((goal.current / goal.target) * 100, 100)
                : 0;

            return (
              <div
                key={goal.id}
                className="bg-card border border-border rounded-xl p-6"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-4 items-center">
                    <div
                      className={`w-12 h-12 rounded-xl ${goal.color} flex items-center justify-center`}
                    >
                      <goal.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{goal.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {goal.deadline}
                      </div>
                    </div>
                  </div>

                  {/* Priority Controls (FIXED LAYOUT) */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-secondary whitespace-nowrap">
                      {goal.term === "short" ? "Short-Term" : "Long-Term"}
                    </span>

                    <select
                      value={goal.priority}
                      onChange={(e) =>
                        updatePriority(goal.id, e.target.value)
                      }
                      className="h-8 px-2 text-xs rounded-md bg-secondary border border-border focus:outline-none"
                    >
                      <option value="high">HIGH</option>
                      <option value="medium">MEDIUM</option>
                      <option value="low">LOW</option>
                    </select>

                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">
                      ₹{goal.current.toLocaleString()} of ₹
                      {goal.target.toLocaleString()}
                    </span>
                    <span className="font-semibold">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="flex justify-between text-sm">
                  <span>
                    Monthly:{" "}
                    <b>₹{goal.monthlySaving.toLocaleString()}</b>
                  </span>
                  <span>
                    Remaining:{" "}
                    <b>
                      ₹{(goal.target - goal.current).toLocaleString()}
                    </b>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= RIGHT COLUMN (UNCHANGED) ================= */}
        <div className="space-y-6">
          <div className="bg-card border rounded-xl p-6">
            <div className="flex gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-success" />
              <h3 className="font-semibold">Completed Goals</h3>
            </div>

            {completedGoals.map((g, i) => (
              <div
                key={i}
                className="flex justify-between py-2 border-b last:border-0"
              >
                <div>
                  <p className="text-sm font-medium">{g.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {g.completedDate}
                  </p>
                </div>
                <span className="text-success font-semibold">
                  ₹{g.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-card border rounded-xl p-6">
            <div className="flex gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Suggested Goals</h3>
            </div>

            {suggestedGoals.map((g, i) => (
              <button
                key={i}
                className="w-full flex items-center gap-3 p-3 bg-secondary/50 rounded-lg mb-2"
              >
                <g.icon className="w-5 h-5 text-primary" />
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">{g.title}</p>
                  <p className="text-xs text-muted-foreground">
                    Target: ₹{(g.suggestedAmount / 100000).toFixed(0)}L
                  </p>
                </div>
                <PlusCircle className="w-4 h-4 text-primary" />
              </button>
            ))}
          </div>
          {/* Tips */}
          <div className="bg-card border border-border rounded-xl p-6 mt-6">
            <h3 className="font-semibold text-foreground mb-3">
              💡 Savings Tip
            </h3>
            <p className="text-sm text-muted-foreground">
              Automating your savings can help you reach goals 2x faster.
              Set up auto-transfers on payday!
            </p>
          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}
