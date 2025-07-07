import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  TrendingUp,
  Shield,
  Target,
  Calendar,
  DollarSign,
  BarChart3,
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Settings,
} from "lucide-react";
import ProfileMenu from "@/components/ProfileMenu";

const Profile = () => {
  const location = useLocation();
  const [userProfile, setUserProfile] = useState(
    location.state?.userProfile || null
  );

  // Mock user data - in a real app, this would come from your auth system
  const mockUserData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    memberSince: "January 2024",
    avatar: "/placeholder.svg",
  };

  const getRiskProfile = () => {
    if (!userProfile)
      return {
        level: "Not Assessed",
        color: "bg-gray-100 text-gray-800",
        score: "N/A",
      };

    const riskScore = userProfile.risk_tolerance || 5;
    if (riskScore <= 3)
      return {
        level: "Conservative",
        color: "bg-green-100 text-green-800",
        score: riskScore,
      };
    if (riskScore <= 7)
      return {
        level: "Moderate",
        color: "bg-yellow-100 text-yellow-800",
        score: riskScore,
      };
    return {
      level: "Aggressive",
      color: "bg-red-100 text-red-800",
      score: riskScore,
    };
  };

  const riskProfile = getRiskProfile();

  const formatFieldValue = (value) => {
    if (typeof value === "string") {
      return value.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    }
    return value?.toString() || "Not specified";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <Avatar className="h-24 w-24 border-4 border-blue-200">
                  <AvatarImage src={mockUserData.avatar} alt="Profile" />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-2xl font-bold">
                    {mockUserData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {mockUserData.name}
                  </h1>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center justify-center md:justify-start space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>{mockUserData.email}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start space-x-2">
                      <Phone className="h-4 w-4" />
                      <span>{mockUserData.phone}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{mockUserData.location}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>Member since {mockUserData.memberSince}</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Investment Profile Summary */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Risk Profile
              </CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{riskProfile.level}</div>
              <p className="text-xs text-muted-foreground">
                Score: {riskProfile.score}/10
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Investment Timeline
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatFieldValue(userProfile?.timeline) || "Long-term"}
              </div>
              <p className="text-xs text-muted-foreground">Primary horizon</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Experience Level
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatFieldValue(userProfile?.experience) || "Intermediate"}
              </div>
              <p className="text-xs text-muted-foreground">
                Investment knowledge
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Primary Goal
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">
                {formatFieldValue(userProfile?.goals) || "Steady Growth"}
              </div>
              <p className="text-xs text-muted-foreground">
                Investment objective
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Profile Information */}
        {userProfile && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-blue-600" />
                <span>Assessment Details</span>
              </CardTitle>
              <CardDescription>
                Complete profile information captured during your investment
                assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(userProfile).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {key
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </span>
                      <span className="text-sm text-gray-900 text-right max-w-xs">
                        {formatFieldValue(value)}
                      </span>
                    </div>
                    <Separator />
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t">
                <p className="text-sm text-gray-500 mb-4">
                  This information helps us provide personalized investment
                  recommendations tailored to your needs.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Update Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* No Profile Data Message */}
        {!userProfile && (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Complete Your Investment Profile
              </h3>
              <p className="text-gray-600 mb-6">
                Take our comprehensive assessment to get personalized investment
                recommendations.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Start Assessment
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Profile;
