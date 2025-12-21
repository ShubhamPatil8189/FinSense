import { useState } from "react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import {
  HelpCircle,
  User,
  Shield,
  CreditCard,
  Settings,
  Sparkles,
} from "lucide-react";

/* ================= HELP DATA ================= */

const helpSections = {
  getting_started: {
    title: "Getting Started",
    description: "Learn how to use FinSense from day one.",
    icon: HelpCircle,
    items: [
      {
        question: "What is FinSense?",
        answer:
          "FinSense is an AI-powered personal finance assistant that helps you track spending, plan goals, and make smarter financial decisions.",
      },
      {
        question: "How do I create an account?",
        answer:
          "Click on Get Started, sign up using your email, and you’ll be redirected to your personal dashboard.",
      },
    ],
  },
  account: {
    title: "Account & Profile",
    description: "Manage your account and personal details.",
    icon: User,
    items: [
      {
        question: "Can I update my profile?",
        answer:
          "Yes. Go to Settings → Profile to update your name, email, and preferences.",
      },
      {
        question: "How do I change my password?",
        answer:
          "Navigate to Settings → Security to update your password securely.",
      },
    ],
  },
  security: {
    title: "Security & Privacy",
    description: "Your data safety is our top priority.",
    icon: Shield,
    items: [
      {
        question: "Is my data safe?",
        answer:
          "Yes. FinSense uses 256-bit encryption and follows privacy-first principles.",
      },
      {
        question: "Does FinSense sell my data?",
        answer:
          "No. Your data is never shared or sold to third parties.",
      },
    ],
  },
  billing: {
    title: "Plans & Billing",
    description: "Understand subscriptions and payments.",
    icon: CreditCard,
    items: [
      {
        question: "Is FinSense free?",
        answer:
          "Yes, FinSense offers a free plan for students with optional premium upgrades.",
      },
      {
        question: "How do I upgrade?",
        answer:
          "Go to Settings → Billing to explore premium plans.",
      },
    ],
  },
  settings: {
    title: "App Settings",
    description: "Customize FinSense your way.",
    icon: Settings,
    items: [
      {
        question: "Can I enable notifications?",
        answer:
          "Yes. You can manage alerts and reminders from the Settings page.",
      },
    ],
  },
};

/* ================= COMPONENT ================= */

export default function Help() {
  const [activeSection, setActiveSection] = useState("getting_started");

  const section = helpSections[activeSection];

  return (
    <>
      <PublicNavbar />

      <div className="pt-16 min-h-screen bg-background flex">
        {/* ================= FIXED SIDEBAR ================= */}
        <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-card border-r border-border px-4 py-6 hidden md:block">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <h2 className="font-semibold text-foreground">Help Center</h2>
          </div>

          <nav className="space-y-1">
            {Object.entries(helpSections).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
                  ${
                    activeSection === key
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-secondary"
                  }`}
              >
                <item.icon className="w-4 h-4" />
                {item.title}
              </button>
            ))}
          </nav>
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <main className="ml-0 md:ml-64 flex-1 px-6 py-10 max-w-4xl">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {section.title}
          </h1>
          <p className="text-muted-foreground mb-6">
            {section.description}
          </p>

          <div className="space-y-4">
            {section.items.map((item, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-5"
              >
                <h4 className="font-semibold text-foreground mb-1">
                  {item.question}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
