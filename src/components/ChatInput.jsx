import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles } from "lucide-react";


export const ChatInput = ({
  onSendMessage,
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !disabled) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-4">
      <div className="relative flex-1">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Share your investment goals and preferences..."
          disabled={disabled}
          className="pr-12 h-12 border-2 border-purple-200 focus:border-purple-400 rounded-xl bg-white/80 backdrop-blur-sm placeholder:text-gray-500 transition-all duration-300 focus:shadow-lg"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <Sparkles className="h-4 w-4 text-purple-400" />
        </div>
      </div>
      <Button
        type="submit"
        disabled={disabled || !inputValue.trim()}
        className="h-12 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};
