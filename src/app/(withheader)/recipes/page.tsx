"use client";
import PopoverFilter from "@/components/ui/recipes/popover-filter";
import RecipeCard from "@/components/ui/recipes/recipes-card";
import { Recipe } from "@/models/recipe";
import { Search } from "lucide-react";
import { useState } from "react";

const CATEGORIES = [
  "Desserts",
  "Chicken",
  "Beef",
  "Vegetarian",
  "Seafood",
  "Pasta",
  "Breakfast",
  "Soups",
  "Salads",
  "Asian",
  "Mexican",
  "Italian",
  "Mediterranean",
  "Vegan",
  "Gluten-Free",
  "Quick & Easy",
  "Slow Cooker",
  "Grilling",
  "Baking",
  "Drinks",
];

const MOCK_RECIPES: Recipe[] = [
  {
    id: 1,
    title: "Chocolate Lava Cake",
    image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg",
    authorId: "Emily Johnson",
    categories: ["Desserts"],
    ingredients: [],
    guide: "",
    updatedAt: new Date("2024-02-15"),
    createdAt: new Date(),
  },
  {
    id: 2,
    title: "Grilled Chicken Salad",
    image: "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg",
    authorId: "Michael Chen",
    categories: ["Chicken"],
    ingredients: [],
    guide: "",
    updatedAt: new Date("2024-02-15"),
    createdAt: new Date(),
  },
  {
    id: 3,
    title: "Beef Stroganoff",
    image: "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg",
    authorId: "Sarah Williams",
    categories: ["Beef"],
    ingredients: [],
    guide: "",
    updatedAt: new Date("2024-02-15"),
    createdAt: new Date(),
  },
];

export default function RecipesPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="container mx-auto px-4 py-24">
      {/* Search and Filter Section */}
      <div className="flex flex-row items-center gap-4 mb-8">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search recipes..."
            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
        <PopoverFilter
          categories={CATEGORIES}
          selectedCategories={selectedCategories}
          onCategoryChange={setSelectedCategories}
        />
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_RECIPES.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
