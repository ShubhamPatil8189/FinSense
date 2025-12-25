import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Sparkles, Shield } from "lucide-react";
import { toast } from "sonner";
import PublicNavbar from "../components/layout/PublicNavbar";

export default function Signup() {
  const navigate = useNavigate();

  /* ---------- FORM STATES ---------- */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");

  /* ---------- UI STATES ---------- */
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ---------- OTP TIMER ---------- */
  const [otpTimer, setOtpTimer] = useState(180); // 3 minutes
  const [canResend, setCanResend] = useState(false);

  /* ---------- OTP TIMER EFFECT ---------- */
  useEffect(() => {
    if (!otpStep) return;

    setOtpTimer(180);
    setCanResend(false);

    const interval = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [otpStep]);

  /* ---------- REGISTER ---------- */
  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.message);

      toast.success("OTP sent to your email 📩");
      setOtpStep(true);
    } catch (err) {
      toast.error("Registration failed", {
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  /* ---------- VERIFY OTP ---------- */
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (otp.length !== 4) {
      toast.error("Enter a valid 4-digit OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:4000/api/auth/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.message);

      localStorage.setItem("token", data.token);

      toast.success("Email verified successfully 🎉");
      navigate("/dashboard");
    } catch (err) {
      toast.error("OTP verification failed", {
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  /* ---------- RESEND OTP ---------- */
  const handleResendOtp = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:4000/api/auth/resend-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.message);

      toast.success("OTP resent successfully 📩");

      // Reset timer
      setOtpTimer(180);
      setCanResend(false);
    } catch (err) {
      toast.error("Failed to resend OTP", {
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PublicNavbar />

      <div className="min-h-screen bg-background flex items-center justify-center px-6 pt-24">
        <div className="w-full max-w-md">
          <div className="glass-card p-8 rounded-2xl border border-border">

            {/* HEADER */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-7 h-7 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold">
                {otpStep ? "Verify Email" : "Create your account"}
              </h1>
              <p className="text-muted-foreground mt-1">
                {otpStep
                  ? "Enter the 4-digit OTP sent to your email"
                  : "Start mastering your money with AI-driven insights"}
              </p>
            </div>

            {/* REGISTER FORM */}
            {!otpStep ? (
              <form onSubmit={handleRegister} className="space-y-5">

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-field pr-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="input-field pr-11"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showConfirmPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                  {loading ? "Sending OTP..." : "Register"}
                </Button>
              </form>
            ) : (
              /* OTP FORM */
              <form onSubmit={handleVerifyOtp} className="space-y-5">

                <input
                  type="text"
                  maxLength="4"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 4-digit OTP"
                  className="input-field text-center tracking-widest text-lg"
                />

                <div className="text-center text-sm text-muted-foreground">
                  {otpTimer > 0 ? (
                    <span>
                      Resend OTP in{" "}
                      <span className="font-medium text-foreground">
                        {String(Math.floor(otpTimer / 60)).padStart(2, "0")}:
                        {String(otpTimer % 60).padStart(2, "0")}
                      </span>
                    </span>
                  ) : (
                    <span className="text-success">
                      You can resend the OTP now
                    </span>
                  )}
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                  {loading ? "Verifying..." : "Verify OTP"}
                </Button>

                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={!canResend || loading}
                  className={`w-full text-sm font-medium ${
                    canResend
                      ? "text-primary hover:underline"
                      : "text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  Resend OTP
                </button>
              </form>
            )}

            {/* SECURITY */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <Shield className="w-4 h-4 text-success" />
              <span className="text-sm text-success">
                Your data is encrypted & secure
              </span>
            </div>

            {!otpStep && (
              <div className="mt-6 pt-6 border-t border-border text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary font-medium">
                    Log In
                  </Link>
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
