import { User, Bot } from "lucide-react";

export const ChatMessage = ({ message }) => {
  const isBot = message.sender === "bot";

  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-6`}>
      <div
        className={`flex max-w-[85%] ${
          isBot ? "flex-row" : "flex-row-reverse"
        } group`}
      >
        <div className={`flex-shrink-0 ${isBot ? "mr-4" : "ml-4"}`}>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 ${
              isBot
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
            }`}
          >
            {isBot ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
          </div>
        </div>

        <div
          className={`rounded-2xl px-6 py-4 shadow-lg backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.02] ${
            isBot
              ? "bg-white/90 border border-purple-100 text-gray-800"
              : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">
            {message.content}
          </p>
          <p
            className={`text-xs mt-2 font-medium ${
              isBot ? "text-gray-500" : "text-blue-100"
            }`}
          >
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};
