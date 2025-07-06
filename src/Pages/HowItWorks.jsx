import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ScrollText, Goal, ChartNoAxesCombined } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    icon: ScrollText,
    title: "Complete Assessment",
    description: "Risk profiling and investment capacity analysis.",
    color: "bg-red-600 text-white",
    textColor: "text-white",
  },
  {
    icon: Goal,
    title: "AI Goal-Based Planning",
    description: "Strategies aligned with your financial goals.",
    color: "bg-white text-gray-600",
    textColor: "text-gray-800",
  },
  {
    icon: ChartNoAxesCombined,
    title: "AI + CIO Benchmark",
    description: "Receive personalized portfolio recommendations.",
    color: "bg-gray-600 text-white",
    textColor: "text-white",
  },
];

export default function HowItWorks() {
  const navigate = useNavigate();
  const [cardIndex, setCardIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cardIndex < steps.length - 1) {
        setCardIndex(cardIndex + 1);
      } else {
        navigate("/form");
      }
    }, 3500);

    return () => clearTimeout(timer);
  }, [cardIndex, navigate]);

  const { icon: Icon, title, description, color, textColor } = steps[cardIndex];

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-white px-4 transition-colors duration-500`}
    >
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={cardIndex}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8 }}
            className={`${color} w-full rounded-xl shadow-xl/30 h-[90vh] flex flex-col justify-center p-8 text-center`}
          >
            <div
              className={`mx-auto w-20 h-20 rounded-full bg-white flex items-center justify-center mb-6`}
            >
              <Icon className="h-15 w-15 text-black" />
            </div>
            <h2 className={`${textColor}text-white mb-3 text-[32px] font-[700]`}>
              {title}
            </h2>
            <p className={`${textColor}text-white font-500`}>{description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
