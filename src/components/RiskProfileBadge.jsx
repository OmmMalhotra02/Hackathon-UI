import React from "react";
import { Badge } from "./ui/badge";

export const userProfile = localStorage.getItem("profileForm");
export const getRiskProfile = () => {
  const riskScore = userProfile?.risk_tolerance || 5;
  if (riskScore <= 3)
    return { level: "Conservative", color: "bg-green-100 text-green-800" };
  if (riskScore <= 7)
    return { level: "Moderate", color: "bg-yellow-100 text-yellow-800" };
  return { level: "Aggressive", color: "bg-red-100 text-red-800" };
};

function RiskProfileBadge() {
  
  const riskProfile = getRiskProfile();
  return (
    <div>
      <Badge variant="outline" className={riskProfile.color}>
        {riskProfile.level} Investor
      </Badge>
    </div>
  );
}

export default RiskProfileBadge;
