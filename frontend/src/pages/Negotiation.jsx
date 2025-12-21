import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Mail, 
  MessageSquare, 
  Copy, 
  RefreshCw,
  Info,
  TrendingUp,
  ChevronRight,
  Lightbulb
} from "lucide-react";
import { useState } from "react";

const issueTypes = [
  "Credit Card Annual Fee Waiver",
  "EMI Penalty Reversal",
  "Incorrect Billing Dispute",
  "Late Payment Fee Waiver",
  "Service Charge Dispute"
];

const tones = ["Polite", "Firm", "Formal"];

const tips = [
  {
    title: "Be Polite but Direct",
    description: "Bank support agents are more likely to help if the tone is respectful yet firm about the request."
  },
  {
    title: "Mention Loyalty",
    description: "Highlighting your 5-year relationship is a strong leverage point for fee waivers."
  },
  {
    title: "Best Time to Send",
    description: "Weekday mornings (10 AM - 12 PM) typically see faster response times."
  }
];

const recentDrafts = [
  { title: "EMI Penalty - HDFC", time: "2 days ago" },
  { title: "Incorrect Billing", time: "Last week" }
];

export default function Negotiation() {
  const [selectedIssue, setSelectedIssue] = useState(issueTypes[0]);
  const [selectedTone, setSelectedTone] = useState("Firm");
  const [details, setDetails] = useState("");

  const generatedDraft = `Subject: Request for Waiver of Annual Fee - Credit Card ending 4590

Dear Customer Support Team,

I hope this message finds you well.

I am writing to respectfully request a waiver for the annual membership fee of ₹2,500 recently charged to my credit card account (ending in 4590).`;

  return (
    <DashboardLayout 
      title="Negotiation Assistant" 
      subtitle=""
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">AI Negotiation Assistant</h2>
      </div>
      <p className="text-muted-foreground mb-8">
        Let our AI draft the perfect message to save you money on fees, penalties, and service disputes.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Issue Type */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-sm font-medium text-foreground">Select Issue</label>
                  <Info className="w-4 h-4 text-muted-foreground" />
                </div>
                <select 
                  value={selectedIssue}
                  onChange={(e) => setSelectedIssue(e.target.value)}
                  className="input-field"
                >
                  {issueTypes.map((issue) => (
                    <option key={issue} value={issue}>{issue}</option>
                  ))}
                </select>
              </div>

              {/* Tone */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Message Tone</label>
                <div className="flex gap-2">
                  {tones.map((tone) => (
                    <button
                      key={tone}
                      onClick={() => setSelectedTone(tone)}
                      className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        selectedTone === tone 
                          ? 'bg-secondary text-foreground' 
                          : 'bg-muted/50 text-muted-foreground hover:bg-secondary/50'
                      }`}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="mb-6">
              <label className="text-sm font-medium text-foreground mb-2 block">Specific Details (Optional)</label>
              <input
                type="text"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="e.g. Card ending in 4590, loyal customer for 5 years..."
                className="input-field text-muted-foreground"
              />
            </div>

            <Button className="bg-gradient-to-r from-primary to-destructive hover:opacity-90">
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Draft
            </Button>
          </div>

          {/* Generated Draft */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span className="text-sm font-medium text-foreground">AI Generated Draft</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                  <RefreshCw className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                  <Copy className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            <div className="prose prose-invert max-w-none mb-6">
              <p className="text-foreground whitespace-pre-line">{generatedDraft}</p>
            </div>

            <div className="flex items-center gap-4">
              <Button>
                <Mail className="w-4 h-4 mr-2" />
                Send via Email
              </Button>
              <Button variant="whatsapp">
                <MessageSquare className="w-4 h-4 mr-2" />
                Send via WhatsApp
              </Button>
              <Button variant="secondary">
                <Copy className="w-4 h-4 mr-2" />
                Copy Text
              </Button>
            </div>
          </div>
        </div>

        {/* Right: Stats & Tips */}
        <div className="space-y-6">
          {/* Success Probability */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-4">Success Probability</h3>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-bold text-foreground">85%</span>
              <span className="text-success flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                High
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Based on similar requests for "Fee Waiver" sent by users with your profile.
            </p>
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <div className="w-[85%] h-full bg-gradient-to-r from-success to-primary rounded-full" />
            </div>
          </div>

          {/* Tips */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-warning" />
              <h3 className="font-semibold text-foreground">Negotiation Tips</h3>
            </div>
            <div className="space-y-4">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{tip.title}</p>
                    <p className="text-xs text-muted-foreground">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="text-sm text-primary hover:underline mt-4 flex items-center gap-1">
              Read full guide
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* Recent Drafts */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-4">Recent Drafts</h3>
            <div className="space-y-3">
              {recentDrafts.map((draft, index) => (
                <div key={index} className="flex items-center justify-between py-2 hover:bg-secondary/50 -mx-2 px-2 rounded-lg cursor-pointer transition-colors">
                  <div>
                    <p className="text-sm font-medium text-foreground">{draft.title}</p>
                    <p className="text-xs text-muted-foreground">{draft.time}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
