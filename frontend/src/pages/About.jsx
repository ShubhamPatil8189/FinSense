import PublicNavbar from "@/components/layout/PublicNavbar";
import {
  Sparkles,
  Brain,
  Shield,
  TrendingUp,
  Target,
  Users,
} from "lucide-react";

export default function About() {
  return (
    <>
      <PublicNavbar />

      <div className="pt-16 min-h-screen bg-background">
        {/* ================= HERO ================= */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">
                ABOUT FINSENSE
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Built to simplify <br />
              <span className="gradient-text">personal finance</span>
            </h1>

            <p className="text-lg text-muted-foreground">
              FinSense is an AI-powered personal finance assistant designed to
              help students, young professionals, and first-time earners make
              smarter money decisions with confidence.
            </p>
          </div>
        </section>

        {/* ================= MISSION ================= */}
        <section className="py-16 bg-card border-t border-border">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Managing money shouldn’t be stressful or confusing. Our mission
                is to make finance human-friendly by combining AI, behavioral
                insights, and simplicity — so you always know what to do next
                with your money.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary/50 p-6 rounded-xl">
                <Brain className="w-6 h-6 text-primary mb-3" />
                <p className="font-medium text-foreground">
                  Smart AI Guidance
                </p>
              </div>
              <div className="bg-secondary/50 p-6 rounded-xl">
                <TrendingUp className="w-6 h-6 text-primary mb-3" />
                <p className="font-medium text-foreground">
                  Future-Ready Planning
                </p>
              </div>
              <div className="bg-secondary/50 p-6 rounded-xl">
                <Shield className="w-6 h-6 text-primary mb-3" />
                <p className="font-medium text-foreground">
                  Privacy-First Design
                </p>
              </div>
              <div className="bg-secondary/50 p-6 rounded-xl">
                <Target className="w-6 h-6 text-primary mb-3" />
                <p className="font-medium text-foreground">
                  Goal-Focused Finance
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= WHY FINSENSE ================= */}
        <section className="py-20">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Why FinSense?
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card border border-border p-6 rounded-xl">
                <Users className="w-6 h-6 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">
                  Built for Real People
                </h3>
                <p className="text-sm text-muted-foreground">
                  Designed especially for students and young earners who want
                  clarity, not complexity.
                </p>
              </div>

              <div className="bg-card border border-border p-6 rounded-xl">
                <Brain className="w-6 h-6 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">
                  Beyond Expense Tracking
                </h3>
                <p className="text-sm text-muted-foreground">
                  FinSense understands behavior, emotions, and future outcomes —
                  not just numbers.
                </p>
              </div>

              <div className="bg-card border border-border p-6 rounded-xl">
                <Shield className="w-6 h-6 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">
                  Secure by Default
                </h3>
                <p className="text-sm text-muted-foreground">
                  Your financial data is encrypted, protected, and always under
                  your control.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FOOTER NOTE ================= */}
        <section className="py-16 border-t border-border text-center">
          <p className="text-muted-foreground">
            FinSense is more than an app — it’s your long-term financial partner.
          </p>
        </section>
      </div>
    </>
  );
}
