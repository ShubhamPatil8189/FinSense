import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Shield,
  Eye,
  EyeOff,
} from "lucide-react";
import PublicNavbar from "../components/layout/PublicNavbar";
import { useToast } from "@/components/ui/use-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔔 Toast notification
    toast({
      title: "Login Successful 🎉",
      description: "Welcome back to FinSense",
      duration: 3000,
    });

    // simulate successful login
    setTimeout(() => {
      navigate("/dashboard");
    }, 800);
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
              <h1 className="text-2xl font-bold">FinSense</h1>
              <p className="text-muted-foreground">
                Smart finance for the modern earner
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="input-field pl-11"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="input-field pl-11 pr-11"
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

              <Button type="submit" size="lg" className="w-full">
                Log In
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </form>

            {/* Signup */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>

            {/* Security */}
            <div className="flex items-center justify-center gap-2 mt-6 pt-6 border-t border-border">
              <Shield className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                256-bit encrypted & secure
              </span>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
