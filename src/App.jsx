import { useEffect, useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { Button } from "./components/button";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className={`${isLoading ? "bg-black" : "bg-white"} min-h-screen`}>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <img src="./src/assets/PIE.png" className="w-52 h-auto" />
        </div>
      ) : (
        <div className="scale-[0.8] origin-top-left md:scale-100">
        <div className="container mx-auto px-4 py-12 md:px-25 md:py-35">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex justify-center md:justify-start w-full md:w-1/2">
              <img
                src="./src/assets/PIE_White.png"
                alt="PIE Logo"
                className="w-full max-w-sm md:max-w-lg"
              />
            </div>
            <div className="text-center md:text-left w-full md:w-1/2 space-y-4">
              <h1 className="text-3xl font-bold">Welcome to PIE</h1>
              <p className="text-gray-700 text-base">
                Investing is no longer one-size-fits-all. With PIE, you unlock a
                tailored journey designed to understand your goals, risk
                appetite, and behavior. Powered by immersive AI, PIE adapts to
                your style and empowers smarter decisions.
              </p>
              <p className="text-sm text-gray-600 font-medium">
                Let’s begin your investor journey — personalized, intuitive, and
                insightful.
              </p>
              <div className="flex justify-center md:justify-start">
                <Button className="text-red-600 bg-white px-4 py-2 text-sm rounded-lg font-medium border border-black">
                  <Link to="/login">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}
