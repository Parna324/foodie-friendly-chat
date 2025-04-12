
import { useState, useEffect, useRef } from "react";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { Header } from "./Header";
import { 
  Budget, 
  CateringItem, 
  DietaryRestriction, 
  EventType, 
  FoodCategory, 
  cateringItems, 
  findRecommendations 
} from "@/data/cateringData";
import { ArrowDown, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";

type Message = {
  id: string;
  content: string;
  isUser: boolean;
  choices?: string[];
  foodItem?: {
    name: string;
    description: string;
    price: string;
    imageUrl?: string;
    tags: string[];
  };
};

type ChatState = {
  eventType?: EventType;
  guestCount?: number;
  budget?: Budget;
  dietaryRestrictions: DietaryRestriction[];
  selectedCategory?: FoodCategory;
  recommendations: Record<FoodCategory, CateringItem[]>;
  step: 'intro' | 'event-type' | 'guest-count' | 'budget' | 'dietary' | 'recommendations' | 'category-detail' | 'item-detail' | 'end';
};

const createId = () => Math.random().toString(36).substring(2, 11);

export const CateringChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatState, setChatState] = useState<ChatState>({
    dietaryRestrictions: [],
    recommendations: {
      "Appetizers": [],
      "Main Courses": [],
      "Side Dishes": [],
      "Desserts": [],
      "Beverages": []
    },
    step: 'intro'
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial greeting message
  useEffect(() => {
    setTimeout(() => {
      addBotMessage(
        "👋 Hi there! I'm your FoodieFinder catering assistant. I can help you find the perfect catering options for your event.",
        [
          "Let's get started"
        ]
      );
    }, 500);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addMessage = (content: string, isUser: boolean, choices?: string[], foodItem?: Message["foodItem"]) => {
    setMessages(prev => [...prev, {
      id: createId(),
      content,
      isUser,
      choices,
      foodItem
    }]);
  };

  const addBotMessage = (content: string, choices?: string[], foodItem?: Message["foodItem"]) => {
    setIsTyping(true);
    
    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false);
      addMessage(content, false, choices, foodItem);
    }, 1000);
  };

  const handleSendMessage = (message: string) => {
    addMessage(message, true);
    processUserInput(message);
  };

  const handleChoiceClick = (choice: string) => {
    addMessage(choice, true);
    processUserInput(choice);
  };

  const processUserInput = (input: string) => {
    switch (chatState.step) {
      case 'intro':
        setChatState(prev => ({ ...prev, step: 'event-type' }));
        addBotMessage(
          "Great! What type of event are you planning?",
          ["Wedding", "Corporate", "Birthday", "Cocktail Party", "Holiday", "Family Gathering"]
        );
        break;

      case 'event-type':
        const eventType = input as EventType;
        setChatState(prev => ({ ...prev, eventType, step: 'guest-count' }));
        addBotMessage(
          `Awesome! A ${eventType.toLowerCase()} event sounds fun. How many guests do you expect?`,
          ["Less than 20", "20-50", "50-100", "More than 100"]
        );
        break;

      case 'guest-count':
        let guestCount: number;
        if (input === "Less than 20") guestCount = 15;
        else if (input === "20-50") guestCount = 35;
        else if (input === "50-100") guestCount = 75;
        else guestCount = 120;

        setChatState(prev => ({ ...prev, guestCount, step: 'budget' }));
        addBotMessage(
          `Got it. And what's your budget per person?`,
          ["Economy ($10-20)", "Standard ($20-40)", "Premium ($40+)"]
        );
        break;

      case 'budget':
        let budget: Budget;
        if (input === "Economy ($10-20)") budget = "Low";
        else if (input === "Standard ($20-40)") budget = "Medium";
        else budget = "High";

        setChatState(prev => ({ ...prev, budget, step: 'dietary' }));
        addBotMessage(
          "Do you have any dietary restrictions to consider?",
          ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Nut-Free", "No restrictions"]
        );
        break;

      case 'dietary':
        let dietaryRestrictions = [...chatState.dietaryRestrictions];
        
        if (input !== "No restrictions") {
          dietaryRestrictions.push(input as DietaryRestriction);
          if (dietaryRestrictions.length < 2) {
            addBotMessage(
              "Got it. Any other dietary restrictions?",
              ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Nut-Free", "No more restrictions"]
            );
            setChatState(prev => ({ ...prev, dietaryRestrictions }));
            return;
          }
        }

        // Generate recommendations
        if (chatState.eventType && chatState.guestCount && chatState.budget) {
          const recommendations = findRecommendations({
            eventType: chatState.eventType,
            guestCount: chatState.guestCount,
            budget: chatState.budget,
            dietaryRestrictions
          });

          setChatState(prev => ({ 
            ...prev, 
            dietaryRestrictions,
            recommendations,
            step: 'recommendations' 
          }));

          const hasSomeItems = Object.values(recommendations).some(items => items.length > 0);
          
          if (hasSomeItems) {
            let message = "Great! Based on your preferences, here are some catering options I recommend for your event:\n\nWhat category would you like to explore?";
            
            // Show categories that have items
            const availableCategories = Object.entries(recommendations)
              .filter(([_, items]) => items.length > 0)
              .map(([category]) => category);
            
            addBotMessage(message, availableCategories);
          } else {
            addBotMessage(
              "I'm sorry, but I couldn't find any catering options that match all of your criteria. Would you like to try with different preferences?",
              ["Start over", "Exit"]
            );
          }
        }
        break;

      case 'recommendations':
        const selectedCategory = input as FoodCategory;
        setChatState(prev => ({ ...prev, selectedCategory, step: 'category-detail' }));
        
        const items = chatState.recommendations[selectedCategory];
        if (items.length > 0) {
          const itemOptions = items.map(item => item.name);
          addBotMessage(
            `Here are the ${selectedCategory.toLowerCase()} options I recommend:`,
            itemOptions.concat(["Back to categories"])
          );
        } else {
          addBotMessage(
            `I don't have any ${selectedCategory.toLowerCase()} that match your criteria. Would you like to see other categories?`,
            ["Back to categories", "Start over"]
          );
        }
        break;

      case 'category-detail':
        if (input === "Back to categories") {
          setChatState(prev => ({ ...prev, step: 'recommendations' }));
          
          const availableCategories = Object.entries(chatState.recommendations)
            .filter(([_, items]) => items.length > 0)
            .map(([category]) => category);
          
          addBotMessage(
            "What category would you like to explore?",
            availableCategories
          );
          break;
        }
        
        // Find the selected item
        if (chatState.selectedCategory) {
          const selectedItem = chatState.recommendations[chatState.selectedCategory]
            .find(item => item.name === input);
          
          if (selectedItem) {
            setChatState(prev => ({ ...prev, step: 'item-detail' }));
            
            // Create tags from dietary restrictions and budget
            const tags = [
              ...selectedItem.dietaryRestrictions,
              selectedItem.budget,
              `Min: ${selectedItem.minOrderSize}`
            ];
            
            addBotMessage(
              `Here are the details for ${selectedItem.name}:`,
              ["Order this", "Back to options", "See more recommendations"],
              {
                name: selectedItem.name,
                description: selectedItem.description,
                price: selectedItem.price,
                imageUrl: selectedItem.imageUrl,
                tags: tags
              }
            );
          }
        }
        break;

      case 'item-detail':
        if (input === "Order this") {
          setChatState(prev => ({ ...prev, step: 'end' }));
          addBotMessage(
            "Great choice! To finalize your catering order, please contact our team at contact@foodiefinder.com or call (555) 123-4567. Would you like to start over and explore more options?",
            ["Start over", "Exit"]
          );
        } else if (input === "Back to options" && chatState.selectedCategory) {
          setChatState(prev => ({ ...prev, step: 'category-detail' }));
          
          const items = chatState.recommendations[chatState.selectedCategory];
          const itemOptions = items.map(item => item.name);
          
          addBotMessage(
            `Here are the ${chatState.selectedCategory.toLowerCase()} options again:`,
            itemOptions.concat(["Back to categories"])
          );
        } else if (input === "See more recommendations") {
          setChatState(prev => ({ ...prev, step: 'recommendations' }));
          
          const availableCategories = Object.entries(chatState.recommendations)
            .filter(([_, items]) => items.length > 0)
            .map(([category]) => category);
          
          addBotMessage(
            "What other category would you like to explore?",
            availableCategories
          );
        }
        break;

      case 'end':
        if (input === "Start over") {
          // Reset the chat state
          setChatState({
            dietaryRestrictions: [],
            recommendations: {
              "Appetizers": [],
              "Main Courses": [],
              "Side Dishes": [],
              "Desserts": [],
              "Beverages": []
            },
            step: 'intro'
          });
          
          // Clear messages and start over
          setMessages([]);
          setTimeout(() => {
            addBotMessage(
              "👋 Hi there! I'm your FoodieFinder catering assistant. I can help you find the perfect catering options for your event.",
              ["Let's get started"]
            );
          }, 500);
        } else {
          addBotMessage(
            "Thank you for using FoodieFinder! Have a great event. If you need anything else, just refresh to start a new conversation.",
            []
          );
        }
        break;

      default:
        addBotMessage("I'm not sure how to respond to that. Let's continue with your catering options.");
        break;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-2xl mx-auto">
      <div className="bg-food-beige rounded-xl shadow-lg overflow-hidden flex flex-col h-full border border-food-orange-light/30">
        <Header />
        
        <div className="flex-1 p-4 overflow-y-auto bg-food-beige/50">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
              <UtensilsCrossed className="h-16 w-16 text-food-orange/30 mb-4" />
              <h2 className="text-2xl font-semibold text-food-orange mb-2">Welcome to FoodieFinder</h2>
              <p className="max-w-md">Your personal catering assistant that helps you discover the perfect menu for any event.</p>
              
              <Button 
                className="mt-6 bg-food-orange hover:bg-food-orange/90 text-white"
                onClick={() => handleChoiceClick("Let's get started")}
              >
                Start chatting
              </Button>
              
              <div className="mt-8 animate-bounce">
                <ArrowDown className="h-6 w-6 text-food-orange/50" />
              </div>
            </div>
          )}
          
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              isUser={message.isUser}
              message={message.content}
              choices={message.choices}
              onChoiceClick={handleChoiceClick}
              foodItem={message.foodItem}
            />
          ))}
          
          {isTyping && (
            <ChatMessage
              isUser={false}
              message=""
              showTypingIndicator={true}
            />
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t border-food-orange-light/20 bg-white">
          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={isTyping || chatState.step === 'intro' || messages.length === 0}
            placeholder={
              messages.length === 0 
                ? "Click 'Start chatting' to begin..." 
                : chatState.step === 'intro' 
                  ? "Click 'Let's get started'..." 
                  : "Type your message..."
            }
          />
        </div>
      </div>
    </div>
  );
};
