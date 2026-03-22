import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Lock, 
  Sparkles, 
  Shield, 
  FileText, 
  Brain, 
  TrendingUp, 
  MessageSquare,
  Play,
  Code
} from "lucide-react";
import heroBackground from "@/assets/hero-background.png";

const features = [
  {
    icon: Lock,
    title: "Secure Encryption",
    description: "Bank-grade 256-bit security"
  },
  {
    icon: Sparkles,
    title: "AI-Powered",
    description: "Smart, real-time insights"
  },
  {
    icon: Shield,
    title: "Privacy-First",
    description: "Your data stays yours"
  }
];

const tools = [
  {
    icon: FileText,
    title: "Financial Twin",
    description: "Create a digital copy of your finances to simulate scenarios before spending a single rupee."
  },
  {
    icon: Brain,
    title: "Emotion-Aware AI",
    description: "Spending advice that understands your mood and prevents impulsive emotional purchases."
  },
  {
    icon: TrendingUp,
    title: "Life Event Predictor",
    description: "Prepare for big moves, weddings, or travel with AI that forecasts costs accurately."
  },
  {
    icon: MessageSquare,
    title: "AI Negotiator",
    description: "Get AI-generated scripts to help you negotiate better rates on bills, freelancing fees, and rent."
  }
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">FinSense</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link  to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link>
            <Link to="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Help</Link>
            <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
          </div>
          
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="outline" size="sm">Login</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-sm text-accent font-medium">AI-POWERED FINANCE V2.0</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Your <span className="gradient-text">AI-Powered</span><br />
              Financial Coach
            </h1>
            
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              FinSense understands your money, predicts your future, and guides your decisions with personalized intelligence designed for India's modern earners.
            </p>
            
            <div className="flex items-center justify-center gap-4">
              <Link to="/signup">
                <Button variant="hero" size="lg">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-t border-b border-border bg-card/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Intelligent Financial Tools</h2>
            <p className="text-muted-foreground">
              Advanced AI features designed specifically for young professionals, freelancers, and students building their wealth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <div key={index} className="feature-card">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
                  <tool.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{tool.title}</h3>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="cta-section p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Start your financial journey today
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of young professionals in India mastering their money with the power of FinSense AI.
            </p>
            <Link to="/signup">
              <Button variant="hero" size="lg">
                Get Started Free
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-4">
              No credit card required. Free for students.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
            <Code className="w-4 h-4" />
            <span className="text-sm">Made for the future of finance</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 FinSense AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
