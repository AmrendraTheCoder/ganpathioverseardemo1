"use client";

import { useState, useEffect, useRef } from "react";
import { X, Send, Bot, User, MessageCircle, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  type: "bot" | "user";
  text: string;
  timestamp: Date;
  quickReplies?: string[];
}

const predefinedAnswers = {
  greeting: [
    "Hello! I'm your virtual printing assistant. How can I help you today?",
    "Hi there! Welcome to Ganpathi Overseas. What printing questions do you have?",
    "Greetings! I'm here to help with all your printing needs. What can I assist you with?",
  ],
  pricing: [
    "Our pricing depends on several factors including quantity, paper type, colors, and finishing options. For accurate pricing, I'd recommend getting a custom quote. Would you like me to connect you with our sales team?",
    "Printing costs vary based on your specific requirements. We offer competitive rates for both small and large orders. Shall I help you get a personalized quote?",
  ],
  turnaround: [
    "Our typical turnaround time is 3-5 business days for most projects. Rush orders can often be completed in 24-48 hours for an additional fee. What's your project timeline?",
    "Standard delivery is 3-5 business days, but we can accommodate urgent requests. What type of printing project are you planning?",
  ],
  materials: [
    "We work with a wide variety of paper types including glossy, matte, uncoated, textured, and specialty papers. We also offer different weights from 80gsm to 350gsm+. What kind of project are you working on?",
    "Our paper options include coated papers (gloss, matte, silk), uncoated papers, and specialty options like recycled, textured, and synthetic papers. What's your intended use?",
  ],
  services: [
    "We offer offset printing, digital printing, large format printing, UV printing, business cards, brochures, catalogs, banners, packaging, and more. We also provide design services. What service interests you?",
    "Our services include: Offset & Digital Printing, Large Format Printing, Business Cards, Brochures, Catalogs, Banners, Packaging Solutions, and Design Services. Which would you like to know more about?",
  ],
  quality: [
    "We maintain the highest quality standards with ISO certification, state-of-the-art equipment, and skilled professionals with 20+ years of experience. Quality is our top priority.",
    "Quality is guaranteed through our ISO-certified processes, premium materials, and experienced team. We stand behind every print job with our quality guarantee.",
  ],
  delivery: [
    "We provide free delivery within Lucknow city limits and can arrange shipping anywhere in India. International shipping is also available upon request.",
    "Yes! We offer delivery services throughout Lucknow and shipping across India. Same-day delivery is available for urgent local orders.",
  ],
  contact: [
    "You can reach us at +91 965 191 1111, email info@ganpathioverseas.com, or visit our office at 9 Lakshampuri, Indira Nagar, Lucknow. We're open Mon-Sat, 9 AM to 6 PM.",
    "Contact us via phone (+91 965 191 1111), email (info@ganpathioverseas.com), or visit us near Boothnath Metro Station in Lucknow. Would you like to schedule a call?",
  ],
};

const quickRepliesData = {
  initial: [
    "Get a Quote",
    "Turnaround Time",
    "Paper Types",
    "Our Services",
    "Contact Info",
  ],
  pricing: ["Business Cards", "Brochures", "Large Format", "Get Custom Quote"],
  services: [
    "Offset Printing",
    "Digital Printing",
    "Design Services",
    "View All Services",
  ],
};

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Chatbot({ isOpen, onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initialize with welcome message
      const welcomeMessage: Message = {
        id: "1",
        type: "bot",
        text: predefinedAnswers.greeting[0],
        timestamp: new Date(),
        quickReplies: quickRepliesData.initial,
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getRandomResponse = (responses: string[]) => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getQuickRepliesForResponse = (responseText: string): string[] => {
    const text = responseText.toLowerCase();

    if (text.includes("pricing") || text.includes("quote")) {
      return quickRepliesData.pricing;
    }

    if (text.includes("service") || text.includes("printing")) {
      return quickRepliesData.services;
    }

    if (text.includes("turnaround") || text.includes("delivery")) {
      return ["Rush Order", "Standard Delivery", "Get Quote"];
    }

    if (text.includes("material") || text.includes("paper")) {
      return ["Paper Types", "Quality Info", "Get Samples"];
    }

    if (text.includes("contact") || text.includes("phone")) {
      return ["Call Now", "Send Email", "Get Directions"];
    }

    return quickRepliesData.initial;
  };

  const generateBotResponse = (
    userMessage: string
  ): { text: string; quickReplies?: string[] } => {
    const message = userMessage.toLowerCase();

    // Greeting patterns
    if (
      message.includes("hello") ||
      message.includes("hi") ||
      message.includes("hey")
    ) {
      return {
        text: getRandomResponse(predefinedAnswers.greeting),
        quickReplies: quickRepliesData.initial,
      };
    }

    // Pricing queries
    if (
      message.includes("price") ||
      message.includes("cost") ||
      message.includes("quote") ||
      message.includes("rate")
    ) {
      return {
        text: getRandomResponse(predefinedAnswers.pricing),
        quickReplies: quickRepliesData.pricing,
      };
    }

    // Turnaround time
    if (
      message.includes("time") ||
      message.includes("delivery") ||
      message.includes("fast") ||
      message.includes("urgent") ||
      message.includes("quick")
    ) {
      return {
        text: getRandomResponse(predefinedAnswers.turnaround),
        quickReplies: ["Rush Order", "Standard Delivery", "Get Quote"],
      };
    }

    // Materials and paper
    if (
      message.includes("paper") ||
      message.includes("material") ||
      message.includes("quality") ||
      message.includes("gsm")
    ) {
      return {
        text: getRandomResponse(predefinedAnswers.materials),
        quickReplies: ["Paper Types", "Quality Info", "Get Samples"],
      };
    }

    // Services
    if (
      message.includes("service") ||
      message.includes("print") ||
      message.includes("what do you") ||
      message.includes("offer")
    ) {
      return {
        text: getRandomResponse(predefinedAnswers.services),
        quickReplies: quickRepliesData.services,
      };
    }

    // Quality assurance
    if (
      message.includes("quality") ||
      message.includes("guarantee") ||
      message.includes("experience")
    ) {
      return {
        text: getRandomResponse(predefinedAnswers.quality),
        quickReplies: ["View Portfolio", "Quality Process", "Get Quote"],
      };
    }

    // Contact information
    if (
      message.includes("contact") ||
      message.includes("phone") ||
      message.includes("address") ||
      message.includes("location")
    ) {
      return {
        text: getRandomResponse(predefinedAnswers.contact),
        quickReplies: ["Call Now", "Send Email", "Get Directions"],
      };
    }

    // Delivery queries
    if (
      message.includes("deliver") ||
      message.includes("shipping") ||
      message.includes("location")
    ) {
      return {
        text: getRandomResponse(predefinedAnswers.delivery),
        quickReplies: ["Delivery Areas", "Shipping Rates", "Track Order"],
      };
    }

    // Default response
    return {
      text: "I understand you're asking about printing services. Let me connect you with specific information. What aspect would you like to know more about?",
      quickReplies: quickRepliesData.initial,
    };
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Call the chatbot API
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      const result = await response.json();

      if (response.ok) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          text: result.response,
          timestamp: new Date(),
          quickReplies: getQuickRepliesForResponse(result.response),
        };

        setMessages((prev) => [...prev, botMessage]);
      } else {
        // Fallback to local response if API fails
        const fallbackResponse = generateBotResponse(text);
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          text: fallbackResponse.text,
          timestamp: new Date(),
          quickReplies: fallbackResponse.quickReplies,
        };

        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      console.error("Chatbot API error:", error);
      // Fallback to local response
      const fallbackResponse = generateBotResponse(text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        text: fallbackResponse.text,
        timestamp: new Date(),
        quickReplies: fallbackResponse.quickReplies,
      };

      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage(inputValue);
    }
  };

  const handleActionButton = (action: string) => {
    switch (action) {
      case "Call Now":
        window.open("tel:+919651911111");
        break;
      case "Send Email":
        window.open("mailto:info@ganpathioverseas.com");
        break;
      case "Get Quote":
      case "Get Custom Quote":
        window.open("/quote", "_blank");
        break;
      case "View All Services":
      case "View Portfolio":
        window.open("/services", "_blank");
        break;
      case "Get Directions":
        window.open(
          "https://maps.google.com/?q=9 Lakshampuri, Indira Nagar, Lucknow",
          "_blank"
        );
        break;
      default:
        handleSendMessage(action);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-end p-4 z-50">
      <div className="bg-white rounded-t-2xl shadow-2xl w-full max-w-md h-[600px] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">Printing Assistant</h3>
              <p className="text-sm text-blue-200">
                Online • Typically replies instantly
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}
              >
                <div
                  className={`flex items-start space-x-2 ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {message.type === "user" ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      message.type === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>

                {/* Quick Replies */}
                {message.type === "bot" && message.quickReplies && (
                  <div className="mt-2 ml-10 flex flex-wrap gap-2">
                    {message.quickReplies.map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => handleActionButton(reply)}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs hover:bg-blue-100 transition-colors border border-blue-200"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-gray-600" />
                </div>
                <div className="bg-gray-100 rounded-2xl px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {/* Quick contact options */}
          <div className="flex justify-center space-x-4 mt-3 pt-3 border-t">
            <button
              onClick={() => window.open("tel:+919651911111")}
              className="flex items-center space-x-1 text-xs text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>Call</span>
            </button>
            <button
              onClick={() => window.open("mailto:info@ganpathioverseas.com")}
              className="flex items-center space-x-1 text-xs text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Mail className="w-3 h-3" />
              <span>Email</span>
            </button>
            <button
              onClick={() => window.open("/quote", "_blank")}
              className="flex items-center space-x-1 text-xs text-gray-600 hover:text-blue-600 transition-colors"
            >
              <MessageCircle className="w-3 h-3" />
              <span>Quote</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
