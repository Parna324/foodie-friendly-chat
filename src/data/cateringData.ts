
export type FoodCategory = 'Appetizers' | 'Main Courses' | 'Side Dishes' | 'Desserts' | 'Beverages';
export type DietaryRestriction = 'Vegetarian' | 'Vegan' | 'Gluten-Free' | 'Dairy-Free' | 'Nut-Free';
export type EventType = 'Wedding' | 'Corporate' | 'Birthday' | 'Cocktail Party' | 'Holiday' | 'Family Gathering';
export type Budget = 'Low' | 'Medium' | 'High';

export interface CateringItem {
  id: string;
  name: string;
  description: string;
  category: FoodCategory;
  price: string;
  pricePerPerson: number;
  minOrderSize: number;
  dietaryRestrictions: DietaryRestriction[];
  recommendedFor: EventType[];
  budget: Budget;
  popularityScore: number;
  imageUrl?: string;
}

export const cateringItems: CateringItem[] = [
  {
    id: "app-1",
    name: "Gourmet Cheese Platter",
    description: "Selection of fine cheeses with crackers, fruits, and nuts",
    category: "Appetizers",
    price: "$12 per person",
    pricePerPerson: 12,
    minOrderSize: 10,
    dietaryRestrictions: ["Vegetarian"],
    recommendedFor: ["Wedding", "Corporate", "Cocktail Party"],
    budget: "Medium",
    popularityScore: 95,
    imageUrl: "https://images.unsplash.com/photo-1536411396596-afed9fa3c1b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "app-2",
    name: "Vegetable Spring Rolls",
    description: "Crispy spring rolls filled with fresh vegetables, served with sweet chili sauce",
    category: "Appetizers",
    price: "$8 per person",
    pricePerPerson: 8,
    minOrderSize: 15,
    dietaryRestrictions: ["Vegetarian", "Vegan"],
    recommendedFor: ["Birthday", "Cocktail Party", "Family Gathering"],
    budget: "Low",
    popularityScore: 88
  },
  {
    id: "app-3",
    name: "Shrimp Cocktail",
    description: "Jumbo shrimp served with zesty cocktail sauce and lemon wedges",
    category: "Appetizers",
    price: "$14 per person",
    pricePerPerson: 14,
    minOrderSize: 10,
    dietaryRestrictions: [],
    recommendedFor: ["Wedding", "Corporate", "Cocktail Party"],
    budget: "High",
    popularityScore: 90
  },
  {
    id: "main-1",
    name: "Herb-Roasted Chicken",
    description: "Tender chicken roasted with herbs and served with roasted vegetables",
    category: "Main Courses",
    price: "$18 per person",
    pricePerPerson: 18,
    minOrderSize: 10,
    dietaryRestrictions: ["Gluten-Free"],
    recommendedFor: ["Wedding", "Corporate", "Family Gathering"],
    budget: "Medium",
    popularityScore: 92,
    imageUrl: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "main-2",
    name: "Beef Tenderloin",
    description: "Premium beef tenderloin with red wine reduction and truffle mashed potatoes",
    category: "Main Courses",
    price: "$28 per person",
    pricePerPerson: 28,
    minOrderSize: 8,
    dietaryRestrictions: ["Gluten-Free"],
    recommendedFor: ["Wedding", "Corporate", "Holiday"],
    budget: "High",
    popularityScore: 94
  },
  {
    id: "main-3",
    name: "Vegetable Lasagna",
    description: "Layers of pasta with seasonal vegetables, ricotta, and marinara sauce",
    category: "Main Courses",
    price: "$16 per person",
    pricePerPerson: 16,
    minOrderSize: 10,
    dietaryRestrictions: ["Vegetarian"],
    recommendedFor: ["Birthday", "Family Gathering", "Holiday"],
    budget: "Medium",
    popularityScore: 86,
    imageUrl: "https://images.unsplash.com/photo-1619895121890-4f224dca0193?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "side-1",
    name: "Roasted Seasonal Vegetables",
    description: "Locally sourced vegetables roasted with olive oil, garlic, and herbs",
    category: "Side Dishes",
    price: "$6 per person",
    pricePerPerson: 6,
    minOrderSize: 15,
    dietaryRestrictions: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free"],
    recommendedFor: ["Wedding", "Corporate", "Birthday", "Holiday", "Family Gathering"],
    budget: "Low",
    popularityScore: 89
  },
  {
    id: "side-2",
    name: "Garlic Mashed Potatoes",
    description: "Creamy potatoes with roasted garlic and butter",
    category: "Side Dishes",
    price: "$5 per person",
    pricePerPerson: 5,
    minOrderSize: 15,
    dietaryRestrictions: ["Vegetarian", "Gluten-Free"],
    recommendedFor: ["Wedding", "Corporate", "Holiday", "Family Gathering"],
    budget: "Low",
    popularityScore: 91
  },
  {
    id: "dessert-1",
    name: "Chocolate Mousse Cups",
    description: "Rich chocolate mousse in edible chocolate cups with fresh berries",
    category: "Desserts",
    price: "$9 per person",
    pricePerPerson: 9,
    minOrderSize: 15,
    dietaryRestrictions: ["Vegetarian"],
    recommendedFor: ["Wedding", "Birthday", "Holiday", "Family Gathering"],
    budget: "Medium",
    popularityScore: 93,
    imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "dessert-2",
    name: "Mini Fruit Tarts",
    description: "Buttery tart shells filled with vanilla custard and topped with fresh seasonal fruits",
    category: "Desserts",
    price: "$7 per person",
    pricePerPerson: 7,
    minOrderSize: 20,
    dietaryRestrictions: ["Vegetarian"],
    recommendedFor: ["Wedding", "Corporate", "Birthday", "Cocktail Party"],
    budget: "Medium",
    popularityScore: 88
  },
  {
    id: "beverage-1",
    name: "Signature Mocktail Bar",
    description: "Selection of custom non-alcoholic mixed drinks with fresh juices and garnishes",
    category: "Beverages",
    price: "$10 per person",
    pricePerPerson: 10,
    minOrderSize: 20,
    dietaryRestrictions: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free"],
    recommendedFor: ["Wedding", "Corporate", "Birthday", "Cocktail Party"],
    budget: "Medium",
    popularityScore: 85,
    imageUrl: "https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "beverage-2",
    name: "Craft Beer Selection",
    description: "Curated selection of local craft beers",
    category: "Beverages",
    price: "$12 per person",
    pricePerPerson: 12,
    minOrderSize: 15,
    dietaryRestrictions: ["Vegan"],
    recommendedFor: ["Corporate", "Birthday", "Cocktail Party"],
    budget: "Medium",
    popularityScore: 87
  }
];

export const findRecommendations = ({
  eventType,
  guestCount,
  budget,
  dietaryRestrictions = []
}: {
  eventType: EventType;
  guestCount: number;
  budget: Budget;
  dietaryRestrictions?: DietaryRestriction[];
}) => {
  let filteredItems = cateringItems.filter(item => {
    // Filter by event type
    if (!item.recommendedFor.includes(eventType)) return false;
    
    // Filter by guest count (minimum order size)
    if (item.minOrderSize > guestCount) return false;
    
    // Filter by budget
    if (getBudgetLevel(budget) < getBudgetLevel(item.budget)) return false;
    
    // Filter by dietary restrictions (if any provided)
    if (dietaryRestrictions.length > 0) {
      // Check if the item satisfies ALL dietary restrictions
      return dietaryRestrictions.every(restriction => 
        item.dietaryRestrictions.includes(restriction)
      );
    }
    
    return true;
  });
  
  // Sort by popularity
  filteredItems.sort((a, b) => b.popularityScore - a.popularityScore);
  
  // Group by category
  const groupedItems: Record<FoodCategory, CateringItem[]> = {
    "Appetizers": [],
    "Main Courses": [],
    "Side Dishes": [],
    "Desserts": [],
    "Beverages": []
  };
  
  filteredItems.forEach(item => {
    groupedItems[item.category].push(item);
  });
  
  return groupedItems;
};

// Helper function to convert budget string to numeric level
const getBudgetLevel = (budget: Budget) => {
  switch (budget) {
    case "Low": return 1;
    case "Medium": return 2;
    case "High": return 3;
    default: return 1;
  }
};
