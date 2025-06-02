"use client";

import PopoverFilter from "@/components/ui/recipes/popover-filter";
import RecipeCard from "@/components/ui/recipes/recipes-card";
import RecipeSkeleton from "@/components/ui/recipes/recipes-skeleton";
import { useRecipesDebounce } from "@/hooks/use-recipes-debounce";
import Category from "@/models/category";
import { Search } from "lucide-react";
import { useState } from "react";

interface RecipePageProps {
  categories: Category[];
}

const RecipePage: React.FC<RecipePageProps> = ({ categories }) => {
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { recipes, loading } = useRecipesDebounce(query, selectedCategories);
  return (
    <div className="container mx-auto px-4 py-24">
      {/* Search and Filter Section */}
      <div className="flex flex-row items-center gap-4 mb-8">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search recipes..."
            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
        <PopoverFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={setSelectedCategories}
        />
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <RecipeSkeleton key={i} />)
          : recipes.map((r) => <RecipeCard key={r.id} recipe={r} />)}
      </div>
    </div>
  );
};

export default RecipePage;
