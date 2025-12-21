import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Dna, Sparkles, TrendingUp, Heart, ShoppingBag, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import api from "@/config/api";
export default function SpendDNA() {
const [analysis, setAnalysis] = useState(null);
const [loading, setLoading] = useState(false);
const { toast } = useToast();
const analyzeSpendDNA = async () => {
setLoading(true);
try {
const response = await api.get('/spend-dna/analyze');
setAnalysis(response.data);
  toast({
    title: "Analysis Complete! 🧬",
    description: `You're a ${response.data.personalityType}!`,
  });
} catch (error) {
  toast({
    title: "Analysis Failed",
    description: error.response?.data?.error || "Need at least 10 expenses",
    variant: "destructive",
  });
} finally {
  setLoading(false);
}
};
const personalityColors = {
"Big Spender": { bg: "bg-purple-500/10", text: "text-purple-500", border: "border-purple-500/50" },
"Frequent Buyer": { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/50" },
"Emotional Spender": { bg: "bg-red-500/10", text: "text-red-500", border: "border-red-500/50" },
"Frugal Saver": { bg: "bg-green-500/10", text: "text-green-500", border: "border-green-500/50" },
"Balanced": { bg: "bg-primary/10", text: "text-primary", border: "border-primary/50" }
};
return (
<DashboardLayout>
<div className="max-w-5xl mx-auto space-y-6">
    {/* Header */}
    <div className="text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
        <Dna className="w-10 h-10 text-primary" />
      </div>
      <h1 className="text-4xl font-bold">Spend DNA Analysis</h1>
      <p className="text-muted-foreground mt-2 text-lg">
        Discover your unique financial personality
      </p>
    </div>

    {/* Analyze Button */}
    {!analysis && (
      <div className="glass-card p-12 rounded-2xl text-center">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 animate-pulse">
          <Dna className="w-12 h-12 text-primary" />
        </div>
        <h3 className="text-2xl font-bold mb-3">Ready to discover your Spend DNA?</h3>
        <p className="text-muted-foreground mb-8 text-lg max-w-md mx-auto">
          Our AI will analyze your spending patterns to reveal your financial personality type
        </p>
        <Button onClick={analyzeSpendDNA} size="lg" disabled={loading} className="px-8">
          {loading ? (
            <>
              <Sparkles className="w-5 h-5 mr-2 animate-spin" />
              Analyzing Your DNA...
            </>
          ) : (
            <>
              <Dna className="w-5 h-5 mr-2" />
              Analyze My Spend DNA
            </>
          )}
        </Button>
      </div>
    )}

    {/* Analysis Results */}
    {analysis && (
      <div className="space-y-6 animate-in fade-in duration-500">
        
        {/* Personality Type */}
        <div className={`glass-card p-10 rounded-2xl border-2 ${personalityColors[analysis.personalityType].border} ${personalityColors[analysis.personalityType].bg}`}>
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Dna className="w-10 h-10 text-primary" />
            </div>
            <span className="text-sm font-bold uppercase text-muted-foreground">Your Financial Personality</span>
            <h2 className={`text-4xl font-bold mt-2 ${personalityColors[analysis.personalityType].text}`}>
              {analysis.personalityType}
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {analysis.traits.map((trait, index) => (
              <div key={index} className="p-4 bg-secondary/30 rounded-xl text-center border border-border">
                <span className="text-2xl mb-2 block">✨</span>
                <p className="font-medium text-sm">{trait}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="stat-card">
            <ShoppingBag className="w-6 h-6 text-primary mb-2" />
            <span className="text-muted-foreground text-sm block">Total Expenses</span>
            <h3 className="text-2xl font-bold">{analysis.statistics.totalExpenses}</h3>
          </div>

          <div className="stat-card">
            <span className="text-2xl mb-2 block">💰</span>
            <span className="text-muted-foreground text-sm block">Total Spent</span>
            <h3 className="text-2xl font-bold">₹{analysis.statistics.totalSpending.toLocaleString()}</h3>
          </div>

          <div className="stat-card">
            <TrendingUp className="w-6 h-6 text-primary mb-2" />
            <span className="text-muted-foreground text-sm block">Average</span>
            <h3 className="text-2xl font-bold">₹{analysis.statistics.avgExpense}</h3>
          </div>

          <div className="stat-card">
            <Calendar className="w-6 h-6 text-primary mb-2" />
            <span className="text-muted-foreground text-sm block">Frequency</span>
            <h3 className="text-2xl font-bold">{analysis.statistics.frequency}/day</h3>
          </div>
        </div>

        {/* Category Preferences */}
        <div className="glass-card p-8 rounded-2xl">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-primary" />
            Your Top Categories
          </h3>
          <div className="space-y-3">
            {analysis.categoryPreferences.map((cat, index) => (
              <div key={cat.category} className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center font-bold">
                    #{index + 1}
                  </div>
                  <p className="font-semibold text-lg">{cat.category}</p>
                </div>
                <p className="text-2xl font-bold text-primary">{cat.count} times</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mood Influence */}
        <div className="glass-card p-8 rounded-2xl">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary" />
            Emotional Influence
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {analysis.moodInfluence.map((mood) => (
              <div key={mood.mood} className="p-5 bg-secondary/30 rounded-xl border border-border">
                <p className="font-medium capitalize mb-2">{mood.mood}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-primary">{mood.percentage}%</p>
                  <span className="text-xs text-muted-foreground">({mood.count} times)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="glass-card p-8 rounded-2xl border-2 border-primary/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">Personalized AI Insights</h3>
          </div>
          <div className="prose prose-invert max-w-none">
            <p className="text-foreground text-lg leading-relaxed whitespace-pre-wrap">
              {analysis.aiInsights}
            </p>
          </div>
        </div>

        {/* Re-analyze Button */}
        <div className="flex justify-center pt-4">
          <Button onClick={analyzeSpendDNA} variant="outline" size="lg" disabled={loading}>
            <Dna className="w-5 h-5 mr-2" />
            Re-analyze Spend DNA
          </Button>
        </div>

      </div>
    )}

  </div>
</DashboardLayout>
);
}