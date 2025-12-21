import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Sparkles, Shield } from "lucide-react";
import { toast } from "sonner";
import PublicNavbar from "../components/layout/PublicNavbar";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    /* ❌ Password mismatch */
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        description: "Please make sure both passwords are identical",
      });
      return;
    }

    /* ✅ Success */
    toast.success("Account created successfully 🎉", {
      description: "Welcome to FinSense. Redirecting to dashboard...",
    });

    setTimeout(() => {
      navigate("/dashboard");
    }, 1200);
  };

  return (
    <>
      <PublicNavbar />

      <div className="min-h-screen bg-background flex items-center justify-center px-6 pt-24">
        <div className="w-full max-w-md">
          <div className="glass-card p-8 rounded-2xl border border-border">

            {/* Logo */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-7 h-7 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">
                Create your account
              </h1>
              <p className="text-muted-foreground mt-1">
                Start mastering your money with AI-driven insights
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="input-field"
                />
              </div>

              {/* Password */}
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
                    placeholder="••••••••"
                    className="input-field pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    placeholder="••••••••"
                    className="input-field pr-11"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <Button type="submit" size="lg" className="w-full">
                Sign Up
              </Button>
            </form>

            {/* Security */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <Shield className="w-4 h-4 text-success" />
              <span className="text-sm text-success">
                Your data is encrypted & secure
              </span>
            </div>

            {/* Login Link */}
            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary font-medium hover:underline"
                >
                  Log In
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
