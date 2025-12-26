import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Calendar,
  IndianRupee,
  PlusCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function IncomeDetails() {
  const navigate = useNavigate();

  const [incomes, setIncomes] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH INCOME DETAILS ================= */
  useEffect(() => {
    const fetchIncome = async () => {
      const token = localStorage.getItem("token");

      // ❌ No token → cannot access
      if (!token) {
        toast.error("Please login to view income details");
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(
          "http://localhost:4000/api/income/details",
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ REQUIRED
            },
          }
        );

        if (res.status === 401) {
          throw new Error("Session expired");
        }

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch income");
        }

        // ✅ Ensure sorted by date (newest first)
        const sortedIncomes = (data.incomes || []).sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setIncomes(sortedIncomes);

        // ✅ Prefer backend-calculated total
        setTotalIncome(data.totalIncome ?? 0);
      } catch (err) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchIncome();
  }, [navigate]);

  return (
    <DashboardLayout
      title="Income Details"
      subtitle="Overview of your earnings"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-success" />
        </div>
        <h2 className="text-2xl font-bold">Income Details</h2>
      </div>

      <p className="text-muted-foreground mb-8">
        Track all your income sources and total earnings in one place.
      </p>

      {/* ================= ADD INCOME BUTTON ================= */}
      <div className="flex justify-end mb-6">
        <Button
          onClick={() => navigate("/income/add")}
          className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white"
        >
          <PlusCircle className="w-4 h-4" />
          Add Income
        </Button>
      </div>

      {/* ================= SUMMARY ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stat-card">
          <span className="text-sm text-muted-foreground">
            Income Entries
          </span>
          <p className="text-2xl font-bold">{incomes.length}</p>
        </div>

        <div className="stat-card bg-gradient-to-br from-success/10 to-card">
          <span className="text-sm text-muted-foreground">
            Total Income
          </span>
          <p className="text-2xl font-bold">
            ₹{totalIncome.toLocaleString()}
          </p>
        </div>
      </div>

      {/* ================= LIST ================= */}
      {loading ? (
        <p className="text-muted-foreground">Loading income...</p>
      ) : incomes.length === 0 ? (
        <div className="text-center py-12">
          <TrendingUp className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">
            No income records found
          </p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-4 px-6 py-4 border-b text-sm font-medium text-muted-foreground">
            <span>Date</span>
            <span>Source</span>
            <span>Status</span>
            <span className="text-right">Amount</span>
          </div>

          {/* Rows */}
          {incomes.map((inc) => (
            <div
              key={inc._id}
              className="grid grid-cols-4 px-6 py-4 border-b last:border-0 hover:bg-secondary/30 transition"
            >
              <span className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                {new Date(inc.date).toLocaleDateString()}
              </span>

              <span className="font-medium">{inc.source}</span>

              <Badge variant="success">Received</Badge>

              <span className="flex justify-end items-center gap-1 font-semibold">
                <IndianRupee className="w-4 h-4" />
                {inc.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
