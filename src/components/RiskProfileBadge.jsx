import {useEffect, useState} from "react";
import { Badge } from "./ui/badge";

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
  // const riskScore = userProfile?.risk_tolerance || 5;
  if (riskScore <= 3)
    return {
      level: "Conservative",
      color: "bg-green-100 text-green-800",
      description:
        "You prefer stable investments with lower risk and steady returns",
      allocation: { stocks: 30, bonds: 60, alternatives: 10 },
    };
  if (riskScore <= 7)
    return {
      level: "Moderate",
      color: "bg-yellow-100 text-yellow-800",
      description:
        "You balance risk and return with a mix of growth and stability",
      allocation: { stocks: 60, bonds: 30, alternatives: 10 },
    };
  return {
    level: "Aggressive",
    color: "bg-red-100 text-red-800",
    description:
      "You seek higher returns and are comfortable with market volatility",
    allocation: { stocks: 80, bonds: 15, alternatives: 5 },
  };
};

function RiskProfileBadge() {
  // const riskProfile = getRiskProfile();
  const [riskProfile, setRiskProfile] = useState(null);

  useEffect(()=>{
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
  },[])
  if (!riskProfile) return null;
  return (
    <div>
      <Badge variant="outline" className={riskProfile.color}>
        {riskProfile.level} Investor
      </Badge>
    </div>
  );
}

export { exportUserProfile as userProfile };
export default RiskProfileBadge;
