import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Play, 
  Sparkles, 
  Info, 
  History, 
  Car, 
  Briefcase, 
  Building,
  TrendingDown,
  TrendingUp
} from "lucide-react";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ReferenceDot } from "recharts";

const projectionData = [
  { month: "Now", current: 100000, simulated: 100000 },
  { month: "M1", current: 105000, simulated: 95000 },
  { month: "M2", current: 110000, simulated: 88000 },
  { month: "M3", current: 115000, simulated: 80000 },
  { month: "M4", current: 120000, simulated: 75000 },
  { month: "M5", current: 125000, simulated: 72000 },
  { month: "M6", current: 130000, simulated: 78000 },
  { month: "M7", current: 135000, simulated: 85000 },
  { month: "M8", current: 140000, simulated: 92000 },
  { month: "M9", current: 145000, simulated: 100000 },
  { month: "M10", current: 150000, simulated: 110000 },
  { month: "M11", current: 155000, simulated: 120000 },
  { month: "M12", current: 160000, simulated: 135000 },
];

export default function Simulation() {
  const [purchaseAmount, setPurchaseAmount] = useState([850000]);
  const [sabbaticalMonths, setSabbaticalMonths] = useState([3]);
  const [emiAmount, setEmiAmount] = useState([12500]);

  return (
    <DashboardLayout 
      title="Financial Twin Workspace" 
      subtitle=""
      headerAction={
        <Button variant="outline" size="sm" className="border-primary/50 text-primary">
          <Sparkles className="w-4 h-4 mr-2" />
          AI Powered Model V2.4
        </Button>
      }
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Simulation Workspace</h2>
        <p className="text-muted-foreground">
          Test hypothetical financial scenarios against your digital twin to foresee cash flow impacts and risks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Controls */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Adjust Variables</h3>
              </div>
              <button className="text-sm text-primary hover:underline">Reset Defaults</button>
            </div>

            <div className="space-y-8">
              {/* Purchase Amount */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Car className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-foreground">Large Purchase Amount (₹)</span>
                  </div>
                  <div className="bg-secondary px-3 py-1.5 rounded-lg">
                    <span className="text-sm font-medium text-foreground">
                      {purchaseAmount[0].toLocaleString()}
                    </span>
                  </div>
                </div>
                <Slider
                  value={purchaseAmount}
                  onValueChange={setPurchaseAmount}
                  max={2000000}
                  step={50000}
                  className="w-full"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-muted-foreground">₹0</span>
                  <span className="text-xs text-muted-foreground">₹20L</span>
                </div>
              </div>

              {/* Sabbatical */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-foreground">Job Break / Sabbatical</span>
                  </div>
                  <div className="bg-secondary px-3 py-1.5 rounded-lg">
                    <span className="text-sm font-medium text-foreground">
                      {sabbaticalMonths[0]} Months
                    </span>
                  </div>
                </div>
                <Slider
                  value={sabbaticalMonths}
                  onValueChange={setSabbaticalMonths}
                  max={12}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-muted-foreground">0 Mo</span>
                  <span className="text-xs text-muted-foreground">12 Mo</span>
                </div>
              </div>

              {/* EMI */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-foreground">New Monthly EMI</span>
                  </div>
                  <div className="bg-secondary px-3 py-1.5 rounded-lg">
                    <span className="text-sm font-medium text-foreground">
                      {emiAmount[0].toLocaleString()}
                    </span>
                  </div>
                </div>
                <Slider
                  value={emiAmount}
                  onValueChange={setEmiAmount}
                  max={100000}
                  step={2500}
                  className="w-full"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-muted-foreground">₹0</span>
                  <span className="text-xs text-muted-foreground">₹1L</span>
                </div>
              </div>
            </div>

            <Button className="w-full mt-8" size="lg">
              <Play className="w-4 h-4 mr-2" />
              Simulate Future
            </Button>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
              <Info className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Twin updated 2 hours ago</p>
                <p className="text-sm text-foreground">from bank APIs.</p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
              <History className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">View past simulations (3</p>
                <p className="text-sm text-foreground">saved)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Results */}
        <div className="space-y-6">
          {/* AI Prediction Header */}
          <div className="bg-card border-t-4 border-t-warning border-x border-b border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">AI Prediction</h3>
              </div>
              <span className="badge-warning flex items-center gap-1.5 px-3 py-1">
                <span className="w-2 h-2 bg-warning rounded-full" />
                MEDIUM RISK
              </span>
            </div>

            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-1">Projected Monthly Cash Flow</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-destructive">-₹14,500</span>
                <span className="text-sm text-destructive">/ month impact</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              <span className="font-medium text-foreground">Insight:</span> The combined EMI and car maintenance will exceed your disposable income buffer by 12%.
            </p>

            {/* Chart */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Savings Projection (Next 12 Months)</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-0.5 bg-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Current</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-0.5 bg-primary" />
                    <span className="text-xs text-primary">Simulated</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={projectionData}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 10 }} />
                  <Line type="monotone" dataKey="current" stroke="hsl(215, 20%, 55%)" strokeDasharray="5 5" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="simulated" stroke="hsl(225, 73%, 57%)" strokeWidth={2} dot={false} />
                  <ReferenceDot x="M4" y={75000} r={6} fill="hsl(0, 72%, 51%)" stroke="none" />
                </LineChart>
              </ResponsiveContainer>
              <div className="text-center mt-2">
                <span className="text-xs bg-secondary px-2 py-1 rounded text-muted-foreground">Dip: Month 4</span>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-4">Recommendations</h3>
            <div className="bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
                <p className="text-sm text-foreground">
                  Consider delaying the car purchase by <span className="font-semibold text-primary">4 months</span> to stabilize your emergency fund first.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
