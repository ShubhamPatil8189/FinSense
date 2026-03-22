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
  Lightbulb,
  Lock
} from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import api from "@/config/api";

const issueTypes = [
  "Credit Card Annual Fee Waiver",
  "EMI Penalty Reversal",
  "Incorrect Billing Dispute",
  "Late Payment Fee Waiver",
  "Service Charge Dispute"
];

const tones = ["Polite", "Firm", "Formal"];

const tipsStatic = [
  {
    title: "Be Polite but Direct",
    description: "Bank support agents are more likely to help if the tone is respectful yet firm."
  },
  {
    title: "Mention Loyalty",
    description: "Highlighting your relationship history improves success rate."
  },
  {
    title: "Best Time to Send",
    description: "Weekday mornings usually get faster responses."
  }
];

const recentDrafts = [
  { title: "EMI Penalty - HDFC", time: "2 days ago" },
  { title: "Incorrect Billing", time: "Last week" }
];

export default function Negotiation() {
  const { toast } = useToast();

  const [selectedIssue, setSelectedIssue] = useState(issueTypes[0]);
  const [selectedTone, setSelectedTone] = useState("Firm");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(true);
  const [generatedDraft, setGeneratedDraft] = useState("");
  const [generatedTips, setGeneratedTips] = useState([]);
  
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/auth/me');
        setIsPro(res.data.user.isPro);
      } catch (err) {
        // failed
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const generateDraft = async () => {
    setLoading(true);
    try {
      const response = await api.post("/negotiation/generate", {
        type: "email",
        purpose: selectedIssue,
        tone: selectedTone.toLowerCase(),
        currentAmount: 2500,
        amount: 0,
        context: details || "Customer requesting fee waiver"
      });

      setGeneratedDraft(response.data.generatedMessage);
      setGeneratedTips(response.data.tips || []);

      toast({
        title: "Draft Generated ✨",
        description: "AI has created a negotiation message for you."
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: error.response?.data?.error || "Unable to generate message",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedDraft);
    toast({ title: "Copied 📋", description: "Message copied to clipboard" });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <RefreshCw className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (!isPro) {
    return (
      <DashboardLayout title="Negotiation Assistant">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6 relative">
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-500" />
              <Lock className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">FinSense Pro Feature</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8 text-lg">
              The AI Negotiation Assistant is a powerful Pro tool that helps you write perfect bank fee waiver emails. Upgrade to unlock this and more.
            </p>
            <Button size="lg" onClick={() => window.location.href = '/settings'} className="shadow-lg shadow-primary/20 text-lg h-12 w-48">
              Upgrade Now
            </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">AI Negotiation Assistant</h2>
      </div>

      <p className="text-muted-foreground mb-8">
        Generate professional messages to negotiate fees, penalties & disputes.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border rounded-xl p-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-sm font-medium mb-2 flex items-center gap-2">
                  Select Issue <Info className="w-4 h-4 text-muted-foreground" />
                </label>
                <select
                  value={selectedIssue}
                  onChange={(e) => setSelectedIssue(e.target.value)}
                  className="input-field"
                >
                  {issueTypes.map(issue => (
                    <option key={issue}>{issue}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Tone</label>
                <div className="flex gap-2">
                  {tones.map(tone => (
                    <button
                      key={tone}
                      onClick={() => setSelectedTone(tone)}
                      className={`flex-1 py-2.5 rounded-lg text-sm ${
                        selectedTone === tone
                          ? "bg-secondary"
                          : "bg-muted/50 hover:bg-secondary/50"
                      }`}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">Details</label>
              <input
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Card ending, loyalty years, issue explanation"
                className="input-field"
              />
            </div>

            <Button onClick={generateDraft} disabled={loading}>
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Draft
                </>
              )}
            </Button>
          </div>

          {generatedDraft && (
            <div className="bg-card border rounded-xl p-6">
              <div className="flex justify-between mb-4">
                <span className="text-sm font-medium">AI Generated Draft</span>
                <div className="flex gap-2">
                  <button onClick={generateDraft}><RefreshCw className="w-4 h-4" /></button>
                  <button onClick={copyToClipboard}><Copy className="w-4 h-4" /></button>
                </div>
              </div>

              <p className="whitespace-pre-line mb-6">{generatedDraft}</p>

              <div className="flex gap-3">
                <Button><Mail className="w-4 h-4 mr-2" />Email</Button>
                <Button variant="secondary"><MessageSquare className="w-4 h-4 mr-2" />WhatsApp</Button>
                <Button variant="outline" onClick={copyToClipboard}>
                  <Copy className="w-4 h-4 mr-2" />Copy
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-card border rounded-xl p-6">
            <h3 className="font-semibold mb-4">Success Probability</h3>
            <div className="flex gap-2 items-center mb-2">
              <span className="text-4xl font-bold">85%</span>
              <span className="text-success flex gap-1 items-center">
                <TrendingUp className="w-4 h-4" /> High
              </span>
            </div>
          </div>

          <div className="bg-card border rounded-xl p-6">
            <div className="flex gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-warning" />
              <h3 className="font-semibold">Tips</h3>
            </div>

            {(generatedTips.length ? generatedTips : tipsStatic).map((tip, i) => (
              <p key={i} className="text-sm text-muted-foreground mb-2">
                • {typeof tip === "string" ? tip : tip.title}
              </p>
            ))}
          </div>

          <div className="bg-card border rounded-xl p-6">
            <h3 className="font-semibold mb-4">Recent Drafts</h3>
            {recentDrafts.map((d, i) => (
              <div key={i} className="flex justify-between py-2 text-sm">
                {d.title}
                <ChevronRight className="w-4 h-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
