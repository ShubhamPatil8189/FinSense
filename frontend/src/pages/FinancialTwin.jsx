import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Cpu, TrendingUp, TrendingDown, AlertTriangle, DollarSign, Calendar, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import api from "@/config/api";

export default function FinancialTwin() {
  const [formData, setFormData] = useState({
    months: 6,
    newExpense: "",
    newIncome: "",
    scenario: ""
  });
  const [simulation, setSimulation] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const runSimulation = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/simulation/run', {
        months: formData.months,
        newExpense: parseInt(formData.newExpense) || 0,
        newIncome: parseInt(formData.newIncome) || 0,
        scenario: formData.scenario
      });
      setSimulation(response.data);
      
      toast({
        title: "Simulation Complete! 🔮",
        description: `Your ${formData.months}-month financial future predicted`,
      });
    } catch (error) {
      toast({
        title: "Simulation Failed",
        description: error.response?.data?.error || "Please add income and expenses first",
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
            <Cpu className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold">Financial Twin</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Simulate "what-if" scenarios for your financial future
          </p>
        </div>

        {/* Simulation Form */}
        <form onSubmit={runSimulation} className="glass-card p-8 rounded-2xl space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold mb-3">
                <Calendar className="w-4 h-4 text-primary" />
                Simulation Period
              </label>
              <select
                value={formData.months}
                onChange={(e) => setFormData({...formData, months: parseInt(e.target.value)})}
                className="input-field"
              >
                <option value={3}>3 Months</option>
                <option value={6}>6 Months</option>
                <option value={12}>12 Months</option>
                <option value={24}>24 Months</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold mb-3">
                <TrendingDown className="w-4 h-4 text-red-500" />
                New Monthly Expense
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                <input
                  type="number"
                  min="0"
                  value={formData.newExpense}
                  onChange={(e) => setFormData({...formData, newExpense: e.target.value})}
                  placeholder="5000"
                  className="input-field pl-8"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold mb-3">
                <TrendingUp className="w-4 h-4 text-green-500" />
                New Monthly Income
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                <input
                  type="number"
                  min="0"
                  value={formData.newIncome}
                  onChange={(e) => setFormData({...formData, newIncome: e.target.value})}
                  placeholder="10000"
                  className="input-field pl-8"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              Scenario Description
            </label>
            <textarea
              value={formData.scenario}
              onChange={(e) => setFormData({...formData, scenario: e.target.value})}
              placeholder="Example: What if I buy a new laptop for ₹50,000 and start a side hustle earning ₹15,000/month?"
              rows={4}
              className="input-field resize-none"
            />
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Cpu className="w-5 h-5 mr-2 animate-pulse" />
                Running Simulation...
              </>
            ) : (
              <>
                <Cpu className="w-5 h-5 mr-2" />
                Simulate Future
              </>
            )}
          </Button>
        </form>

        {/* Simulation Results */}
        {simulation && (
          <div className="space-y-6 animate-in fade-in duration-500">
            
            {/* Current Status */}
            <div className="glass-card p-8 rounded-2xl border-2 border-primary/20">
              <h3 className="text-2xl font-bold mb-6">📊 Current Financial Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <span className="text-muted-foreground text-sm font-medium block mb-2">Current Balance</span>
                  <p className="text-3xl font-bold text-primary">
                    ₹{simulation.simulation.currentBalance.toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground text-sm font-medium block mb-2">Avg Monthly Income</span>
                  <p className="text-3xl font-bold text-green-500">
                    ₹{simulation.simulation.avgMonthlyIncome.toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground text-sm font-medium block mb-2">Avg Monthly Expense</span>
                  <p className="text-3xl font-bold text-red-500">
                    ₹{simulation.simulation.avgMonthlyExpense.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Monthly Projections */}
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">📈 Month-by-Month Projections</h3>
              <div className="space-y-3">
                {simulation.simulation.projections.map((proj, index) => {
                  const isPositive = proj.balance > 0;
                  const isLast = index === simulation.simulation.projections.length - 1;
                  return (
                    <div 
                      key={proj.month} 
                      className={`p-5 rounded-xl transition ${
                        isLast 
                          ? 'bg-primary/10 border-2 border-primary' 
                          : 'bg-secondary/50 border border-border'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                            <span className="font-bold">{proj.month}</span>
                          </div>
                          <span className="font-semibold">Month {proj.month}</span>
                        </div>
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                          isPositive ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                        }`}>
                          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          <span className="text-sm font-medium">{proj.status}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Income</p>
                          <p className="text-lg font-bold text-green-500">
                            +₹{proj.income.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Expenses</p>
                          <p className="text-lg font-bold text-red-500">
                            -₹{proj.expenses.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Savings</p>
                          <p className={`text-lg font-bold ${proj.savings >= 0 ? 'text-primary' : 'text-red-500'}`}>
                            {proj.savings >= 0 ? '+' : ''}₹{proj.savings.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Balance</p>
                          <p className={`text-xl font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                            ₹{proj.balance.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Recommendation */}
            <div className={`glass-card p-8 rounded-2xl border-2 ${
              simulation.simulation.recommendation.includes('improves') 
                ? 'border-green-500/50 bg-green-500/5' 
                : 'border-red-500/50 bg-red-500/5'
            }`}>
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  simulation.simulation.recommendation.includes('improves')
                    ? 'bg-green-500/20'
                    : 'bg-red-500/20'
                }`}>
                  {simulation.simulation.recommendation.includes('improves') ? (
                    <TrendingUp className="w-7 h-7 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-7 h-7 text-red-500" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">Recommendation</h3>
                  <p className="text-lg text-foreground leading-relaxed mb-4">
                    {simulation.simulation.recommendation}
                  </p>
                  {simulation.aiAdvice && (
                    <>
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        <span className="font-semibold">AI Advice</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {simulation.aiAdvice}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
