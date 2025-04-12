
import { CateringMenu } from "@/components/CateringMenu";
import { CateringChatbot } from "@/components/CateringChatbot";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, UtensilsCrossed } from "lucide-react";

const Index = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  
  return (
    <div className="min-h-screen w-full flex flex-col p-4 md:p-8 bg-food-beige/50">
      <header className="w-full max-w-4xl mx-auto mb-6 flex justify-between items-center">
        <div className="flex items-center">
          <UtensilsCrossed className="h-7 w-7 text-food-orange mr-2" />
          <h1 className="text-2xl font-bold text-food-orange">FoodieFinder</h1>
        </div>
        <Button 
          onClick={() => setShowChatbot(!showChatbot)}
          className="bg-food-orange hover:bg-food-orange/90 text-white"
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          {showChatbot ? "View Menu" : "Catering Assistant"}
        </Button>
      </header>
      
      <div className="relative flex-1">
        {showChatbot ? (
          <CateringChatbot />
        ) : (
          <div className="space-y-6">
            <div className="max-w-4xl mx-auto text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-food-green mb-3">Find Your Perfect Catering Experience</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Browse our extensive menu or chat with our catering assistant to get personalized recommendations for your next event.
              </p>
            </div>
            <CateringMenu />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
