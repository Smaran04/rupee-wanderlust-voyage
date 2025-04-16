
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

type Message = {
  id: string;
  content: string;
  isBot: boolean;
};

// Common travel-related responses
const TRAVEL_RESPONSES: Record<string, string> = {
  "hello": "Hello! How can I help with your travel plans today?",
  "hi": "Hi there! How can I assist with your travel booking?",
  "booking": "You can book hotels by browsing our listings and selecting 'Book Now' on any hotel page. Need help with a specific destination?",
  "payment": "We accept various payment methods including credit/debit cards, UPI, and cryptocurrency wallets. All payments are secure and encrypted.",
  "cancel": "Cancellation policies vary by hotel. Most bookings can be cancelled up to 24-48 hours before check-in without penalty. Check your hotel's specific policy on the booking page.",
  "refund": "Refunds are processed within 5-7 business days, depending on your payment method. Please contact us for any refund-related queries.",
  "destinations": "We offer bookings at popular destinations across India including Goa, Kerala, Rajasthan, Himachal Pradesh, and many more!",
  "contact": "You can reach our team at travel09ease@gmail.com or call us at 9703503111. We're available 24/7 to assist you.",
  "prices": "Our prices are displayed in Indian Rupees (₹) and may vary based on season, availability, and special events.",
  "check-in": "Standard check-in time is 2:00 PM, but this may vary by hotel. You can find specific check-in details on your hotel's page.",
  "check-out": "Standard check-out time is 12:00 PM. Late check-out may be available upon request, subject to availability.",
  "covid": "We follow all safety protocols. Many of our partner hotels have enhanced cleaning procedures and flexible cancellation policies.",
};

export const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your travel assistant. How can I help you with your travel or booking questions?',
      isBot: true,
    },
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isBot: false,
    };
    setMessages((prev) => [...prev, newUserMessage]);
    
    // Process the message and generate a response
    setTimeout(() => {
      const botResponse = generateResponse(input);
      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        isBot: true,
      };
      setMessages((prev) => [...prev, newBotMessage]);
    }, 600);

    setInput('');
  };

  const generateResponse = (userInput: string): string => {
    const lowercaseInput = userInput.toLowerCase();
    
    // Check for keywords in the input
    for (const [keyword, response] of Object.entries(TRAVEL_RESPONSES)) {
      if (lowercaseInput.includes(keyword)) {
        return response;
      }
    }
    
    // Check for specific questions or keywords
    if (lowercaseInput.includes('suggest') || lowercaseInput.includes('recommend')) {
      if (lowercaseInput.includes('beach') || lowercaseInput.includes('sea')) {
        return "For beach destinations, I'd recommend Goa, Kerala beaches, Andaman & Nicobar Islands, or Pondicherry. All offer beautiful coastlines and unique experiences!";
      } else if (lowercaseInput.includes('mountain') || lowercaseInput.includes('hill')) {
        return "For mountain getaways, consider Shimla, Manali, Darjeeling, Ooty, or Munnar. These offer stunning views and pleasant weather!";
      } else if (lowercaseInput.includes('budget') || lowercaseInput.includes('cheap')) {
        return "For budget-friendly trips, consider exploring Rishikesh, Pushkar, Hampi, or Varkala. These destinations offer great experiences without breaking the bank!";
      } else if (lowercaseInput.includes('luxury') || lowercaseInput.includes('premium')) {
        return "For luxury travel, I recommend Udaipur, Jaipur, Kerala backwaters houseboats, or premium resorts in Goa. We have excellent 5-star options with world-class amenities.";
      }
      return "I'd be happy to recommend destinations! Are you interested in beaches, mountains, historical places, wildlife sanctuaries, or something else? Let me know your preferences!";
    }
    
    if (lowercaseInput.includes('hotel price') || lowercaseInput.includes('how much')) {
      return "Hotel prices vary based on location, season, and room type. Our budget options start at ₹1,500 per night, while premium hotels range from ₹8,000 to ₹25,000+ per night. You can see exact pricing on each hotel listing.";
    }
    
    if (lowercaseInput.includes('best time') || lowercaseInput.includes('when to visit')) {
      return "The best time to visit depends on your destination. October to March is generally pleasant for most of India. Beaches are best visited from November to February, while hill stations are lovely from March to June. Monsoon (July-September) offers lush landscapes but can impact outdoor activities.";
    }
    
    // Default response if no keywords match
    return "I'm here to help with all your travel questions! You can ask about bookings, destinations, payments, cancellations, or travel recommendations. How can I assist you today?";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            className="rounded-full h-14 w-14 bg-travel-600 hover:bg-travel-700 shadow-lg"
            onClick={() => setIsOpen(true)}
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[90%] sm:w-[400px] p-0">
          <SheetHeader className="px-4 py-3 border-b">
            <div className="flex justify-between items-center">
              <SheetTitle>Travel Assistant</SheetTitle>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </SheetHeader>
          <div className="flex flex-col h-[500px]">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <Card 
                    className={`px-4 py-2 max-w-[80%] ${
                      message.isBot 
                        ? 'bg-gray-100 text-gray-800' 
                        : 'bg-travel-600 text-white'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </Card>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="border-t p-3 flex gap-2">
              <Input
                placeholder="Type your question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Chatbot;
