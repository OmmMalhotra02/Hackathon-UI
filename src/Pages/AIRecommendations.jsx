import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Shield,
  Zap,
  Star,
  ArrowRight,
} from "lucide-react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export const AIRecommendations = () => {
  // Generate recommendations based on user profile
  const userProfile = localStorage.getItem("profileForm")
  const getRecommendations = () => {
    const riskScore = userProfile?.risk_tolerance || 5;
    const experience = userProfile?.experience || "intermediate";
    const timeline = userProfile?.timeline || "long";

    const baseRecommendations = [
      {
        id: 1,
        title: "Diversified Index Fund Portfolio",
        description:
          "Low-cost, broad market exposure with automatic rebalancing",
        riskLevel: "Low",
        expectedReturn: "7-9%",
        icon: Shield,
        color: "text-green-600",
        bgColor: "bg-green-50",
        priority: "high",
      },
      {
        id: 2,
        title: "Target-Date Retirement Fund",
        description: "Automatically adjusts allocation based on your timeline",
        riskLevel: "Medium",
        expectedReturn: "6-8%",
        icon: TrendingUp,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        priority: "high",
      },
      {
        id: 3,
        title: "ESG Investment Strategy",
        description:
          "Sustainable investing aligned with environmental and social values",
        riskLevel: "Medium",
        expectedReturn: "6-10%",
        icon: Star,
        color: "text-purple-600",
        bgColor: "bg-purple-50",
        priority: "medium",
      },
      {
        id: 4,
        title: "Growth Stock Portfolio",
        description: "Focus on companies with high growth potential",
        riskLevel: "High",
        expectedReturn: "10-15%",
        icon: Zap,
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        priority: riskScore > 6 ? "high" : "low",
      },
    ];

    // Filter and sort based on user profile
    return baseRecommendations
      .filter((rec) => {
        if (riskScore <= 3 && rec.riskLevel === "High") return false;
        if (riskScore >= 8 && rec.riskLevel === "Low") return false;
        return true;
      })
      .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      })
      .slice(0, 3);
  };

  const recommendations = getRecommendations();

  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
      spacing: 15,
    },
    duration: 1200,
    drag: true,
    mode: "free",
    autoplay: true,
  });

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            AI-Powered Recommendations
          </h2>
          <p className="text-gray-600">
            Personalized investment strategies based on your profile
          </p>
        </div>
      </div>
      {/* <Badge
        variant="secondary"
        className="bg-red-100 text-red-600 -mt-25"
      >
        Powered by AI
      </Badge> */}

      <div className="keen-slider mb-10" ref={sliderRef}>
        {/* Slide 1 */}
        <div className="keen-slider__slide number-slide1 flex flex-col items-center justify-center bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-xl shadow">
          <img
            src="/src/assets/cio1.avif"
            className="w-64 h-40 object-cover rounded-md"
          />
          <h3 className="text-xl font-bold mt-4 text-red-700">
            CIO Benchmarked Strategy
          </h3>
          <p className="text-sm text-gray-600 mt-2 text-left">
            Based on UBS CIO's global benchmarks and investor personas, this
            recommendation aligns with your risk profile.
          </p>
        </div>

        {/* Slide 2 */}
        <div className="keen-slider__slide number-slide2 flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 p-6 rounded-xl shadow">
          <img
            src="/src/assets/growth-graph.png"
            className="w-full max-w-sm h-36 object-contain"
          />
          <h3 className="text-lg font-semibold mt-4 text-blue-700">
            Projected Growth Path
          </h3>
          <p className="text-sm text-gray-600 text-center mt-2">
            Here’s how your portfolio may grow under current market assumptions.
          </p>
        </div>

        {/* Slide 3 (example) */}
        <div className="keen-slider__slide number-slide3 flex flex-col items-center justify-center bg-gradient-to-r from-green-50 to-teal-100 p-6 rounded-xl shadow">
          <img
            src="/src/assets/steps.png"
            className="w-56 h-40 object-contain"
          />
          <h3 className="text-lg font-semibold mt-4 text-green-700">
            Next Steps
          </h3>
          <p className="text-sm text-gray-600 text-center mt-2">
            Confirm your KYC and initiate your first SIP to get started.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {recommendations.map((rec) => {
          const IconComponent = rec.icon;
          return (
            <Card
              key={rec.id}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <CardHeader className="pb-4">
                <div
                  className={`w-12 h-12 ${rec.bgColor} rounded-lg flex items-center justify-center mb-3`}
                >
                  <IconComponent className={`h-6 w-6 ${rec.color}`} />
                </div>
                <CardTitle className="text-lg group-hover:text-red-600 transition-colors">
                  {rec.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {rec.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">Risk Level</div>
                  <Badge
                    variant="outline"
                    className={
                      rec.riskLevel === "Low"
                        ? "border-green-200 text-green-700"
                        : rec.riskLevel === "Medium"
                        ? "border-yellow-200 text-yellow-700"
                        : "border-red-200 text-red-700"
                    }
                  >
                    {rec.riskLevel}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">Expected Return</div>
                  <div className="text-sm font-semibold text-green-600">
                    {rec.expectedReturn}
                  </div>
                </div>

                <Button
                  className="w-full mt-4 group-hover:bg-red-600 transition-colors"
                  variant="outline"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* AI Insights Card */}
      <Card className="mt-6 border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-red-600" />
            <span>AI Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <p className="flex items-start space-x-2">
              <span className="text-red-600">•</span>
              <span>
                Based on your{" "}
                <strong>{userProfile?.experience || "intermediate"}</strong>{" "}
                experience level, we recommend starting with diversified funds.
              </span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="text-red-600">•</span>
              <span>
                Your <strong>{userProfile?.timeline || "long-term"}</strong>{" "}
                timeline allows for growth-oriented strategies.
              </span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="text-red-600">•</span>
              <span>
                Consider dollar-cost averaging to reduce timing risk and build
                positions gradually.
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
