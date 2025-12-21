import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  PiggyBank, 
  Mail, 
  AlertTriangle,
  Copy,
  ExternalLink
} from "lucide-react";

const summaryCards = [
  { 
    label: "POTENTIAL MONTHLY SAVINGS", 
    value: "₹2,499",
    trend: "+12% vs last month",
    trendUp: true,
    color: "primary",
    icon: PiggyBank
  },
  { 
    label: "UNUSED SUBSCRIPTIONS", 
    value: "4",
    subtext: "detected",
    status: "Needs attention immediately",
    statusColor: "warning",
    icon: Mail
  },
  { 
    label: "DUPLICATE CHARGES", 
    value: "2",
    subtext: "detected",
    status: "Review pending",
    statusColor: "primary",
    icon: Copy
  },
];

const subscriptions = [
  { 
    name: "Adobe Creative ...", 
    price: "₹4,230", 
    period: "/mo",
    lastUsed: "3 months ago",
    color: "bg-secondary"
  },
  { 
    name: "Cult.fit", 
    price: "₹1,500", 
    period: "/mo",
    lastUsed: "45 days ago",
    color: "bg-success"
  },
  { 
    name: "Disney+ Hotstar", 
    price: "₹899", 
    period: "/yr",
    lastUsed: "2 months ago",
    color: "bg-primary"
  },
];

const duplicatePayments = [
  { 
    merchant: "Spotify Premium", 
    date: "Nov 02, 2023",
    amount: "₹119.00",
    count: 2,
    status: "Duplicate"
  },
  { 
    merchant: "Uber Ride", 
    date: "Oct 28, 2023",
    amount: "₹342.50",
    count: 2,
    status: "Duplicate"
  },
];

export default function Optimization() {
  return (
    <DashboardLayout 
      title="Wasted Money Optimization" 
      subtitle="AI-powered insights to save you money"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-foreground">Optimization Insights</h2>
        <span className="badge-success flex items-center gap-1.5 px-3 py-1.5">
          <Sparkles className="w-3 h-3" />
          AI Analysis Complete
        </span>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {summaryCards.map((card, index) => (
          <div 
            key={index} 
            className={`stat-card ${index === 0 ? 'bg-gradient-to-br from-primary/20 to-card' : ''}`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{card.label}</span>
              <card.icon className={`w-5 h-5 ${index === 0 ? 'text-primary' : 'text-muted-foreground'}`} />
            </div>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-2xl font-bold text-foreground">{card.value}</span>
              {card.subtext && <span className="text-lg text-muted-foreground">{card.subtext}</span>}
            </div>
            {card.trend && (
              <span className="text-sm text-success">{card.trend}</span>
            )}
            {card.status && (
              <span className={`text-sm ${card.statusColor === 'warning' ? 'text-warning' : 'text-primary'}`}>
                {card.status}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Unused Subscriptions */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <AlertTriangle className="w-5 h-5 text-destructive" />
          <h3 className="text-lg font-semibold text-foreground">Unused Subscriptions</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subscriptions.map((sub, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${sub.color} flex items-center justify-center`}>
                    <span className="text-foreground font-bold">{sub.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{sub.name}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <span className="w-2 h-2 bg-destructive rounded-full" />
                      Last used: <span className="text-destructive">{sub.lastUsed}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">
                    {sub.price}<span className="text-sm text-muted-foreground">{sub.period}</span>
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="destructive" size="sm" className="flex-1">Cancel</Button>
                <Button variant="secondary" size="sm" className="flex-1">Keep</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Duplicate Payments */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Copy className="w-5 h-5 text-warning" />
            <h3 className="text-lg font-semibold text-foreground">Duplicate Payments</h3>
          </div>
          <button className="text-sm text-primary hover:underline">View All Transactions</button>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider p-4">Merchant</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider p-4">Date</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider p-4">Amount</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider p-4">Status</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {duplicatePayments.map((payment, index) => (
                <tr key={index} className="border-b border-border last:border-b-0">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${payment.merchant.includes('Spotify') ? 'bg-success' : 'bg-secondary'} text-foreground text-sm font-bold`}>
                        {payment.merchant.charAt(0)}
                      </div>
                      <span className="text-foreground">{payment.merchant}</span>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{payment.date}</td>
                  <td className="p-4 text-destructive">
                    {payment.amount} <span className="text-muted-foreground">(x{payment.count})</span>
                  </td>
                  <td className="p-4">
                    <span className="badge-warning">{payment.status}</span>
                  </td>
                  <td className="p-4">
                    <button className="text-sm text-foreground hover:text-primary transition-colors">
                      Dispute Charge
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
