import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

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

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to add a goal");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:4000/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ REQUIRED
        },
        body: JSON.stringify({
          title: form.title,
          targetAmount: Number(form.targetAmount),
          deadline: form.deadline,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to add goal");
      }

      toast.success("Goal added successfully 🎯");
      navigate("/goals");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
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
