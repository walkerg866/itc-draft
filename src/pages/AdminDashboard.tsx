import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { CloudLightning, Briefcase, FileText, Download, Image, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Weather Alerts", path: "/admin/dashboard", icon: CloudLightning },
  { label: "Job Listings", path: "/admin/dashboard/jobs", icon: Briefcase },
  { label: "Applications", path: "/admin/dashboard/applications", icon: FileText },
  { label: "Downloads", path: "/admin/dashboard/downloads", icon: Download },
  { label: "Images", path: "/admin/dashboard/images", icon: Image },
];

const AdminDashboard = ({ children }: { children: React.ReactNode }) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin", { replace: true });
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-secondary text-secondary-foreground flex flex-col transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:flex`}
      >
        <div className="flex items-center gap-3 p-5 border-b border-steel-light/20">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-heading font-extrabold text-sm">
              ITC
            </span>
          </div>
          <div>
            <div className="font-heading font-bold text-sm leading-tight">Admin Panel</div>
            <div className="text-steel-muted text-xs">Indiana Tube Corp</div>
          </div>
          <button
            className="ml-auto lg:hidden text-secondary-foreground/70"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-secondary-foreground/70 hover:bg-steel-light/20 hover:text-secondary-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-steel-light/20">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-secondary-foreground/70 hover:text-secondary-foreground hover:bg-steel-light/20"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-14 bg-card border-b border-border flex items-center px-4 lg:px-6">
          <button
            className="lg:hidden p-2 -ml-2 text-foreground"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="ml-auto">
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Site
            </Link>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 p-4 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
