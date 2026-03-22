import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import api from "@/config/api";

export default function AddIncome() {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= ADD INCOME ================= */
  const handleSave = async () => {
    if (!amount || !source) {
      toast.error("Amount and source are required");
      return;
    }

    try {
      setLoading(true);
      await api.post("/income", {
        amount: Number(amount),
        source,
      });

      toast.success("Income added successfully 💰");
      navigate("/income");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to add income");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Add Income" subtitle="Record a new income source">
      <div className="max-w-2xl mx-auto bg-card border border-border rounded-xl p-6">

        {/* Amount */}
        <div className="mb-6">
          <label className="text-sm text-muted-foreground mb-2 block">
            Amount
          </label>
          <Input
            type="number"
            placeholder="Enter income amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* Source */}
        <div className="mb-6">
          <label className="text-sm text-muted-foreground mb-2 block">
            Income Source
          </label>
          <Input
            placeholder="e.g. Salary, Freelancing, Business"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            <Check className="w-4 h-4 mr-2" />
            {loading ? "Saving..." : "Save Income"}
          </Button>
        </div>

      </div>
    </DashboardLayout>
  );
}
