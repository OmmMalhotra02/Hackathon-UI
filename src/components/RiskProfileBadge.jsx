import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Info } from "lucide-react"; // Optional icon library like lucide-react
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const defaultProfile = {
  risk_tolerance: 5,
  age: "26-35",
  income: "50k-100k",
  experience: "intermediate",
  timeline: "long",
  goals: "steady-growth",
};

let exportUserProfile = defaultProfile;

export const getRiskProfile = (riskScore) => {
  if (riskScore == -1)
    return {
      level: "Not Assessed",
      color: "bg-gray-100 text-gray-800",
      score: "N/A",
    };
  if (riskScore>=0 && riskScore <= 3)
    return {
      level: "Conservative",
      color: "from-green-200 to-green-400 text-green-900",
      icon: "🛡️",
      description:
        "You prefer stable investments with lower risk and steady returns",
      allocation: { stocks: 30, bonds: 60, alternatives: 10 },
    };
  if (riskScore >= 3 && riskScore <= 7)
    return {
      level: "Moderate",
      color: "from-yellow-200 to-yellow-400 text-yellow-900",
      icon: "⚖️",
      description:
        "You balance risk and return with a mix of growth and stability",
      allocation: { stocks: 60, bonds: 30, alternatives: 10 },
    };
  return {
    level: "Aggressive",
    color: "from-red-200 to-red-400 text-red-900",
    icon: "🚀",
    description:
      "You seek higher returns and are comfortable with market volatility",
    allocation: { stocks: 80, bonds: 15, alternatives: 5 },
  };
};

function RiskProfileBadge() {
  const [riskProfile, setRiskProfile] = useState(null);

  useEffect(() => {
    fetch("/api/user/profile")
      .then((res) => {
        if (
          !res.ok ||
          !res.headers.get("content-type")?.includes("application/json")
        ) {
          throw new Error("Invalid JSON response");
        }
        return res.json();
      })
      .then((data) => {
        exportUserProfile = data;
        setRiskProfile(getRiskProfile(data.risk_tolerance || 5));
      })
      .catch((err) => {
        console.log("Using fallback profile due to error:", err);
        exportUserProfile = defaultProfile;
        setRiskProfile(getRiskProfile(defaultProfile.risk_tolerance));
      });
  }, []);

  if (!riskProfile) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="mt-2 mb-2">
            <div
              className={`inline-flex items-center gap-2 px-2 py-2 rounded-full bg-gradient-to-r ${riskProfile.color} shadow-md transition-transform hover:scale-105 cursor-pointer`}
            >
              <span className="text-lg">{riskProfile.icon}</span>
              <span className="font-semibold text-sm tracking-wide">
                {riskProfile.level} Investor
              </span>
              <Info size={16} className="text-muted-foreground" />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm text-muted-foreground w-64">
            {riskProfile.description}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export { exportUserProfile as userProfile };
export default RiskProfileBadge;
