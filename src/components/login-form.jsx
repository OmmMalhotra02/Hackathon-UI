import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// import {Link} from "react-router-dom"

export function LoginForm({ className, ...props }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // localStorage.setItem("isLoggedIn", "true");

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ username, password }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        localStorage.setItem("token", data.access_token);
        const profileRes = await fetch("http://127.0.0.1:8000/users/me", {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        });

        const profile = await profileRes.json();
        console.log("User profile:", profile);

        const now = new Date();
        const lastKYC = profile.kyc_last_completed
          ? new Date(profile.kyc_last_completed)
          : null;
        const needsRenewal =
          lastKYC && now - lastKYC > 2 * 365 * 24 * 60 * 60 * 1000;

        if (!profile.has_completed_kyc || needsRenewal) {
          navigate("/form");
        } else if (!profile.has_completed_chat) {
          navigate("/chat");
        } else {
          navigate("/home");
        }
      } else {
        console.error(data.detail || "Login failed");
      }
    } catch (error) {
      console.log("Error in logging", error);
    }
  };

  return (
    <div className={cn("my-auto md:mt-10 md:px-4 flex justify-center", className)} {...props}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-2xl">
            Welcome Back to PIE
          </CardTitle>
          <CardDescription>
            Securely access your intelligent investment journey.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-3">
              <Label htmlFor="email">Username</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <div className="text-sm text-center">
              <a href="#" className="underline hover:text-blue-600">
                Forgot your username or password?
              </a>
            </div>
            <div className="text-center text-sm mt-2">
              Register for Online Access
              <a
                className="ml-2 underline hover:text-blue-600"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
