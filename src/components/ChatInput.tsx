
import { Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ChatInputProps = {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export const ChatInput = ({
  onSendMessage,
  placeholder = "Type your message...",
  disabled = false,
  className,
}: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative flex w-full", className)}>
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="pr-10 border-food-orange-light focus-visible:ring-food-orange"
      />
      <Button 
        size="icon" 
        type="submit" 
        disabled={!message.trim() || disabled}
        className="absolute right-0 h-full rounded-l-none bg-food-orange hover:bg-food-orange/90"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};
