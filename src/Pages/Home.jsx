// Home.jsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import RiskProfileBadge, {getRiskProfile, userProfile} from "../components/RiskProfileBadge"
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  Shield,
  Target,
  PieChart,
  BarChart3,
  DollarSign,
} from "lucide-react";
import { AIRecommendations } from "./AIRecommendations";

// export default function Home() {
//   const navigate = useNavigate();

//   return (
//     <div className="container py-8 px-4 space-y-8">
//       {/* Header Section */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <h1 className="text-2xl font-bold">Welcome back!</h1>
//         <Avatar onClick={() => navigate("/profile")} className="cursor-pointer">
//           <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
//           <AvatarFallback>UB</AvatarFallback>
//         </Avatar>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Investment Growth</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={data}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="value"
//                 stroke="#2563eb"
//                 strokeWidth={2}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       <Card className="bg-gray-100 dark:bg-gray-900">
//         <CardHeader>
//           <CardTitle>Your Preferences</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
//             <li>
//               <strong>Risk Appetite:</strong> Moderate
//             </li>
//             <li>
//               <strong>Investment Goals:</strong> Retirement, Education
//             </li>
//             <li>
//               <strong>Preferred Instruments:</strong> Mutual Funds, Stocks
//             </li>
//             <li>
//               <strong>Duration:</strong> 5 Years
//             </li>
//           </ul>
//           <div className="mt-4">
//             <Button onClick={() => navigate("/chat")}>
//               Change Preferences
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Stats Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Monthly Contribution</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl sm:text-3xl font-semibold text-green-600">
//               ₹15,000
//             </p>
//             <p className="text-sm text-gray-500">
//               Auto-debited from savings account
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Target Portfolio Value</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl sm:text-3xl font-semibold text-blue-600">
//               ₹12,00,000
//             </p>
//             <p className="text-sm text-gray-500">
//               Based on your current inputs
//             </p>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }


export default function Home () {
  const navigate = useNavigate()
  const riskProfile = getRiskProfile();
  // Calculate risk profile based on answers

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="md:flex -mt-4 mb-3">
          <RiskProfileBadge/>
        </div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Your Investment Dashboard
          </h1>
          <p className="text-gray-600">
            Based on your profile, we've created personalized recommendations to
            help you achieve your financial goals.
          </p>
        </div>

        {/* Profile Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Risk Profile
              </CardTitle>
              <Shield className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{riskProfile.level}</div>
              <p className="text-xs text-muted-foreground">
                Score: {{userProfile}?.risk_tolerance || 5}/10
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Investment Timeline
              </CardTitle>
              <Target className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize text-red-600">
                {userProfile?.timeline?.replace("-", " ") || "Long-term"}
              </div>
              <p className="text-xs text-muted-foreground">Primary horizon</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Experience Level
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize text-red-600">
                {userProfile?.experience || "Intermediate"}
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
              <DollarSign className="h-4 w-4 text-muted-foreground text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold capitalize text-red-600">
                {userProfile?.goals?.replace("-", " ") || "Steady Growth"}
              </div>
              <p className="text-xs text-muted-foreground">
                Investment objective
              </p>
            </CardContent>
          </Card>
        </div>

        {/* AI Recommendations Section */}
        <AIRecommendations userProfile={userProfile} />

        {/* Portfolio Allocation Preview */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5 text-red-600" />
              <span>Recommended Portfolio Allocation</span>
            </CardTitle>
            <CardDescription>
              Based on your risk profile and investment goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-small font-medium">
                    Stocks (Equities)
                  </span>
                  <span className="text-sm text-gray-600">60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-small font-medium">
                    Bonds (Fixed Income)
                  </span>
                  <span className="text-sm text-gray-600">30%</span>
                </div>
                <Progress value={30} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-small font-medium">
                    Alternative Investments
                  </span>
                  <span className="text-sm text-gray-600">10%</span>
                </div>
                <Progress value={10} className="h-2" />
              </div>
            </div>
            <div className="mt-6 pt-4 border-t">
              <Button className="w-full bg-red-600" onClick={()=>navigate('/dashboard')}>
                View Detailed Portfolio Strategy
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};