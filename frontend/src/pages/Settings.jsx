import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Bell,
  Camera,
  Download,
  Lock,
  LogOut,
  Trash2,
  AlertTriangle,
  X,
  Sparkles,
  CheckCircle,
  CreditCard,
  Smartphone,
  Building2
} from "lucide-react";
import { toast } from "sonner";
import api from "@/config/api";

const notificationSettings = [
  { id: "spending", label: "Spending Alerts", description: "Get notified when you exceed budget", enabled: true },
  { id: "nudges", label: "AI Nudges", description: "Smart saving suggestions", enabled: true },
  { id: "weekly", label: "Weekly Summary", description: "Weekly spending report", enabled: true },
];

export default function Settings() {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState(notificationSettings);
  const [loading, setLoading] = useState(true);

  // Delete Account States
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteOtp, setDeleteOtp] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [isDeleting, setIsDeleting] = useState(false);

  // Pro Checkout States
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvc: '', name: '' });
  const [upiId, setUpiId] = useState('');
  const [selectedBank, setSelectedBank] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/auth/me');
        setUser(res.data.user);
        setCardData(prev => ({ ...prev, name: res.data.user.name }));
      } catch (err) {
        toast.error("Session expired.");
        handleSignOut();
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    let timer;
    if (showDeleteModal && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showDeleteModal, countdown]);

  const toggleNotification = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n))
    );
    toast.success("Preferences updated");
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleExportData = async () => {
    toast.info("Preparing your data...");
    try {
      const [expensesRes, incomeRes] = await Promise.all([
        api.get('/expenses/history'),
        api.get('/income/details')
      ]);
      const exportData = {
        user,
        expenses: expensesRes.data,
        incomes: incomeRes.data,
        exportedAt: new Date().toISOString()
      };
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `FinSense_Data_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Data exported successfully!");
    } catch (error) {
      toast.error("Failed to export data");
    }
  };

  const requestDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      await api.post('/auth/request-delete-otp');
      setShowDeleteModal(true);
      setCountdown(30);
      toast.success("OTP sent to your email!");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to initiate deletion");
    } finally {
      setIsDeleting(false);
    }
  };

  const confirmDeleteAccount = async () => {
    if (!deleteOtp || deleteOtp.length !== 4) {
      toast.error("Please enter a valid 4-digit OTP");
      return;
    }
    if (countdown === 0) {
      toast.error("OTP expired. Please try again.");
      setShowDeleteModal(false);
      return;
    }
    try {
      setIsDeleting(true);
      await api.delete('/auth/delete-account', { data: { otp: deleteOtp } });
      toast.success("Account deleted permanently. We're sorry to see you go.");
      handleSignOut();
    } catch (error) {
      toast.error(error.response?.data?.error || "Invalid OTP");
    } finally {
      setIsDeleting(false);
    }
  };

  const validatePaymentAndCheckout = () => {
    if (paymentMethod === 'card') {
      const cleanCard = cardData.number.replace(/\s/g, '');
      if (cleanCard.length !== 16 || !/^\d+$/.test(cleanCard)) {
        return toast.error("Card number must be exactly 16 digits.");
      }
      if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) {
        return toast.error("Expiry date must be in MM/YY format.");
      }
      if (cardData.cvc.length !== 3 || !/^\d+$/.test(cardData.cvc)) {
        return toast.error("CVC must be exactly 3 digits.");
      }
      if (!cardData.name.trim()) {
        return toast.error("Cardholder name is required.");
      }
    } else if (paymentMethod === 'upi') {
      if (!/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/.test(upiId)) {
        return toast.error("Invalid UPI ID. Format should be name@bank.");
      }
    } else if (paymentMethod === 'netbanking') {
      if (!selectedBank) {
        return toast.error("Please select a bank to proceed.");
      }
    }
    handleCheckout();
  };

  const handleCheckout = async () => {
    try {
      setIsProcessingPayment(true);
      const res = await api.post('/subscription/upgrade');
      setUser(prev => ({ ...prev, isPro: true, proExpiryDate: res.data.proExpiryDate }));
      setShowPaymentModal(false);
      toast.success("Payment successful! Welcome to FinSense Pro 🎉");
    } catch (error) {
      toast.error(error.response?.data?.error || "Payment failed");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Settings">
        <p className="text-muted-foreground animate-pulse">Loading profile...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Settings" subtitle="Manage your account and preferences">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
        
        {/* LEFT SIDEBAR */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-bold text-primary-foreground">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-4 border-card">
                <Camera className="w-3 h-3 text-primary-foreground" />
              </button>
            </div>
            <h3 className="font-semibold text-foreground">{user?.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">{user?.email}</p>
            {user?.isPro ? (
              <span className="text-[10px] font-bold text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full uppercase tracking-widest mt-0.5 inline-flex items-center gap-1"><Sparkles className="w-3 h-3"/> Pro Active</span>
            ) : (
              <span className="badge-primary">Free Tier</span>
            )}
          </div>

          <div className="bg-card border border-border rounded-xl p-4 space-y-2">
            <button onClick={handleExportData} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors text-left group">
              <Download className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium text-foreground">Export Data</span>
            </button>
            <button onClick={() => toast.success("Privacy settings updated!")} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors text-left group">
              <Lock className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium text-foreground">Privacy Settings</span>
            </button>
            <button onClick={handleSignOut} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-destructive/10 transition-colors text-left text-destructive font-medium group">
              <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm">Sign Out</span>
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* SUBSCRIPTION PLAN */}
          <div className="bg-card border border-primary/20 rounded-xl p-6 relative overflow-hidden shadow-sm">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2 relative z-10">
              <Sparkles className="w-5 h-5 text-primary" />
              Subscription Plan
            </h3>
            
            {user?.isPro ? (
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between bg-primary/5 p-4 rounded-xl border border-primary/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-foreground">FinSense Pro</h4>
                      <p className="text-sm text-muted-foreground">Renews on {new Date(user.proExpiryDate).toDateString()}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-500/10 text-green-500 text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                    <CheckCircle className="w-3 h-3"/> Active
                  </span>
                </div>
                <Button variant="outline" className="w-full font-medium" onClick={() => toast.info("Subscription management coming soon.")}>
                  Manage Billing
                </Button>
              </div>
            ) : (
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6 border-b border-border pb-6">
                  <div>
                    <h4 className="font-bold text-xl text-foreground">Unlock Complete FinSense</h4>
                    <p className="text-sm text-muted-foreground mt-1 max-w-md">Upgrade to Pro to access our most powerful AI features, including the Negotiation Assistant and Smart Nudges.</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">₹299<span className="text-sm text-muted-foreground font-normal"> / year</span></div>
                    <p className="text-xs text-muted-foreground mt-1">Cancel anytime</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0"/>
                    <span className="text-sm text-muted-foreground">AI Email Negotiator</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0"/>
                    <span className="text-sm text-muted-foreground">Daily Micro-decision Nudges</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0"/>
                    <span className="text-sm text-muted-foreground">Comprehensive Data Filtering</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0"/>
                    <span className="text-sm text-muted-foreground">Early Access to new features</span>
                  </div>
                </div>
                <Button onClick={() => setShowPaymentModal(true)} className="w-full text-base h-12 shadow-lg shadow-primary/20">
                  <CreditCard className="w-5 h-5 mr-2" /> Upgrade to Pro
                </Button>
              </div>
            )}
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notification Preferences
            </h3>
            <div className="space-y-4">
              {notifications.map((setting) => (
                <div key={setting.id} className="flex items-center justify-between py-3 border-b border-border last:border-0 hover:bg-secondary/20 p-2 rounded-lg transition-colors">
                  <div>
                    <p className="font-medium text-foreground">{setting.label}</p>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </div>
                  <Switch checked={setting.enabled} onCheckedChange={() => toggleNotification(setting.id)} />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-destructive/30 rounded-xl p-6">
            <h3 className="font-semibold text-destructive mb-4 flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Danger Zone
            </h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
              Once you delete your account, there is absolutely no going back. All of your financial data, connected accounts, AI analysis, and configuration will be permanently wiped. Please be certain.
            </p>
            <Button variant="destructive" onClick={requestDeleteAccount} disabled={isDeleting}>
              {isDeleting ? "Processing..." : "Permanently Delete Account"}
            </Button>
          </div>
        </div>

        {/* OTP MODAL FOR DELETION */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="bg-card border-2 border-destructive/50 w-full max-w-md p-8 rounded-2xl shadow-xl relative animate-in zoom-in-95">
              <button onClick={() => setShowDeleteModal(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
              <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-2">Are you absolutely sure?</h3>
              <p className="text-center text-muted-foreground mb-6">
                We've sent a 4-digit OTP to <strong>{user?.email}</strong>. Enter it below to permanently delete your account. This action cannot be undone.
              </p>

              <div className="space-y-4">
                <input
                  type="text"
                  maxLength="4"
                  value={deleteOtp}
                  onChange={(e) => setDeleteOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 4-digit OTP"
                  className="input-field text-center text-2xl tracking-[0.5em] font-mono h-14"
                />

                <div className="flex justify-between items-center text-sm">
                  <span className={`${countdown > 10 ? 'text-muted-foreground' : 'text-destructive font-bold animate-pulse'}`}>
                    Time remaining: 00:{countdown.toString().padStart(2, '0')}
                  </span>
                  {countdown === 0 && (
                    <button onClick={requestDeleteAccount} className="text-primary hover:underline">Resend OTP</button>
                  )}
                </div>

                <div className="flex gap-3 mt-8">
                  <Button variant="outline" className="flex-1" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                  <Button variant="destructive" className="flex-1" onClick={confirmDeleteAccount} disabled={isDeleting || countdown === 0 || deleteOtp.length !== 4}>
                    {isDeleting ? "Deleting..." : "Confirm Deletion"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PAYMENT CHECKOUT MODAL */}
        {showPaymentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="bg-card border border-border w-full max-w-md p-8 rounded-2xl shadow-2xl relative animate-in zoom-in-95 overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
               <button onClick={() => setShowPaymentModal(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
              
              <div className="text-center mb-8 relative z-10">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Secure Checkout</h3>
                <p className="text-sm font-medium text-primary mt-1">₹299 / year</p>
              </div>
              
              <div className="relative z-10">
                {/* TABS */}
                <div className="flex gap-2 mb-6 bg-secondary/30 p-1 rounded-xl">
                  <button onClick={() => setPaymentMethod('card')} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${paymentMethod === 'card' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground'}`}>
                    <CreditCard className="w-4 h-4" /> Card
                  </button>
                  <button onClick={() => setPaymentMethod('upi')} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${paymentMethod === 'upi' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground'}`}>
                    <Smartphone className="w-4 h-4" /> UPI
                  </button>
                  <button onClick={() => setPaymentMethod('netbanking')} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${paymentMethod === 'netbanking' ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground'}`}>
                    <Building2 className="w-4 h-4" /> Netbanking
                  </button>
                </div>

                {/* FORM CONTENT */}
                <div className="space-y-4 mb-6">
                  {paymentMethod === 'card' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">Card Number</label>
                        <input type="text" value={cardData.number} onChange={(e) => setCardData({...cardData, number: e.target.value})} placeholder="4111 1111 1111 1111" className="input-field font-mono" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">Expiry</label>
                          <input type="text" value={cardData.expiry} onChange={(e) => setCardData({...cardData, expiry: e.target.value})} placeholder="MM/YY" className="input-field font-mono" />
                        </div>
                        <div>
                          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">CVC</label>
                          <input type="password" maxLength={3} value={cardData.cvc} onChange={(e) => setCardData({...cardData, cvc: e.target.value})} placeholder="123" className="input-field font-mono" />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">Cardholder Name</label>
                        <input type="text" value={cardData.name} onChange={(e) => setCardData({...cardData, name: e.target.value})} className="input-field" placeholder="John Doe" />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'upi' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">Virtual Payment Address (UPI ID)</label>
                        <input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="username@okicici" className="input-field" />
                      </div>
                      <p className="text-xs text-muted-foreground">Open your UPI app on your mobile device to approve the mandate request once you proceed.</p>
                    </div>
                  )}

                  {paymentMethod === 'netbanking' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">Select Bank</label>
                        <select value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)} className="input-field cursor-pointer">
                          <option value="">-- Choose your bank --</option>
                          <option value="sbi">State Bank of India</option>
                          <option value="hdfc">HDFC Bank</option>
                          <option value="icici">ICICI Bank</option>
                          <option value="axis">Axis Bank</option>
                          <option value="kotak">Kotak Mahindra Bank</option>
                        </select>
                      </div>
                      <p className="text-xs text-muted-foreground">You will be redirected to the secure bank portal to complete your authorization.</p>
                    </div>
                  )}
                </div>

                <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 mt-4 mb-4">
                  <p className="text-xs text-center text-warning font-medium">Test Mode: Click Pay to successfully mimic a completed ₹299 transaction.</p>
                </div>
                
                <Button onClick={validatePaymentAndCheckout} disabled={isProcessingPayment} className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20">
                  {isProcessingPayment ? "Processing Payment..." : "Pay ₹299 securely"}
                </Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
