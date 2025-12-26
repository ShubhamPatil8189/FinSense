import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  Camera,
  Mail,
  Download,
  Lock,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

const notificationSettings = [
  { id: "spending", label: "Spending Alerts", description: "Get notified when you exceed budget", enabled: true },
  { id: "nudges", label: "AI Nudges", description: "Smart saving suggestions", enabled: true },
  { id: "weekly", label: "Weekly Summary", description: "Weekly spending report", enabled: true },
  { id: "marketing", label: "Marketing", description: "Product updates and offers", enabled: false },
];

export default function Settings() {
  const navigate = useNavigate();

  /* ---------- USER STATE ---------- */
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState(notificationSettings);
  const [loading, setLoading] = useState(true);

  /* ---------- FETCH USER PROFILE ---------- */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to continue");
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          throw new Error("No token provided");
        }

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch profile");

        setUser(data.user);
      } catch (err) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  /* ---------- NOTIFICATION TOGGLE ---------- */
  const toggleNotification = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n))
    );
  };

  if (loading) {
    return (
      <DashboardLayout title="Settings">
        <p className="text-muted-foreground">Loading profile...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Settings" subtitle="Manage your account and preferences">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* LEFT SIDEBAR */}
        <div className="lg:col-span-1 space-y-6">

          {/* PROFILE CARD */}
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-bold text-primary-foreground">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-4 border-card">
                <Camera className="w-3 h-3 text-primary-foreground" />
              </button>
            </div>

            <h3 className="font-semibold text-foreground">{user.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">{user.email}</p>
            <span className="badge-primary">Verified User</span>
          </div>

          {/* QUICK ACTIONS */}
          <div className="bg-card border border-border rounded-xl p-4 space-y-2">
            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors text-left">
              <Download className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-foreground">Export Data</span>
            </button>

            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors text-left">
              <Lock className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-foreground">Privacy Settings</span>
            </button>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-destructive/10 transition-colors text-left text-destructive"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm">Sign Out</span>
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="lg:col-span-3 space-y-6">

          {/* NOTIFICATIONS */}
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
                    <p className="text-sm text-muted-foreground">
                      {setting.description}
                    </p>
                  </div>
                  <Switch
                    checked={setting.enabled}
                    onCheckedChange={() => toggleNotification(setting.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* DANGER ZONE */}
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
