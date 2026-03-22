import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import api from "@/config/api";

export default function AddGoal() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    targetAmount: "",
    deadline: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await api.post("/goals", {
        title: form.title,
        targetAmount: Number(form.targetAmount),
        deadline: form.deadline,
      });

      toast.success("Goal added successfully 🎯");
      navigate("/goals");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to add goal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Add Goal" subtitle="Create a new financial goal">
      <div className="max-w-2xl mx-auto">
        <div className="bg-card border border-border rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Goal Title
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Buy New Laptop"
                className="input-field"
                required
              />
            </div>

            {/* Target Amount */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Target Amount
              </label>
              <input
                name="targetAmount"
                type="number"
                placeholder="80000"
                className="input-field"
                onChange={handleChange}
                required
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Deadline
              </label>
              <input
                name="deadline"
                type="date"
                className="input-field"
                onChange={handleChange}
                required
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/goals")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Goal"}
              </Button>
            </div>

          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
