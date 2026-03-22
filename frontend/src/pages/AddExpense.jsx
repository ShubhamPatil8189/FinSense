import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check } from "lucide-react";
import api from "@/config/api";

const categories = [
  "Food",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Health",
  "Travel",
  "Education",
  "Other",
];

const moods = ["happy", "sad", "stressed", "neutral", "excited"];

export default function AddExpense() {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [mood, setMood] = useState("neutral");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  /* ---------------- SAVE EXPENSE ---------------- */
  const handleSave = async () => {
    if (!amount || !category) {
      toast.error("Amount and Category are required");
      return;
    }

    try {
      setLoading(true);
      await api.post("/expenses", {
        amount: Number(amount),
        category,
        mood,
        description,
      });

      toast.success("Expense added successfully 💸");
      navigate("/dashboard");

    } catch (error) {
      toast.error(error.response?.data?.error || "Error adding expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Add Expense">
      <div className="max-w-3xl mx-auto">

        {/* Amount */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <label className="text-sm text-muted-foreground mb-2 block">
            Amount
          </label>
          <div className="flex items-center gap-2">
            <span className="text-3xl text-muted-foreground">₹</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="text-3xl bg-transparent outline-none w-full text-foreground"
            />
          </div>
        </div>

        {/* Category */}
        <div className="mb-6">
          <label className="text-sm text-muted-foreground mb-2 block">
            Category
          </label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="bg-secondary border-border">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-black text-white border border-border">
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Mood */}
        <div className="mb-6">
          <label className="text-sm text-muted-foreground mb-2 block">
            Mood
          </label>
          <Select value={mood} onValueChange={setMood}>
            <SelectTrigger className="bg-secondary border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-black text-white border border-border">
              {moods.map((m) => (
                <SelectItem key={m} value={m}>
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="text-sm text-muted-foreground mb-2 block">
            Description (Optional)
          </label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Lunch at restaurant"
            className="bg-secondary border-border"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            <Check className="w-4 h-4 mr-2" />
            {loading ? "Saving..." : "Save Expense"}
          </Button>
        </div>

      </div>
    </DashboardLayout>
  );
}
