// Dashboard
import { useState, useEffect } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  Shield,
  Target,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  User,
  Home,
  ArrowLeft
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

import { useNavigate } from "react-router-dom";
import RiskProfileBadge from "../components/RiskProfileBadge";
import { ResponsivePie } from "@nivo/pie";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("1Y");
  const [selectedMetric, setSelectedMetric] = useState("returns");
  const [selectedChart, setSelectedChart] = useState("performance");

  // Sample data for charts
  const defaultPerformanceData = [
    { month: "Jan", portfolio: 8.2, cio: 7.8, sp500: 6.5 },
    { month: "Feb", portfolio: 9.1, cio: 8.2, sp500: 7.1 },
    { month: "Mar", portfolio: 12.3, cio: 10.1, sp500: 9.8 },
    { month: "Apr", portfolio: 11.8, cio: 9.9, sp500: 8.9 },
    { month: "May", portfolio: 13.2, cio: 11.5, sp500: 10.2 },
    { month: "Jun", portfolio: 2.1, cio: 3.8, sp500: 5.6 },
    { month: "Jul", portfolio: 6.6, cio: 8.3, sp500: 9.2 },
    { month: "Aug", portfolio: 11.2, cio: 13.9, sp500: 12.8 },
    { month: "Sep", portfolio: 15.8, cio: 13.5, sp500: 12.3 },
    { month: "Oct", portfolio: 17.3, cio: 14.8, sp500: 13.9 },
    { month: "Nov", portfolio: 18.1, cio: 15.2, sp500: 14.1 },
    { month: "Dec", portfolio: 19.5, cio: 16.1, sp500: 15.2 },
  ];

  const defaultAllocationData = [
    { name: "US Equities", value: 35, color: "#3b82f6" },
    { name: "International", value: 20, color: "#10b981" },
    { name: "Bonds", value: 25, color: "#f59e0b" },
    { name: "REITs", value: 10, color: "#ef4444" },
    { name: "Commodities", value: 10, color: "#8b5cf6" },
  ];

  const defaultRiskMetrics = [
    { metric: "Volatility", portfolio: "12.3%", cio: "14.1%", status: "lower" },
    {
      metric: "Sharpe Ratio",
      portfolio: "1.58",
      cio: "1.42",
      status: "higher",
    },
    {
      metric: "Max Drawdown",
      portfolio: "-8.2%",
      cio: "-11.5%",
      status: "lower",
    },
    { metric: "Beta", portfolio: "0.85", cio: "0.92", status: "lower" },
  ];

  const chartConfig = {
    portfolio: { label: "Your Portfolio", color: "#3b82f6" },
    cio: { label: "CIO Benchmark", color: "#10b981" },
    sp500: { label: "S&P 500", color: "#f59e0b" },
  };

  const [performanceData, setPerformanceData] = useState(
    defaultPerformanceData
  );
  const [allocationData, setAllocationData] = useState(defaultAllocationData);
  const [riskMetrics, setRiskMetrics] = useState(defaultRiskMetrics);

  useEffect(() => {
    Promise.allSettled([
      fetch("/api/performance").then((res) =>
        res.ok ? res.json() : Promise.reject()
      ),
      fetch("/api/allocation").then((res) =>
        res.ok ? res.json() : Promise.reject()
      ),
      fetch("/api/riskmetrics").then((res) =>
        res.ok ? res.json() : Promise.reject()
      ),
    ]).then(([perf, alloc, risk]) => {
      if (perf.status === "fulfilled") setPerformanceData(perf.value);
      if (alloc.status === "fulfilled") setAllocationData(alloc.value);
      if (risk.status === "fulfilled") setRiskMetrics(risk.value);
    });
  }, []);

  const formattedData = allocationData.map((item) => ({
    id: item.name,
    label: item.name,
    value: item.value,
    color: item.color,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="flex justify-between items-center sm:mt-5 ">
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
      {/* <div className="">
        <Button variant="outline" size="sm">
          <User className="h-4 w-4 mr-2" />
          Profile
        </Button>
      </div> */}
      <div className="container mx-auto px-4 py-8 mb-2">
        {/* Performance Overview */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Portfolio Performance
              </h1>
              <p className="text-gray-600">
                Comprehensive analysis vs CIO benchmark and market indices
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32 sm:mr-8 border-red-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1M">1 Month</SelectItem>
                  <SelectItem value="3M">3 Months</SelectItem>
                  <SelectItem value="6M">6 Months</SelectItem>
                  <SelectItem value="1Y">1 Year</SelectItem>
                  <SelectItem value="3Y">3 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="border-0 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Return</p>
                    <p className="text-2xl font-bold text-green-600">+19.5%</p>
                  </div>
                  <ArrowUpRight className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-gray-500 mt-1">vs CIO: +16.1%</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Volatility</p>
                    <p className="text-2xl font-bold text-blue-600">12.3%</p>
                  </div>
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-gray-500 mt-1">Lower risk profile</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Sharpe Ratio</p>
                    <p className="text-2xl font-bold text-purple-600">1.58</p>
                  </div>
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Risk-adjusted returns
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Alpha</p>
                    <p className="text-2xl font-bold text-orange-600">+3.4%</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-orange-600" />
                </div>
                <p className="text-xs text-gray-500 mt-1">Outperformance</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Chart Selection Dropdown */}
        <div className="flex items-center space-x-4 mb-8">
          <Select value={selectedChart} onValueChange={setSelectedChart}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select Chart" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="performance">
                Performance Comparison
              </SelectItem>
              <SelectItem value="allocation">Asset Allocation</SelectItem>
              <SelectItem value="risk">Risk Analysis</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Conditionally Render Chart Sections */}
        {selectedChart === "performance" && (
          <Card className="border-0 shadow-lg mb-8">
            <CardHeader>
              <CardTitle>Portfolio vs CIO Benchmark Performance</CardTitle>
              <CardDescription>
                12-month rolling performance comparison
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={chartConfig}
                className="h-80 w-80 -ml-14 sm:w-auto sm:mx-auto sm:max-h-min"
              >
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="portfolio"
                    stroke="var(--color-portfolio)"
                    strokeWidth={3}
                  />
                  <Line
                    type="monotone"
                    dataKey="cio"
                    stroke="var(--color-cio)"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                  <Line
                    type="monotone"
                    dataKey="sp500"
                    stroke="var(--color-sp500)"
                    strokeWidth={2}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        )}

        {selectedChart === "allocation" && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Current Asset Allocation</CardTitle>
                <CardDescription>
                  Portfolio distribution by asset class
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsivePie
                  data={formattedData}
                  margin={{ top: 20, right: 60, bottom: 60, left: 60 }}
                  innerRadius={0.5}
                  padAngle={1}
                  cornerRadius={5}
                  activeOuterRadiusOffset={8}
                  colors={{ datum: "data.color" }}
                  borderWidth={1}
                  borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                  arcLinkLabelsSkipAngle={10}
                  arcLinkLabelsTextColor="#4B5563"
                  arcLinkLabelsThickness={2}
                  arcLinkLabelsColor={{ from: "color" }}
                  arcLabelsSkipAngle={10}
                  arcLabelsTextColor={{
                    from: "color",
                    modifiers: [["darker", 2]],
                  }}
                  tooltip={({ datum }) => (
                    <div className="rounded bg-white px-3 py-1 shadow text-sm text-gray-800">
                      <strong>{datum.label}</strong>: {datum.value}%
                    </div>
                  )}
                />
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Allocation Details</CardTitle>
                <CardDescription>Target vs actual allocation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allocationData.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-4 h-4 rounded`}
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold">{item.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedChart === "risk" && (
          <Card className="border-0 shadow-lg mb-8">
            <CardHeader>
              <CardTitle>Risk Metrics Comparison</CardTitle>
              <CardDescription>
                Your portfolio vs CIO benchmark risk profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskMetrics.map((metric, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1 sm:ml-10">
                      <h4 className="font-medium">{metric.metric}</h4>
                    </div>
                    <div className="flex items-center space-x-8 sm:mr-15">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Your Portfolio</p>
                        <p className="font-bold text-blue-600">
                          {metric.portfolio}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">CIO Benchmark</p>
                        <p className="font-bold text-gray-900">{metric.cio}</p>
                      </div>
                      <div className="text-center">
                        {metric.status === "higher" ? (
                          <ArrowUpRight className="h-5 w-5 text-green-600 mx-auto" />
                        ) : (
                          <ArrowDownRight className="h-5 w-5 text-red-600 mx-auto" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* CIO Recommendation Cards */}
        <div id="ciorecommendations" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            CIO Recommendations
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Tactical Allocation</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Consider increasing international equity exposure by 5% given
                  current market conditions and valuations.
                </p>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  High Priority
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Risk Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Portfolio volatility is well-controlled. Consider adding
                  defensive positions if market uncertainty increases.
                </p>
                <Badge
                  variant="secondary"
                  className="bg-yellow-100 text-yellow-800"
                >
                  Medium Priority
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Sector Rotation</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Technology sector allocation appears optimal. Monitor for
                  rebalancing opportunities in Q2.
                </p>
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800"
                >
                  Monitor
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button className="flex-1 bg-red-600 hover:bg-red-700">
            Implement Recommendations
          </Button>
          <Button variant="outline" className="flex-1">
            Download Portfolio Report
          </Button>
          <Button variant="outline" className="flex-1">
            Schedule CIO Review
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
