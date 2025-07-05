import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import Layout from "@/components/Layout";
import {
  Bot,
  Shield,
  BarChart3,
  Users,
  TrendingUp,
  Lock,
  CheckCircle,
  ArrowRight,
  Star,
  Globe,
  Zap,
} from "lucide-react";
import "./App.css";

export default function App() {
  const features = [
    {
      icon: Bot,
      title: "AI-Powered Onboarding",
      description:
        "Smart chatbot guides you through personalized investment profiling with intelligent questions and recommendations.",
    },
    {
      icon: Shield,
      title: "Risk Assessment",
      description:
        "Comprehensive risk profiling using advanced algorithms to match your investment comfort level and goals.",
    },
    {
      icon: BarChart3,
      title: "Portfolio Analytics",
      description:
        "Real-time portfolio tracking with detailed analytics and performance insights for informed decisions.",
    },
    {
      icon: Users,
      title: "Expert Support",
      description:
        "Access to professional investment advisors and personalized recommendations based on your profile.",
    },
    {
      icon: TrendingUp,
      title: "Market Insights",
      description:
        "Stay informed with real-time market data, trends, and opportunities tailored to your risk profile.",
    },
    {
      icon: Lock,
      title: "Bank-Level Security",
      description:
        "Enterprise-grade security with 256-bit encryption and multi-factor authentication for your peace of mind.",
    },
  ];

  const stats = [
    { value: "50K+", label: "Active Investors" },
    { value: "$2.5B+", label: "Assets Under Management" },
    { value: "99.9%", label: "Uptime Guarantee" },
    { value: "4.9/5", label: "Customer Rating" },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Portfolio Manager",
      content:
        "The AI onboarding process was incredibly intuitive. It understood my risk tolerance perfectly and created a portfolio that aligns with my goals.",
      rating: 5,
    },
    {
      name: "Michael Rodriguez",
      role: "Financial Advisor",
      content:
        "As a professional, I appreciate the sophisticated risk assessment tools. The platform provides insights that help me better serve my clients.",
      rating: 5,
    },
    {
      name: "Emma Thompson",
      role: "Retail Investor",
      content:
        "I was new to investing, but the AI chatbot made everything so easy to understand. Now I feel confident about my investment decisions.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen relative z-10 sm:m-10">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-gray-200 text-red-600 text-[16px] font-semibold">
                  AI-Powered Investment Platform
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-semibold tracking-tight">
                  Smart Investing
                  <span className="block text-financial-blue">Made Simple</span>
                </h1>
                <p className="text-[18px] text-muted-foreground max-w-lg">
                  Create your personalized investment profile with our AI
                  chatbot, assess your risk tolerance, and start building wealth
                  with confidence.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link to="/login">
                    <Bot className="mr-2 h-5 w-5" />
                    Start AI Onboarding
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-lg px-8"
                >
                  <Link to="/dashboard">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    View Dashboard
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4 ml-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-muted-foreground">
                    No setup fees
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-muted-foreground">
                    Free risk assessment
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-muted-foreground">
                    24/7 support
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl/40 p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-red-600 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">AI Investment Assistant</p>
                      <p className="text-sm text-muted-foreground">
                        Ready to help you get started
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm">
                        Hi! I'm here to help you create your investment profile.
                        What are your main financial goals?
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left h-auto p-4"
                      >
                        <div>
                          <p className="font-medium">Retirement Planning</p>
                          <p className="text-sm text-muted-foreground">
                            Long-term wealth building
                          </p>
                        </div>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left h-auto p-4"
                      >
                        <div>
                          <p className="font-medium">Short-term Growth</p>
                          <p className="text-sm text-muted-foreground">
                            3-5 year investment horizon
                          </p>
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background decorations */}
              <div className="absolute -top-3 -right-3 h-20 w-20 bg-orange-200 rounded-full" />
              <div className="absolute -bottom-4 -left-4 h-24 w-24 bg-green-200 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-red-600">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold">
              Why Choose <span className="text-red-600">PIE </span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform combines cutting-edge AI technology with proven
              investment strategies to deliver personalized financial solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-red-200 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-red-600" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold">
              Trusted by Investors
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our users say about their experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-xl">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-red-600 text-red-600"
                      />
                    ))}
                  </div>
                  <CardDescription className="text-base italic">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="container text-center">
          <div className="space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold">
              Ready to Start Your Investment Journey?
            </h2>
            <p className="text-xl opacity-90">
              Join thousands of smart investors who trust InvestorAI for their
              financial future. Get started in minutes with our AI-powered
              onboarding.
            </p>
            <div className="flex flex-col mx-10 sm:flex-row gap-4 justify-center pt-4">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="w-60 text-lg px-8"
              >
                <Link to="/login">
                  Start Free Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg px-8 border-white text-black"
              >
                <Link to="/risk-profile">View Risk Profile Tool</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

//   return (
//     <div
//       className={`${
//         isLoading ? "bg-black" : "bg-white"
//       } min-h-screen relative z-10`}
//     >
//       {isLoading ? (
//         <div className="flex justify-center items-center h-full">
//           <img src="./src/assets/PIE.png" className="w-52 h-auto" />
//         </div>
//       ) : (
//         <div className="pt-4 md:pt-10 px-2 md:px-6 text-sm  scale-[0.8] origin-top-left md:scale-100">
//           <div className="container mx-auto px-4 py-12 md:px-25 md:py-35">
//             <div className="flex flex-col md:flex-row items-center gap-10">
//               <div className="z-1 flex justify-center md:justify-start w-full md:w-1/2">
//                 <img
//                   src="./src/assets/PIE_White.png"
//                   alt="PIE Logo"
//                   className="w-full max-w-sm md:max-w-lg"
//                 />
//               </div>
//               <div className="text-center md:text-left w-full md:w-1/2 space-y-4">
//                 <h1 className="text-3xl font-bold">Welcome to PIE</h1>
//                 <p className="text-gray-700 text-base">
//                   Investing is no longer one-size-fits-all. With PIE, you unlock
//                   a tailored journey designed to understand your goals, risk
//                   appetite, and behavior. Powered by immersive AI, PIE adapts to
//                   your style and empowers smarter decisions.
//                 </p>
//                 <p className="text-sm text-gray-600 font-medium">
//                   Let’s begin your investor journey — personalized, intuitive,
//                   and insightful.
//                 </p>
//                 <div className="flex justify-center md:justify-start">
//                   <Button className="text-red-600 bg-white px-4 py-2 text-sm rounded-lg font-medium border border-black">
//                     <Link to="/login">Get Started</Link>
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
