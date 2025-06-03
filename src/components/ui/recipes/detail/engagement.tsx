"use client";

import { favoriteRecipe } from "@/actions/favorite";
import { cn } from "@/lib/utils";
import { RecipeDetail } from "@/models/recipe";
import { Heart, MessageCircle } from "lucide-react";

interface EngagementProps {
  recipe: RecipeDetail;
}
const Engagement: React.FC<EngagementProps> = ({ recipe }) => {
  const onFavorite = async () => {
    await favoriteRecipe(recipe.id, recipe.authorId);
  };

  return (
    <div className="flex items-center gap-6 mb-12">
      <button
        onClick={() => onFavorite()}
        className={cn(
          "flex items-center gap-2 hover:text-orange-500 transition-colors",
          recipe.isFavorited ? "text-orange-500" : "text-gray-700"
        )}
      >
        {recipe.isFavorited ? (
          <Heart className="h-6 w-6" fill="var(--color-orange-500)" />
        ) : (
          <Heart className="h-6 w-6" />
        )}
        <span>{recipe.favoriteCount}</span>
      </button>
      <button className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition-colors">
        <MessageCircle className="h-6 w-6" />
        <span>{recipe.commentsCount}</span>
      </button>
    </div>
  );
};

export default Engagement;
