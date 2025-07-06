import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Shield,
  Target,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Clock,
  DollarSign,
  User,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import RiskProfileBadge, {
  getRiskProfile,
  userProfile,
} from "../components/RiskProfileBadge";

const RiskProfile = () => {
  const navigate = useNavigate();
  const riskProfile = getRiskProfile();


  const riskFactors = [
    {
      factor: "Age & Timeline",
      score:
        userProfile.timeline === "retirement"
          ? 9
          : userProfile.timeline === "long"
          ? 7
          : 5,
      description: `${userProfile.age} with ${userProfile.timeline}-term goals`,
    },
    {
      factor: "Experience Level",
      score:
        userProfile.experience === "expert"
          ? 9
          : userProfile.experience === "advanced"
          ? 7
          : userProfile.experience === "intermediate"
          ? 5
          : 3,
      description: `${userProfile.experience} investment knowledge`,
    },
    {
      factor: "Risk Tolerance",
      score: userProfile.risk_tolerance || 5,
      description: `Comfort level: ${userProfile.risk_tolerance}/10`,
    },
    {
      factor: "Financial Capacity",
      score:
        userProfile.income === "over-500k"
          ? 9
          : userProfile.income === "200k-500k"
          ? 7
          : userProfile.income === "100k-200k"
          ? 6
          : 4,
      description: `Income: ${userProfile.income?.replace("-", " - $")}`,
    },
  ];

  const recommendations = [
    {
      title: "Portfolio Diversification",
      description:
        "Spread investments across different asset classes to reduce risk",
      priority: "High",
      icon: BarChart3,
    },
    {
      title: "Regular Rebalancing",
      description:
        "Review and adjust your portfolio quarterly to maintain target allocation",
      priority: "Medium",
      icon: Target,
    },
    {
      title: "Emergency Fund",
      description:
        "Maintain 3-6 months of expenses in liquid savings before investing",
      priority: "High",
      icon: Shield,
    },
    {
      title: "Dollar-Cost Averaging",
      description: "Invest fixed amounts regularly to reduce timing risk",
      priority: "Medium",
      icon: Clock,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="flex justify-between items-center sm:mt-5 mb-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="flex space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>
        <div className="sm:mr-8">
          <RiskProfileBadge />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Risk Profile
          </h1>
          <p className="text-gray-600">
            Complete analysis based on your assessment responses
          </p>
        </div>

        {/* Risk Level Summary */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl flex items-center space-x-3">
                  <Shield className="h-8 w-8 text-blue-600" />
                  <span>{riskProfile.level} Risk Profile</span>
                </CardTitle>
                <CardDescription className="text-lg mt-2">
                  {riskProfile.description}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">
                  {userProfile.risk_tolerance}/10
                </div>
                <div className="text-sm text-gray-500">Risk Score</div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Risk Factors Analysis */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <span>Risk Factors Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {riskFactors.map((factor, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{factor.factor}</span>
                    <span className="text-sm text-blue-600 font-semibold">
                      {factor.score}/10
                    </span>
                  </div>
                  <Progress value={factor.score * 10} className="h-2" />
                  <p className="text-sm text-gray-600">{factor.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recommended Allocation */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span>Recommended Allocation</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Stocks (Equities)</span>
                    <span className="text-sm text-gray-600">
                      {riskProfile.allocation.stocks}%
                    </span>
                  </div>
                  <Progress
                    value={riskProfile.allocation.stocks}
                    className="h-3"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Bonds (Fixed Income)</span>
                    <span className="text-sm text-gray-600">
                      {riskProfile.allocation.bonds}%
                    </span>
                  </div>
                  <Progress
                    value={riskProfile.allocation.bonds}
                    className="h-3"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Alternative Investments</span>
                    <span className="text-sm text-gray-600">
                      {riskProfile.allocation.alternatives}%
                    </span>
                  </div>
                  <Progress
                    value={riskProfile.allocation.alternatives}
                    className="h-3"
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() =>
                    navigate("/portfolio-strategy", { state: { userProfile } })
                  }
                >
                  View Detailed Strategy
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Risk Management Recommendations */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Risk Management Recommendations</span>
            </CardTitle>
            <CardDescription>
              Key strategies to optimize your investment approach
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {recommendations.map((rec, index) => {
                const IconComponent = rec.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <IconComponent className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-gray-900">
                          {rec.title}
                        </h4>
                        <Badge
                          variant={
                            rec.priority === "High" ? "default" : "secondary"
                          }
                          className="text-xs"
                        >
                          {rec.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{rec.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Profile Summary */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-blue-600" />
              <span>Profile Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 capitalize">
                  {userProfile.age?.replace("-", " - ")}
                </div>
                <div className="text-sm text-gray-600">Age Range</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 capitalize">
                  {userProfile.experience}
                </div>
                <div className="text-sm text-gray-600">Experience</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 capitalize">
                  {userProfile.timeline}
                </div>
                <div className="text-sm text-gray-600">Timeline</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-gray-900 capitalize">
                  {userProfile.goals?.replace("-", " ")}
                </div>
                <div className="text-sm text-gray-600">Primary Goal</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RiskProfile;
