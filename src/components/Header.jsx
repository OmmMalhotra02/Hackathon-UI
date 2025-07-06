import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { BarChart3, Bot, Home, Shield, User, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/home", icon: Home },
    { name: "AI Onboarding", href: "/chat", icon: Bot },
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Risk Profile", href: "/riskprofile", icon: Shield },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);
  

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove token
    setIsLoggedIn(false);
    navigate("/login");
  };
  

  return (
    <div className="sticky top-0 z-40 border-b border-black bg-white">
      <header className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center gap-4 w-full justify-between relative z-50">
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
          <img
            src="/src/assets/UBS-logo.png"
            alt="UBS Logo"
            className="mr-10 w-20 md:w-16"
          />

          {mobileMenuOpen && (
            <div className="absolute top-15 -left-5 w-50px bg-white z-50 shadow-lg">
              <div className="px-4 py-4 space-y-3">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        location.pathname === item.href
                          ? "bg-financial-blue-light text-financial-blue"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          <Link to="/home" className="flex items-center gap-2">
            <img
              src="/src/assets/UBS-logo.png"
              alt="UBS Logo"
              className="w-20"
            />
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-financial-blue",
                    location.pathname === item.href
                      ? "text-financial-blue"
                      : "text-muted-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-2 items-center ml-auto">
          {isLoggedIn ? (
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="w-18 h-9"
            >
              Sign Out
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => navigate("/login")}
                className="w-18 h-9 font-semibold rounded-lg shadow-md"
              >
                Sign In
              </Button>
            </>
          )}
        </div>
      </header>
    </div>
  );
}
