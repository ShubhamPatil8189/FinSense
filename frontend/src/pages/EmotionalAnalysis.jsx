import { useState } from "react";
import {DashboardLayout} from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Sparkles,
  Smile,
  Frown,
  Meh,
  Heart,
  Zap,
  TrendingDown
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import api from "@/config/api";

export default function EmotionAnalysis() {
  const [mood, setMood] = useState("neutral");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const moods = [
    { value: "happy", label: "Happy", icon: Smile, color: "text-green-500", bg: "bg-green-500/10" },
    { value: "sad", label: "Sad", icon: Frown, color: "text-blue-500", bg: "bg-blue-500/10" },
    { value: "stressed", label: "Stressed", icon: Zap, color: "text-red-500", bg: "bg-red-500/10" },
    { value: "neutral", label: "Neutral", icon: Meh, color: "text-muted-foreground", bg: "bg-muted" },
    { value: "excited", label: "Excited", icon: Heart, color: "text-pink-500", bg: "bg-pink-500/10" }
  ];

  // 🔒 FRONTEND-ONLY SAFE NORMALIZATION
  const analyzeEmotions = async () => {
    setLoading(true);
    try {
      const response = await api.post("/emotion/analyze", { mood });
      const apiData = response.data?.data || {};

      setAnalysis({
        data: {
          totalExpenses: apiData.totalExpenses ?? 0,
          totalSpending: apiData.totalSpending ?? 0,
          avgPerExpense: apiData.avgPerExpense ?? 0,
          topEmotionalTriggers: apiData.topEmotionalTriggers ?? [],
          moodBreakdown: apiData.moodBreakdown ?? {},
          aiInsight: apiData.aiInsight ?? "No emotional insights available yet."
        }
      });

      toast({
        title: "Analysis Complete 🧠",
        description: "Your emotional spending patterns were analyzed",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description:
          error.response?.data?.error ||
          "Not enough data. Add more expenses!",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Brain className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold">Emotion Analysis</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Understand how your emotions influence spending
          </p>
        </div>

        {/* Mood Selector */}
        <div className="glass-card p-8 rounded-2xl">
          <label className="block text-lg font-semibold mb-6 text-center">
            How are you feeling right now?
          </label>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {moods.map(({ value, label, icon: Icon, color, bg }) => (
              <button
                key={value}
                onClick={() => setMood(value)}
                className={`p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                  mood === value
                    ? "border-primary bg-primary/10 shadow-lg"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-xl ${
                    mood === value ? "bg-primary/20" : bg
                  } flex items-center justify-center mx-auto mb-3`}
                >
                  <Icon
                    className={`w-8 h-8 ${
                      mood === value ? "text-primary" : color
                    }`}
                  />
                </div>
                <p className={`font-medium ${mood === value ? "text-primary" : ""}`}>
                  {label}
                </p>
              </button>
            ))}
          </div>

          <Button
            onClick={analyzeEmotions}
            className="w-full mt-8"
            size="lg"
            disabled={loading}
          >
            {loading ? (
              <>
                <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                Analyzing Your Patterns...
              </>
            ) : (
              <>
                <Brain className="w-5 h-5 mr-2" />
                Analyze My Spending
              </>
            )}
          </Button>
        </div>

        {/* Results */}
        {analysis?.data && (
          <div className="space-y-6 animate-in fade-in duration-500">

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="stat-card">
                <span className="text-sm text-muted-foreground">Total Transactions</span>
                <h3 className="text-3xl font-bold">{analysis.data.totalExpenses}</h3>
              </div>

              <div className="stat-card">
                <span className="text-sm text-muted-foreground">Total Spent</span>
                <h3 className="text-3xl font-bold">
                  ₹{analysis.data.totalSpending.toLocaleString()}
                </h3>
              </div>

              <div className="stat-card">
                <span className="text-sm text-muted-foreground">Average Expense</span>
                <h3 className="text-3xl font-bold">
                  ₹{analysis.data.avgPerExpense.toLocaleString()}
                </h3>
              </div>
            </div>

            {/* AI Insight */}
            <div className="glass-card p-8 rounded-2xl border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold">AI Insight</h3>
              </div>
              <p className="whitespace-pre-wrap leading-relaxed">
                {analysis.data.aiInsight}
              </p>
            </div>

            {/* Empty State */}
            {analysis.data.totalExpenses === 0 && (
              <p className="text-center text-muted-foreground">
                Add expenses to unlock deeper emotional insights.
              </p>
            )}

          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
