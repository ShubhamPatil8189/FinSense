import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Bell, RefreshCw, AlertCircle, TrendingUp, Sparkles, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import api from "@/config/api";
export default function SmartNudges() {
const [nudges, setNudges] = useState([]);
const [loading, setLoading] = useState(false);
const { toast } = useToast();
useEffect(() => {
fetchNudges();
}, []);
const fetchNudges = async () => {
setLoading(true);
try {
const response = await api.get('/nudges/generate');
setNudges(response.data.nudges);
  if (response.data.nudges.length > 0) {
    toast({
      title: "Nudges Updated! 🔔",
      description: `${response.data.count} smart suggestions ready`,
    });
  }
} catch (error) {
  toast({
    title: "Failed to load nudges",
    description: "Please try again",
    variant: "destructive",
  });
} finally {
  setLoading(false);
}
};
const priorityConfig = {
high: { color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/50", icon: AlertCircle },
medium: { color: "text-primary", bg: "bg-primary/10", border: "border-primary/50", icon: Bell },
low: { color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/50", icon: CheckCircle }
};
const typeEmoji = {
warning: "⚠️",
suggestion: "💡",
insight: "🧠",
positive: "🎉"
};
return (
<DashboardLayout>
<div className="max-w-4xl mx-auto space-y-6">
    {/* Header */}
    <div className="text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
        <Bell className="w-10 h-10 text-primary" />
      </div>
      <h1 className="text-4xl font-bold">Smart Nudges</h1>
      <p className="text-muted-foreground mt-2 text-lg">
        AI-powered micro-decisions to improve your finances
      </p>
    </div>

    {/* Refresh Button */}
    <div className="flex justify-center">
      <Button onClick={fetchNudges} disabled={loading} size="lg" variant="outline">
        <RefreshCw className={`w-5 h-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
        {loading ? "Generating..." : "Refresh Nudges"}
      </Button>
    </div>

    {/* Nudges List */}
    {nudges.length === 0 ? (
      <div className="glass-card p-12 rounded-2xl text-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-2">No Nudges Yet</h3>
        <p className="text-muted-foreground mb-6">
          Add some expenses today to get personalized spending insights
        </p>
        <Button onClick={() => window.location.href = '/expenses/add'}>
          Add First Expense
        </Button>
      </div>
    ) : (
      <div className="space-y-4">
        {nudges.map((nudge, index) => {
          const config = priorityConfig[nudge.priority];
          const Icon = config.icon;
          
          return (
            <div 
              key={index}
              className={`glass-card p-6 rounded-2xl border-2 ${config.border} ${config.bg} animate-in slide-in-from-bottom duration-500`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-xl ${config.bg} border-2 ${config.border} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-7 h-7 ${config.color}`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{typeEmoji[nudge.type]}</span>
                    <span className={`text-xs font-bold uppercase px-2 py-1 rounded-full ${config.bg} ${config.color}`}>
                      {nudge.priority}
                    </span>
                    <span className="text-xs text-muted-foreground capitalize">
                      {nudge.type}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{nudge.message}</h3>
                  
                  <div className="flex items-start gap-2 mt-3 p-3 bg-secondary/50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm mb-1">Recommended Action</p>
                      <p className="text-sm text-muted-foreground">{nudge.action}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )}

    {/* Info Card */}
    <div className="glass-card p-6 rounded-xl border border-primary/20">
      <div className="flex items-start gap-3">
        <Sparkles className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
        <div>
          <h4 className="font-bold mb-2">How Smart Nudges Work</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Our AI analyzes your spending patterns in real-time to provide personalized micro-decisions. 
            These nudges help you make better financial choices throughout the day based on your habits, 
            goals, and emotional state.
          </p>
        </div>
      </div>
    </div>

  </div>
</DashboardLayout>
);
}