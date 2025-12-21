import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from ".././components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  Receipt,
  Calendar,
  Tag,
  CreditCard,
  Wallet,
  Utensils,
  Car,
  ShoppingBag,
  Home,
  Gamepad2,
  Heart,
  Plane,
  GraduationCap,
  MoreHorizontal,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

const categories = [
  { id: "food", label: "Food & Dining", icon: Utensils, color: "bg-chart-orange" },
  { id: "transport", label: "Transport", icon: Car, color: "bg-chart-blue" },
  { id: "shopping", label: "Shopping", icon: ShoppingBag, color: "bg-chart-red" },
  { id: "rent", label: "Rent & Bills", icon: Home, color: "bg-primary" },
  { id: "entertainment", label: "Entertainment", icon: Gamepad2, color: "bg-accent" },
  { id: "health", label: "Health", icon: Heart, color: "bg-success" },
  { id: "travel", label: "Travel", icon: Plane, color: "bg-warning" },
  { id: "education", label: "Education", icon: GraduationCap, color: "bg-chart-blue" },
  { id: "other", label: "Other", icon: MoreHorizontal, color: "bg-muted" },
];

const paymentMethods = [
  { id: "upi", label: "UPI", icon: Wallet },
  { id: "credit", label: "Credit Card", icon: CreditCard },
  { id: "debit", label: "Debit Card", icon: CreditCard },
  { id: "cash", label: "Cash", icon: Receipt },
];

export default function AddExpense() {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("food"); // ✅ default
  const [selectedPayment, setSelectedPayment] = useState("upi");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const expense = {
      amount,
      description,
      category: selectedCategory,
      payment: selectedPayment,
      date,
    };

    console.log("Expense Added:", expense);

    // ✅ reset form
    setAmount("");
    setDescription("");
    setSelectedCategory("food");
    setSelectedPayment("upi");

    // ✅ redirect (same feeling as before)
    navigate("/dashboard");
  };

  return (
    <DashboardLayout title="Add Expense" subtitle="Track your spending in real-time">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left */}
        <div className="lg:col-span-2 space-y-6">
          {/* Amount */}
          <div className="bg-card border border-border rounded-xl p-6">
            <label className="block text-sm font-medium mb-4">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="w-full text-4xl font-bold bg-transparent focus:outline-none"
              required
            />
          </div>

          {/* Category */}
          <div className="bg-card border border-border rounded-xl p-6">
            <label className="block text-sm font-medium mb-4">
              <Tag className="inline w-4 h-4 mr-2" />
              Category
            </label>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-4 rounded-xl border ${
                    selectedCategory === cat.id
                      ? "border-primary bg-primary/10"
                      : "border-border"
                  }`}
                >
                  <cat.icon className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <Button type="submit" size="lg" className="w-full">
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Expense
          </Button>
        </div>

        {/* Right (unchanged UI blocks) */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-primary/20 to-card p-6 rounded-xl">
            <Sparkles className="w-5 h-5 text-primary mb-2" />
            <p className="text-sm">
              You’ve spent <b>₹2,340</b> on food this week.
            </p>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 mr-1" />
              Consider cooking at home
            </div>
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
}
