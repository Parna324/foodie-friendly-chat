
import { UtensilsCrossed } from "lucide-react";

export const Header = () => {
  return (
    <header className="py-4 px-6 bg-white shadow-md rounded-t-xl flex items-center">
      <UtensilsCrossed className="h-6 w-6 text-food-orange mr-2" />
      <h1 className="text-xl font-bold text-food-orange">FoodieFinder</h1>
      <p className="ml-auto text-sm text-muted-foreground">Catering Recommender</p>
    </header>
  );
};
