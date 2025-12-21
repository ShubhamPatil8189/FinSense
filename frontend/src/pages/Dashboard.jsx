import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  CircleDollarSign,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Car,
  Utensils,
  Building,
  ShoppingBag,
  Lock,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

const stats = [
  { label: "Total Balance", value: "₹1,24,500", change: "+12%", positive: true, icon: Wallet },
  { label: "Monthly Income", value: "₹85,000", change: "Same as last month", neutral: true, icon: CircleDollarSign },
  { label: "Monthly Expenses", value: "₹42,000", change: "-5% (Good)", positive: true, icon: BarChart3 },
];

const spendingData = [
  { name: "Rent", value: 40, color: "hsl(225, 73%, 57%)" },
  { name: "Food", value: 30, color: "hsl(142, 71%, 45%)" },
  { name: "Fun", value: 15, color: "hsl(45, 93%, 47%)" },
  { name: "Others", value: 15, color: "hsl(0, 72%, 51%)" },
];

const trendData = [
  { day: "Mon", amount: 5000 },
  { day: "Tue", amount: 3000 },
  { day: "Wed", amount: 4500 },
  { day: "Thu", amount: 6000 },
  { day: "Fri", amount: 8000 },
  { day: "Sat", amount: 4000 },
  { day: "Sun", amount: 3500 },
];

const transactions = [
  { icon: Car, name: "Uber Ride", category: "Transport", time: "2m ago", amount: -450 },
  { icon: Utensils, name: "Swiggy", category: "Food", time: "4h ago", amount: -320 },
  { icon: Building, name: "Salary Credit", category: "Income", time: "Yesterday", amount: 85000 },
  { icon: ShoppingBag, name: "Amazon", category: "Shopping", time: "2d ago", amount: -1299 },
];

const predictions = [
  { title: "Rent Due", description: "Due in 3 days (₹15,000)", status: "warning" },
  { title: "Festival Shopping", description: "Projected Spike (Diwali)", status: "info" },
  { title: "Freelance Payment", description: "Expected Nov 12th", status: "success" },
];

export default function Dashboard() {
  return (
    <DashboardLayout title="Dashboard" subtitle="Welcome back to your financial control center">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <stat.icon className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
            <div className="flex items-center gap-1">
              {stat.positive && <TrendingUp className="w-4 h-4 text-success" />}
              <span className={stat.positive ? "text-success text-sm" : "text-muted-foreground text-sm"}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
        
        {/* Future-Proof Score */}
        <div className="stat-card relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Future-Proof Score</span>
          </div>
          <p className="text-2xl font-bold text-foreground mb-1">78/100</p>
          <span className="text-success text-sm">Healthy Condition</span>
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-16 h-16 rounded-full border-4 border-accent flex items-center justify-center">
              <div className="w-3 h-3 bg-accent rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* AI Alert */}
      <div className="bg-gradient-to-r from-card via-card to-primary/5 border border-border rounded-xl p-6 mb-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">AI INSIGHTS TODAY</span>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Weekend Alert: Budget at Risk</h3>
            <p className="text-muted-foreground max-w-2xl">
              You tend to overspend on Fridays by approx ₹2,500. Based on your 'Spend DNA', your weekend budget is critically low.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">Dismiss</Button>
            <Button>
              <Lock className="w-4 h-4 mr-2" />
              Lock Non-Essentials
            </Button>
          </div>
        </div>
      </div>

      {/* Charts and Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spending Analytics */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Spending Analytics</h3>
            <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
              <button className="px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground rounded-md">
                This Month
              </button>
              <button className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground">
                Last Month
              </button>
              <button className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground">
                3M
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            {/* Pie Chart */}
            <div className="relative">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={spendingData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                    stroke="none"
                  >
                    {spendingData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-xs text-muted-foreground">Total Spent</p>
                <p className="text-xl font-bold text-foreground">₹42k</p>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 justify-center">
                {spendingData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-muted-foreground">{item.name} ({item.value}%)</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Trend Chart */}
            <div>
              <p className="text-sm text-muted-foreground mb-4">Daily Spend Trend</p>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(225, 73%, 57%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(225, 73%, 57%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }} />
                  <Area type="monotone" dataKey="amount" stroke="hsl(225, 73%, 57%)" fill="url(#colorAmount)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Recent Transactions */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Recent Transactions</h3>
              <button className="text-sm text-primary hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {transactions.map((tx, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <tx.icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{tx.name}</p>
                    <p className="text-xs text-muted-foreground">{tx.category} • {tx.time}</p>
                  </div>
                  <span className={`text-sm font-semibold ${tx.amount > 0 ? 'text-success' : 'text-foreground'}`}>
                    {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Predictions */}
          <div className="bg-gradient-to-br from-card to-primary/5 border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-warning" />
              <h3 className="font-semibold text-foreground">Upcoming Predictions</h3>
            </div>
            <div className="space-y-3">
              {predictions.map((pred, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    pred.status === 'warning' ? 'bg-destructive' : 
                    pred.status === 'success' ? 'bg-success' : 'bg-primary'
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{pred.title}</p>
                    <p className={`text-xs ${
                      pred.status === 'warning' ? 'text-destructive' : 
                      pred.status === 'success' ? 'text-success' : 'text-muted-foreground'
                    }`}>{pred.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
