import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlusCircle, Calendar, PiggyBank,Target } from "lucide-react";
import api from "@/config/api";

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await api.get("/goals/prioritize");
        setGoals(res.data.goals || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  const totalSaved = goals.reduce((a, g) => a + (g.currentAmount || 0), 0);
  const totalTarget = goals.reduce((a, g) => a + (g.targetAmount || 0), 0);

  return (
    <DashboardLayout title="Goals" subtitle="Track your financial goals">
      
      <div className="flex items-center gap-3 mb-2">
  <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
    <Target className="w-5 h-5 text-accent" />
  </div>
  <h2 className="text-2xl font-bold">Financial Goals</h2>
</div>

<p className="text-muted-foreground mb-8">
  Set, track, and achieve your short-term and long-term financial goals.
</p>

      {/* ================= TOP ACTION BAR ================= */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-muted-foreground">
          {goals.length} Active Goals
        </div>

        <Button
          onClick={() => navigate("/goals/add")}
          className="bg-gradient-to-r from-primary to-accent text-white"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Goal
        </Button>
      </div>

      {/* ================= SUMMARY ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stat-card">
          <span className="text-sm text-muted-foreground">Total Saved</span>
          <p className="text-2xl font-bold">₹{totalSaved.toLocaleString()}</p>
        </div>

        <div className="stat-card">
          <span className="text-sm text-muted-foreground">Total Target</span>
          <p className="text-2xl font-bold">₹{totalTarget.toLocaleString()}</p>
        </div>

        <div className="stat-card">
          <span className="text-sm text-muted-foreground">Overall Progress</span>
          <p className="text-2xl font-bold">
            {totalTarget > 0
              ? Math.round((totalSaved / totalTarget) * 100)
              : 0}
            %
          </p>
        </div>
      </div>

      {/* ================= GOALS LIST ================= */}
      {loading ? (
        <p>Loading goals...</p>
      ) : goals.length === 0 ? (
        <div className="text-center py-12">
          <PiggyBank className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
          <p className="text-muted-foreground mb-4">
            No goals created yet
          </p>
          <Button onClick={() => navigate("/goals/add")}>
            Create First Goal
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {goals.map((goal) => {
            const progress =
              goal.targetAmount > 0
                ? Math.min(
                    (goal.currentAmount / goal.targetAmount) * 100,
                    100
                  )
                : 0;

            return (
              <div
                key={goal._id}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="flex justify-between mb-2">
                  <h3 className="font-semibold">{goal.title}</h3>
                  {goal.deadline && (
                    <span className="flex items-center text-xs text-muted-foreground gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(goal.deadline).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>
                      ₹{goal.currentAmount.toLocaleString()} of ₹
                      {goal.targetAmount.toLocaleString()}
                    </span>
                    <span className="font-semibold">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <p className="text-xs text-muted-foreground">
                  Priority Score: <b>{goal.priority.toFixed(1)}</b>
                </p>
              </div>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
}
