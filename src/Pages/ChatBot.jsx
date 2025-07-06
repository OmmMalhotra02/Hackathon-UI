import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, User, Bot, Sparkles, Brain } from "lucide-react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    initializeConversation();
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const initializeConversation = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/chat/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "customer_profiling",
          purpose: "investment_assessment",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to initialize conversation");
      }

      const data = await response.json();
      setConversationId(data.conversationId);

      const welcomeMessage = {
        id: "welcome",
        content:
          data.welcomeMessage ||
          "Hello! I'm here to help you create a personalized investment profile. Let's start by understanding your financial goals and preferences. What brings you to investment planning today?",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    } catch (error) {
      console.error("Error initializing conversation:", error);
      setMessages([
        {
          id: "welcome",
          content:
            "Hello! I'm here to help you create a personalized investment profile. Let's start by understanding your financial goals and preferences. What brings you to investment planning today?",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (content) => {
    if (!content.trim()) return;
    const userMessage = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversationId,
          message: content,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();

      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm sorry, I'm having trouble connecting right now. Please try again or continue with our structured assessment.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-300/20 to-indigo-300/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Header Section */}
        <div className="mb-8 text-center animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-lg">
              <Brain className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            Personal Insight Engine
          </h1>

          <div className="flex justify-between">
            <Sparkles className="h-5 w-5 text-pink-500" />
            <p className="text-gray-600 text-lg">
              Experience personalized investment guidance through our
              intelligent conversation system
            </p>
            <Sparkles className="h-5 w-5 text-purple-500" />
          </div>
        </div>

        {/* Chat Interface */}
        <Card className="shadow-2xl border-0 h-[650px] flex flex-col backdrop-blur-sm bg-white/80 animate-scale-in">
          <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <span className="text-gray-800 font-semibold">
                  Personal Investment Advisor
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-500">Online</span>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
              <div className="space-y-6">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ChatMessage message={message} />
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-center space-x-3 text-gray-500 animate-fade-in">
                    <div className="p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
                      <Bot className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">
                        AI is thinking
                      </span>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="border-t bg-gradient-to-r from-purple-50/50 to-pink-50/50 p-6">
              <ChatInput onSendMessage={sendMessage} disabled={isLoading} />
            </div>
          </CardContent>
        </Card>

        {/* Bottom CTA Section */}
        {/* <div className="mt-8 text-center animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-5 w-5 text-purple-500 mr-2" />
            <p className="text-gray-600 font-medium">
              Prefer a structured approach?
            </p>
            <Sparkles className="h-5 w-5 text-pink-500 ml-2" />
          </div>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/risk-profile")}
            className="bg-white/80 backdrop-blur-sm border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Take Structured Assessment
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default ChatBot;
