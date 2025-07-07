import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Shield,
  BarChart3,
  MessageSquare,
  Settings,
  LogOut,
  TrendingUp,
  Target,
} from "lucide-react";
import { ModeToggle } from "./mode-toggle";

const ProfileMenu = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSignOut = () => {
    // Handle sign out logic here
    console.log("User signed out");
    navigate("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full hover:bg-blue-50 transition-colors -mr-4"
        >
          <Avatar className="h-10 w-10 border-2 border-blue-200 hover:border-blue-300 transition-colors">
            <AvatarImage src="/placeholder.svg" alt="Profile" />
            <AvatarFallback className="bg-gradient-to-r from-red-600 to-red-400 text-white font-semibold">
              JD
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-64 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-xl rounded-lg p-2"
        align="end"
        sideOffset={8}
      >
        <DropdownMenuLabel className="px-3 py-2">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold text-gray-900">John Doe</p>
            <p className="text-xs text-gray-500">john.doe@example.com</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem
          onClick={() => handleNavigation("/profile")}
          className="flex items-center px-3 py-2 hover:bg-blue-50 rounded-md cursor-pointer transition-colors"
        >
          <User className="mr-3 h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium">User Profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleNavigation("/dashboard")}
          className="flex items-center px-3 py-2 hover:bg-green-50 rounded-md cursor-pointer transition-colors"
        >
          <BarChart3 className="mr-3 h-4 w-4 text-green-600" />
          <span className="text-sm font-medium">Portfolio Performance</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleNavigation("/dashboard#ciorecommendations")}
          className="flex items-center px-3 py-2 hover:bg-purple-50 rounded-md cursor-pointer transition-colors"
        >
          <MessageSquare className="mr-3 h-4 w-4 text-purple-600" />
          <span className="text-sm font-medium">CIO Recommendations</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleNavigation("/")}
          className="flex items-center px-3 py-2 hover:bg-indigo-50 rounded-md cursor-pointer transition-colors"
        >
          <TrendingUp className="mr-3 h-4 w-4 text-indigo-600" />
          <span className="text-sm font-medium">Dashboard</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2" />

        {/* <DropdownMenuItem */}
          {/* // onClick={() => handleNavigation("/signin")} */}
          {/* className="flex items-center px-3 py-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors" */}
        {/* > */}
          <ModeToggle/>
        {/* </DropdownMenuItem> */}

        <DropdownMenuItem
          onClick={() => handleNavigation("")}
          className="flex items-center px-3 py-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors"
        >
          <Settings className="mr-3 h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium">Account Settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem
          onClick={handleSignOut}
          className="flex items-center px-3 py-2 hover:bg-red-50 rounded-md cursor-pointer transition-colors text-red-600"
        >
          <LogOut className="mr-3 h-4 w-4" />
          <span className="text-sm font-medium">Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
