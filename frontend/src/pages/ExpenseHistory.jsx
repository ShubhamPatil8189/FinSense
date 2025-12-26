import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  IndianRupee,
  TrendingDown,
  Smile,
  Receipt,
} from "lucide-react";
import { toast } from "sonner";

export default function ExpenseHistory() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH EXPENSE HISTORY ================= */
  useEffect(() => {
    const fetchExpenses = async () => {
      const token = localStorage.getItem("token");

      // ❌ No token → Test Case 15 requires auth
      if (!token) {
        toast.error("Please login to view expenses");
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(
          "http://localhost:4000/api/expenses/history",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // ❌ Token invalid / expired
        if (res.status === 401) {
          throw new Error("Session expired");
        }

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch expenses");
        }

        // ✅ Ensure newest first (safety)
        const sortedExpenses = (data.expenses || []).sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setExpenses(sortedExpenses);
      } catch (err) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [navigate]);

  /* ================= CALCULATIONS ================= */
  const totalExpenses = expenses.length;

  const totalSpent = expenses.reduce(
    (sum, e) => sum + Number(e.amount || 0),
    0
  );

  const avgExpense =
    totalExpenses > 0 ? Math.round(totalSpent / totalExpenses) : 0;

  return (
    <DashboardLayout
      title="Expense History"
      subtitle="Review and analyze your past spending"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
          <Receipt className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">Expense History</h2>
      </div>

      <p className="text-muted-foreground mb-8">
        Review and track all your past expenses in one place.
      </p>

      {/* ================= SUMMARY ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stat-card">
          <span className="text-sm text-muted-foreground">
            Total Expenses
          </span>
          <p className="text-2xl font-bold">{totalExpenses}</p>
        </div>

        <div className="stat-card">
          <span className="text-sm text-muted-foreground">
            Total Spent
          </span>
          <p className="text-2xl font-bold">
            ₹{totalSpent.toLocaleString()}
          </p>
        </div>

        <div className="stat-card bg-gradient-to-br from-destructive/10 to-card">
          <span className="text-sm text-muted-foreground">
            Avg Expense
          </span>
          <p className="text-2xl font-bold">
            ₹{avgExpense.toLocaleString()}
          </p>
        </div>
      </div>

      {/* ================= LIST ================= */}
      {loading ? (
        <p className="text-muted-foreground">Loading expenses...</p>
      ) : expenses.length === 0 ? (
        <div className="text-center py-16">
          <TrendingDown className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">
            No expenses recorded yet
          </p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 px-6 py-4 text-sm font-medium text-muted-foreground border-b">
            <span>Date</span>
            <span>Category</span>
            <span>Description</span>
            <span>Mood</span>
            <span className="text-right">Amount</span>
          </div>

          {/* Rows */}
          {expenses.map((e) => (
            <div
              key={e._id}
              className="grid grid-cols-5 gap-4 px-6 py-4 items-center border-b last:border-0 hover:bg-secondary/30 transition"
            >
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                {new Date(e.date).toLocaleDateString()}
              </div>

              <Badge variant="secondary">{e.category}</Badge>

              <span className="text-sm text-muted-foreground truncate">
                {e.description || "—"}
              </span>

              <span className="flex items-center gap-1 text-sm capitalize">
                <Smile className="w-4 h-4 text-primary" />
                {e.mood}
              </span>

              <span className="flex justify-end items-center gap-1 font-semibold">
                <IndianRupee className="w-4 h-4" />
                {e.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-end mt-6">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </DashboardLayout>
  );
}
