
import { CateringItem, cateringItems } from "@/data/cateringData";
import { UtensilsCrossed } from "lucide-react";

export const CateringMenu = () => {
  // Group items by category
  const itemsByCategory = cateringItems.reduce<Record<string, CateringItem[]>>(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {}
  );

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <header className="py-4 px-6 bg-food-orange text-white flex items-center">
        <UtensilsCrossed className="h-6 w-6 mr-2" />
        <h1 className="text-xl font-bold">FoodieFinder Catering Menu</h1>
      </header>

      <div className="p-6">
        {Object.entries(itemsByCategory).map(([category, items]) => (
          <div key={category} className="mb-8">
            <h2 className="text-xl font-semibold text-food-orange border-b border-food-orange-light mb-4 pb-2">
              {category}
            </h2>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="border border-food-orange-light/20 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex">
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md mr-4"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium text-lg">{item.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.description}
                      </p>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="font-bold text-food-green">
                          {item.price}
                        </span>
                        <div className="flex gap-1">
                          {item.dietaryRestrictions.map((restriction) => (
                            <span
                              key={restriction}
                              className="px-2 py-0.5 bg-food-green-light bg-opacity-20 rounded-full text-xs"
                            >
                              {restriction}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
