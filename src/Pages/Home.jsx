// Home.jsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Jan", value: 2000 },
  { name: "Feb", value: 2600 },
  { name: "Mar", value: 2800 },
  { name: "Apr", value: 3200 },
  { name: "May", value: 4000 },
  { name: "Jun", value: 4500 },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container py-8 px-4 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Welcome back!</h1>
        <Avatar onClick={() => navigate("/profile")} className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
          <AvatarFallback>UB</AvatarFallback>
        </Avatar>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Investment Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-gray-100 dark:bg-gray-900">
        <CardHeader>
          <CardTitle>Your Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
            <li>
              <strong>Risk Appetite:</strong> Moderate
            </li>
            <li>
              <strong>Investment Goals:</strong> Retirement, Education
            </li>
            <li>
              <strong>Preferred Instruments:</strong> Mutual Funds, Stocks
            </li>
            <li>
              <strong>Duration:</strong> 5 Years
            </li>
          </ul>
          <div className="mt-4">
            <Button onClick={() => navigate("/chat")}>
              Change Preferences
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Contribution</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl sm:text-3xl font-semibold text-green-600">
              ₹15,000
            </p>
            <p className="text-sm text-gray-500">
              Auto-debited from savings account
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Target Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl sm:text-3xl font-semibold text-blue-600">
              ₹12,00,000
            </p>
            <p className="text-sm text-gray-500">
              Based on your current inputs
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
