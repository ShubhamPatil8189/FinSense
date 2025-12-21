import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Share2, 
  History, 
  Utensils, 
  Clock, 
  CreditCard,
  TrendingUp,
  TriangleAlert,
  Calendar,
  Link2,
  PiggyBank,
  ArrowRight
} from "lucide-react";
import spendDnaVisual from "@/assets/spend-dna-visual.png";

const statsCards = [
  { 
    label: "DINING SPEND", 
    value: "25%", 
    subtext: "of Income",
    trend: "+5% vs Last Month",
    trendUp: true,
    icon: Utensils 
  },
  { 
    label: "PEAK TRANSACTION TIME", 
    value: "11:00 PM", 
    badge: "Late Night Spender",
    icon: Clock 
  },
  { 
    label: "SUBSCRIPTION COST", 
    value: "₹4,500", 
    subtext: "/mo",
    trend: "+15% vs Peers",
    trendUp: true,
    warning: true,
    icon: CreditCard 
  },
];

const tips = [
  {
    icon: Calendar,
    title: "Set Weekend Limits",
    description: "Enable a temporary transaction cap of ₹2,000 for Sat-Sun on your credit card."
  },
  {
    icon: Link2,
    title: "Unlink Quick Pay",
    description: "Remove saved cards from food delivery apps to introduce friction before impulse buys."
  },
  {
    icon: PiggyBank,
    title: 'The "Fun Fund"',
    description: "Auto-transfer 10% of your income to a separate account immediately on payday."
  }
];

export default function SpendDNA() {
  return (
    <DashboardLayout 
      title="Spend DNA Analysis" 
      subtitle="AI-powered behavioral insights"
    >
      {/* Profile Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="relative h-72">
            <img 
              src={spendDnaVisual} 
              alt="Spend DNA Visual" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4">
              <span className="text-xs font-semibold text-accent uppercase tracking-wider bg-accent/20 px-2 py-1 rounded">
                YOUR ARCHETYPE
              </span>
              <h2 className="text-2xl font-bold text-foreground mt-2">Weekend Warrior</h2>
              <p className="text-sm text-muted-foreground">Spender ID: #8821X</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-destructive" />
            <span className="text-sm font-semibold text-destructive uppercase tracking-wider">AI ANALYSIS COMPLETE</span>
          </div>
          
          <p className="text-foreground mb-6">
            You're disciplined during the week, but your spending spikes <span className="font-semibold">48 hours after payday</span>. Specifically, Saturday nights account for 35% of your total discretionary outflow.
          </p>

          <div className="flex items-center gap-3">
            <Button>
              <Share2 className="w-4 h-4 mr-2" />
              Share Profile
            </Button>
            <Button variant="outline">
              <History className="w-4 h-4 mr-2" />
              View History
            </Button>
          </div>
        </div>
      </div>

      {/* Deep Dive Analysis */}
      <div className="bg-card border border-border rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold">?</span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Deep Dive Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Based on your last 3 months of UPI transactions, our AI detected a pattern of high-frequency small purchases between <span className="font-semibold text-foreground">8 PM and 11 PM</span>. You spend <span className="text-destructive font-semibold">15% more</span> than the average freelancer in your bracket on digital subscriptions.
              </p>
            </div>
          </div>
          <Button variant="ghost" className="text-primary">
            View Full Report
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{stat.label}</span>
              <stat.icon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-2xl font-bold text-foreground">{stat.value}</span>
              {stat.subtext && <span className="text-sm text-muted-foreground">{stat.subtext}</span>}
            </div>
            {stat.trend && (
              <div className={`flex items-center gap-1 ${stat.warning ? 'text-destructive' : 'text-destructive'}`}>
                {stat.warning ? <TriangleAlert className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                <span className="text-xs">{stat.trend}</span>
              </div>
            )}
            {stat.badge && (
              <span className="inline-block mt-2 text-xs bg-secondary text-muted-foreground px-2 py-1 rounded-full">
                🌙 {stat.badge}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Smart Tips */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xl">💡</span>
          <h3 className="text-lg font-semibold text-foreground">Smart Tips for You</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <tip.icon className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">{tip.title}</h4>
              <p className="text-sm text-muted-foreground">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
