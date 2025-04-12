
import { cn } from "@/lib/utils";
import { Check, ChefHat, User } from "lucide-react";
import { ReactNode } from "react";

type ChatMessageProps = {
  isUser: boolean;
  message: string | ReactNode;
  showTypingIndicator?: boolean;
  choices?: string[];
  onChoiceClick?: (choice: string) => void;
  foodItem?: {
    name: string;
    description: string;
    price: string;
    imageUrl?: string;
    tags: string[];
  };
};

export const ChatMessage = ({
  isUser,
  message,
  showTypingIndicator = false,
  choices = [],
  onChoiceClick,
  foodItem,
}: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full mb-4 animate-bounce-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-food-green flex items-center justify-center mr-2 flex-shrink-0">
          <ChefHat className="w-4 h-4 text-white" />
        </div>
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-xl p-3",
          isUser
            ? "bg-food-orange text-white rounded-tr-none"
            : "bg-white shadow-md rounded-tl-none"
        )}
      >
        {showTypingIndicator ? (
          <div className="flex space-x-2 py-2 px-1">
            <div className="w-2 h-2 rounded-full bg-food-green-light animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-food-green-light animate-pulse" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-2 h-2 rounded-full bg-food-green-light animate-pulse" style={{ animationDelay: "0.4s" }}></div>
          </div>
        ) : (
          <div className="whitespace-pre-line">{message}</div>
        )}

        {foodItem && (
          <div className="mt-2 border-t pt-2">
            <div className="flex items-center">
              {foodItem.imageUrl && (
                <img 
                  src={foodItem.imageUrl} 
                  alt={foodItem.name} 
                  className="w-16 h-16 object-cover rounded-md mr-2" 
                />
              )}
              <div>
                <h4 className="font-medium">{foodItem.name}</h4>
                <p className="text-sm opacity-80">{foodItem.description}</p>
                <div className="flex items-center mt-1">
                  <span className="font-medium text-food-green">{foodItem.price}</span>
                  <div className="flex ml-2 gap-1">
                    {foodItem.tags.map((tag) => (
                      <span key={tag} className="px-1.5 py-0.5 bg-food-green-light bg-opacity-20 rounded-full text-[10px]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {choices.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {choices.map((choice) => (
              <button
                key={choice}
                className="px-3 py-1.5 bg-food-orange bg-opacity-10 hover:bg-opacity-20 rounded-full text-sm text-food-orange flex items-center transition-all"
                onClick={() => onChoiceClick && onChoiceClick(choice)}
              >
                {choice}
              </button>
            ))}
          </div>
        )}
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-food-orange-light flex items-center justify-center ml-2 flex-shrink-0">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
};
