import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Utensils, 
  Fuel, 
  Monitor,
  Clock,
  CheckCircle,
  XCircle,
  Bell,
  PlusCircle
} from "lucide-react";
import { Link } from "react-router-dom";
const nudges = [
  {
    id: 1,
    type: "challenge",
    icon: Utensils,
    iconBg: "bg-destructive/20",
    iconColor: "text-destructive",
    title: "Skip ordering food today",
    description: "Zomato frequency is up 20% this week. You've ordered 3 times already. Cooking dinner tonight helps you stay within your monthly food budget.",
    savings: 800,
    actions: ["Accept Challenge", "Remind Later"],
    highlight: true
  },
  {
    id: 2,
    type: "alert",
    icon: Fuel,
    iconBg: "bg-warning/20",
    iconColor: "text-warning",
    title: "Petrol expense increased by 12%",
    description: "You spent ₹4,200 on fuel this week, which is higher than your average of ₹3,700. Consider carpooling or using public transport for the next 2 days.",
    time: "2 hours ago",
    actions: ["View Details", "Dismiss"]
  },
  {
    id: 3,
    type: "subscription",
    icon: Monitor,
    title: "Netflix Subscription Renewal",
    description: "Your Premium Plan (₹649) renews in 2 days. You watched only 2 hours last month.",
    hasKeepCancel: true
  },
  {
    id: 4,
    type: "insight",
    icon: Sparkles,
    title: "Weekend overspending detected",
    description: "You tend to spend 40% of your weekly budget on Saturdays. We suggest setting a temporary limit of ₹2,000 for this Saturday.",
    action: "Set Temporary Limit"
  }
];

export default function Nudges() {
  return (
    <DashboardLayout 
      title="Micro-Decision Nudges" 
      subtitle=""
      headerAction={
        <Link to="/add-expense">
          <Button>
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Expense
        </Button>
        </Link>
      }
    >
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-2xl font-bold text-foreground">Micro-Decision Nudges</h2>
        <span className="badge-primary">AI POWERED</span>
      </div>

      {/* Weekly Savings Chart Placeholder */}
      <div className="bg-card border border-border rounded-xl p-6 mb-8">
        <p className="text-sm text-muted-foreground mb-4">Weekly Savings Potential</p>
        <div className="h-16 bg-secondary/50 rounded-lg flex items-end gap-4 px-4">
          <div className="w-16 h-8 bg-muted rounded-t" />
          <div className="w-16 h-12 bg-muted rounded-t" />
          <div className="w-16 h-6 bg-muted rounded-t" />
          <div className="w-16 h-10 bg-muted rounded-t" />
          <div className="w-16 h-14 bg-muted rounded-t" />
        </div>
      </div>

      {/* Nudges List */}
      <div className="space-y-4">
        {nudges.map((nudge) => (
          <div 
            key={nudge.id} 
            className={`bg-card border rounded-xl p-6 transition-all ${
              nudge.highlight ? 'border-l-4 border-l-primary border-t border-r border-b border-border' : 'border-border'
            }`}
          >
            {nudge.type === "challenge" && (
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${nudge.iconBg} flex items-center justify-center`}>
                    <nudge.icon className={`w-6 h-6 ${nudge.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground">{nudge.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{nudge.description}</p>
                    <div className="flex items-center gap-3">
                      <Button size="sm">Accept Challenge</Button>
                      <Button variant="secondary" size="sm">
                        <Clock className="w-4 h-4 mr-1" />
                        Remind Later
                      </Button>
                      <button className="text-sm text-muted-foreground hover:text-foreground">Ignore</button>
                    </div>
                  </div>
                </div>
                <span className="badge-success flex items-center gap-1 whitespace-nowrap">
                  💰 SAVE ₹{nudge.savings}
                </span>
              </div>
            )}

            {nudge.type === "alert" && (
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl ${nudge.iconBg} flex items-center justify-center`}>
                  <nudge.icon className={`w-6 h-6 ${nudge.iconColor}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{nudge.title}</h3>
                    <span className="text-xs text-muted-foreground">{nudge.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{nudge.description}</p>
                  <div className="flex items-center gap-3">
                    <Button variant="secondary" size="sm">View Details</Button>
                    <button className="text-sm text-muted-foreground hover:text-foreground">Dismiss</button>
                  </div>
                </div>
                <div className="w-24 h-16 bg-gradient-to-r from-warning/20 to-transparent rounded-lg" />
              </div>
            )}

            {nudge.type === "subscription" && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-destructive flex items-center justify-center text-primary-foreground font-bold text-lg">
                    N
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{nudge.title}</h3>
                    <p className="text-sm text-muted-foreground">{nudge.description}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm">Keep</Button>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {nudge.type === "insight" && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-destructive" />
                  <span className="text-xs font-semibold text-destructive uppercase tracking-wider">SMART INVESTMENT INSIGHT</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{nudge.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{nudge.description}</p>
                <Button variant="outline" className="w-full">
                  <Bell className="w-4 h-4 mr-2" />
                  {nudge.action}
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
