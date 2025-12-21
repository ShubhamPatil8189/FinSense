import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function PublicNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">
            FinSense
          </span>
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </Link>

          <Link
            to="/help"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Help
          </Link>

          <Link
            to="/about"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="outline" size="sm">
              Login
            </Button>
          </Link>

          <Link to="/signup">
            <Button size="sm">
              Get Started
            </Button>
          </Link>
        </div>

      </div>
    </nav>
  );
}
