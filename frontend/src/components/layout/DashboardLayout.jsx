import { Sidebar } from "./Sidebar";
import { Bell, Search, Settings } from "lucide-react";
import { Link } from "react-router-dom";
export function DashboardLayout({
  children,
  title,
  subtitle,
  headerAction,
  showSearch = true,
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
          <div className="flex items-center justify-between px-8 py-4">
            <div>
              <h1 className="text-xl font-bold">{title}</h1>
              {subtitle && (
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>

            <div className="flex items-center gap-4">
              {showSearch && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-80 pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-sm"
                  />
                </div>
              )}

              <span className="badge-success px-3 py-1.5 flex items-center gap-2">
                <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                AI ACTIVE
              </span>

              <Link to="/settings">
              <button className="p-2 hover:bg-secondary rounded-lg">
                <Bell className="w-5 h-5" />
              </button>
              </Link>

              <Link to="/settings">
                <button className="p-2 hover:bg-secondary rounded-lg">
                  <Settings className="w-5 h-5" />
                </button>
              </Link>

              {headerAction}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
