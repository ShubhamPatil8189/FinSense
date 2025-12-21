import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Smartphone,
  Moon,
  Globe,
  HelpCircle,
  LogOut,
  ChevronRight,
  Camera,
  Mail,
  Phone,
  Building,
  Link2,
  Trash2,
  Download,
  Lock,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
const menuSections = [
  {
    title: "Account",
    items: [
      { icon: User, label: "Personal Information", description: "Name, email, phone number" },
      { icon: Shield, label: "Security", description: "Password, 2FA, sessions" },
      { icon: CreditCard, label: "Payment Methods", description: "Cards, UPI, bank accounts" },
      { icon: Link2, label: "Connected Accounts", description: "Bank sync, UPI apps" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: Bell, label: "Notifications", description: "Push, email, SMS alerts" },
      { icon: Moon, label: "Appearance", description: "Theme, display settings" },
      { icon: Globe, label: "Language & Region", description: "English, INR, timezone" },
      { icon: Smartphone, label: "Mobile App", description: "Download, sync settings" },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: HelpCircle, label: "Help Center", description: "FAQs, guides, tutorials" },
      { icon: Mail, label: "Contact Support", description: "Chat, email support" },
    ],
  },
];

const notificationSettings = [
  { id: "spending", label: "Spending Alerts", description: "Get notified when you exceed budget", enabled: true },
  { id: "nudges", label: "AI Nudges", description: "Smart saving suggestions", enabled: true },
  { id: "weekly", label: "Weekly Summary", description: "Weekly spending report", enabled: true },
  { id: "marketing", label: "Marketing", description: "Product updates and offers", enabled: false },
];

const connectedBanks = [
  { name: "HDFC Bank", status: "Connected", lastSync: "2 hours ago" },
  { name: "ICICI Bank", status: "Connected", lastSync: "5 hours ago" },
  { name: "SBI", status: "Action Required", lastSync: "Re-auth needed" },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState("profile");
  const [notifications, setNotifications] = useState(notificationSettings);

  const toggleNotification = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n))
    );
  };

  return (
    <DashboardLayout title="Settings" subtitle="Manage your account and preferences">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-bold text-primary-foreground">
                R
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-4 border-card">
                <Camera className="w-3 h-3 text-primary-foreground" />
              </button>
            </div>
            <h3 className="font-semibold text-foreground">Rahul Sharma</h3>
            <p className="text-sm text-muted-foreground mb-3">rahul@example.com</p>
            <span className="badge-primary">Pro Member</span>
          </div>

          {/* Quick Actions */}
          <div className="bg-card border border-border rounded-xl p-4 space-y-2">
            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors text-left">
              <Download className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-foreground">Export Data</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors text-left">
              <Lock className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-foreground">Privacy Settings</span>
            </button>
            <Link to="/">
            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-destructive/10 transition-colors text-left text-destructive">
              <LogOut className="w-5 h-5" />
              <span className="text-sm">Sign Out</span>
            </button>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Notifications */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notification Preferences
            </h3>
            <div className="space-y-4">
              {notifications.map((setting) => (
                <div
                  key={setting.id}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <div>
                    <p className="font-medium text-foreground">{setting.label}</p>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </div>
                  <Switch
                    checked={setting.enabled}
                    onCheckedChange={() => toggleNotification(setting.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-card border border-destructive/30 rounded-xl p-6">
            <h3 className="font-semibold text-destructive mb-4 flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Danger Zone
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
