import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Brain,
  Dna,
  Lightbulb,
  Target,
  DollarSign,
  MessageSquare,
  Settings,
  Sparkles,
  PlusCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mainNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Brain, label: "Financial Twin", href: "/simulation" },
  { icon: Dna, label: "Spend DNA", href: "/spend-dna" },
];

const toolsNavItems = [
  { icon: Lightbulb, label: "Nudges", href: "/nudges", badge: 4 },
  { icon: Target, label: "Goals", href: "/goals" },
  { icon: DollarSign, label: "Wasted Money", href: "/optimization" },
  { icon: MessageSquare, label: "Negotiation Assistant", href: "/negotiation" },
];

export function Sidebar({ userName = "Rahul Sharma", userPlan = "Pro Member" }) {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
          <Link to="/dashboard">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </Link>
        </div>
        <div>
          <Link to="/dashboard">
            <h1 className="text-lg font-bold text-foreground">FinSense</h1>
            <p className="text-xs text-muted-foreground">AI Finance</p>
          </Link>
        </div>
      </div>

      {/* Add Expense */}
      <div className="px-4 mb-4 shrink-0">
        <Link to="/add-expense">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90">
            <PlusCircle className="w-5 h-5" />
            Add Expense
          </button>
        </Link>
      </div>

      {/* Scrollable Navigation */}
      <nav className="flex-1 px-4 overflow-y-auto">
        <div className="mb-6">
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-3 px-3">
            Main
          </p>
          <ul className="space-y-1">
            {mainNavItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "sidebar-item",
                    location.pathname === item.href && "sidebar-item-active"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-3 px-3">
            Tools
          </p>
          <ul className="space-y-1">
            {toolsNavItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "sidebar-item",
                    location.pathname === item.href && "sidebar-item-active"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Link
          to="/settings"
          className={cn(
            "sidebar-item",
            location.pathname === "/settings" && "sidebar-item-active"
          )}
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
      </nav>

      {/* User */}
      <div className="p-4 border-t border-sidebar-border shrink-0">
        <Link
          to="/settings"
          className="flex items-center gap-3 px-2 hover:bg-sidebar-accent rounded-lg py-2"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold">
            {userName.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{userName}</p>
            <p className="text-xs text-muted-foreground">{userPlan}</p>
          </div>
        </Link>
      </div>
    </aside>
  );
}
