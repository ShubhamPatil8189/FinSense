import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  PiggyBank, 
  Mail, 
  AlertTriangle,
  Copy,
  ExternalLink,
  Loader2,
  ArrowUpRight
} from "lucide-react";
import api from "@/config/api";
import { useToast } from "@/components/ui/use-toast";

export default function Optimization() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchOptimization = async () => {
      try {
        const response = await api.get('/waste/detect');
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch optimization data", error);
        toast({
          title: "Analysis Failed",
          description: "Could not load AI waste analysis.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchOptimization();
  }, [toast]);

  if (loading) {
    return (
      <DashboardLayout title="Wasted Money Optimization" subtitle="AI-powered insights to save you money">
        <div className="flex h-[60vh] flex-col items-center justify-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="text-muted-foreground animate-pulse">Running AI analysis on your spending DNA...</p>
        </div>
      </DashboardLayout>
    );
  }

  const { summary, details } = data || {};
  const subs = details?.unusedSubscriptions || [];
  const dups = details?.duplicateSpending || [];

  const summaryCards = [
    { 
      label: "POTENTIAL MONTHLY SAVINGS", 
      value: `₹${(summary?.totalPotentialSavings || 0).toLocaleString()}`,
      trend: "+AI insight applied",
      trendUp: true,
      color: "primary",
      icon: PiggyBank
    },
    { 
      label: "UNUSED SUBSCRIPTIONS", 
      value: summary?.unusedSubscriptionsCount?.toString() || "0",
      subtext: "detected",
      status: summary?.unusedSubscriptionsCount > 0 ? "Needs attention immediately" : "All good",
      statusColor: summary?.unusedSubscriptionsCount > 0 ? "warning" : "primary",
      icon: Mail
    },
    { 
      label: "DUPLICATE CHARGES", 
      value: summary?.duplicateSpendingCount?.toString() || "0",
      subtext: "detected",
      status: summary?.duplicateSpendingCount > 0 ? "Review pending" : "No duplicates",
      statusColor: "primary",
      icon: Copy
    },
  ];

  return (
    <DashboardLayout 
      title="Wasted Money Optimization" 
      subtitle="AI-powered insights to save you money"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-3xl font-bold text-foreground">Optimization Insights</h2>
        <span className="badge-success flex items-center justify-center gap-1.5 px-3 py-1.5">
          <Sparkles className="w-3 h-3" />
          AI Analysis Complete
        </span>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {summaryCards.map((card, index) => (
          <div 
            key={index} 
            className={`stat-card ${index === 0 ? 'bg-gradient-to-br from-primary/20 to-card border-primary/20' : ''}`}
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
              <span className={`text-sm mt-1 block ${card.statusColor === 'warning' ? 'text-warning' : 'text-primary'}`}>
                {card.status}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Unused Subscriptions */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <AlertTriangle className={subs.length > 0 ? "w-5 h-5 text-destructive" : "w-5 h-5 text-success"} />
          <h3 className="text-lg font-semibold text-foreground">
            {subs.length > 0 ? "Unused Subscriptions" : "No Unused Subscriptions Found!"}
          </h3>
        </div>
        
        {subs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subs.map((sub, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                      <span className="text-foreground font-bold">
                        {(sub.name || sub.merchant || "S").charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="truncate">
                      <p className="font-medium text-foreground truncate">{sub.name || sub.merchant}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span className="w-2 h-2 bg-destructive rounded-full" />
                        Inferred inactive
                      </div>
                    </div>
                  </div>
                  <div className="text-right pl-2">
                    <p className="font-semibold text-foreground whitespace-nowrap">
                      ₹{sub.amount}
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
        )}
      </div>

      {/* Duplicate Payments */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Copy className={dups.length > 0 ? "w-5 h-5 text-warning" : "w-5 h-5 text-success"} />
            <h3 className="text-lg font-semibold text-foreground">
              {dups.length > 0 ? "Duplicate Payments" : "No Duplicate Charges"}
            </h3>
          </div>
        </div>

        {dups.length > 0 && (
          <div className="bg-card border border-border rounded-xl overflow-hidden overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-border bg-sidebar">
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider p-4">Merchant</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider p-4">Amount</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider p-4">Multiplier</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider p-4">Status</th>
                  <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {dups.map((payment, index) => (
                  <tr key={index} className="border-b border-border last:border-b-0">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-secondary text-foreground text-sm font-bold">
                          {(payment.merchant || "M").charAt(0).toUpperCase()}
                        </div>
                        <span className="text-foreground font-medium">{payment.merchant}</span>
                      </div>
                    </td>
                    <td className="p-4 text-destructive font-medium">
                      ₹{payment.amount}
                    </td>
                    <td className="p-4 text-muted-foreground">
                      x{payment.count}
                    </td>
                    <td className="p-4">
                      <span className="badge-warning">Duplicate Detected</span>
                    </td>
                    <td className="p-4">
                      <button className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1">
                        Dispute <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
