import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles, ScanLine, Check, Sparkle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Health",
  "Travel",
  "Education",
  "Other",
];

export default function AddExpense() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [repeatExpense, setRepeatExpense] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please login again.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:4000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: Number(amount),
          category,
          mood: "happy",
          description,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to add expense");
      }

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Add Expense">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Add New Expense
          </h1>
          <p className="text-muted-foreground">
            Enter the details of your latest spending or use AI to scan.
          </p>
        </div>

        {/* Smart Scan Banner */}
        <div className="bg-card border border-border rounded-xl p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Have a receipt?</p>
              <p className="text-sm text-muted-foreground">
                Let FinSense AI extract the details for you.
              </p>
            </div>
          </div>
          <Button variant="outline" className="gap-2">
            <ScanLine className="w-4 h-4" />
            Smart Scan
          </Button>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-xl p-6">
          {/* Amount */}
          <div className="mb-6">
            <label className="text-sm text-muted-foreground mb-2 block">
              Total Amount
            </label>
            <div className="flex items-center gap-2">
              <span className="text-4xl font-light text-muted-foreground">₹</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="text-4xl font-light bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/50 w-full"
              />
            </div>
            <div className="h-px bg-border mt-4" />
          </div>

          {/* Category & Date */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Category
              </label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-secondary border-border">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Date
              </label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-secondary border-border"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="text-sm text-muted-foreground mb-2 block">
              Description (Optional)
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Dinner with team at Social"
              className="bg-secondary border-border min-h-[100px] resize-none"
            />
          </div>

          {/* Repeat Toggle */}
          <div className="flex items-center justify-between py-4 border-t border-border">
            <div className="flex items-center gap-3">
              <Switch
                checked={repeatExpense}
                onCheckedChange={setRepeatExpense}
              />
              <span className="text-sm text-foreground">
                Repeat this expense?
              </span>
            </div>
            <button className="flex items-center gap-1.5 text-primary text-sm hover:underline">
              <Sparkle className="w-4 h-4" />
              Often repeating on the 5th?
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 mt-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-muted-foreground"
          >
            Cancel
          </Button>
          <Button onClick={handleSave} className="gap-2" disabled={loading}>
            <Check className="w-4 h-4" />
            {loading ? "Saving..." : "Save Expense"}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
