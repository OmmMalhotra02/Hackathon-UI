import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
    <div className="w-full border-b border-black bg-white">
      <header className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Mobile Menu */}
        <div className="flex items-center gap-4 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="py-6 flex flex-col gap-4">
                {["home", "about", "services", "portfolio", "contact"].map(
                  (item) => (
                    <Link
                      key={item}
                      to={`/${item}`}
                      className="text-lg font-semibold"
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </Link>
                  )
                )}
              </div>
            </SheetContent>
          </Sheet>
          <img src="/src/assets/UBS-logo.png" alt="UBS Logo" className="w-16" />
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
          <NavigationMenu>
            <NavigationMenuList className="flex gap-3">
              {["home", "about", "services", "portfolio", "contact"].map(
                (item) => (
                  <NavigationMenuLink asChild key={item}>
                    <Link
                      to={`/${item}`}
                      className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </Link>
                  </NavigationMenuLink>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-2 items-center ml-auto">
          {isLoggedIn ? (
            <Button variant="destructive" onClick={handleLogout}>
              Sign Out
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={() => navigate("/login")}>
                Sign In
              </Button>
              <Button onClick={() => navigate("/register")}>Sign Up</Button>
            </>
          )}
        </div>
      </header>
    </div>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
