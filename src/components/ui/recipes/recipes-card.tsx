import Recipe from "@/models/recipe";
import React from "react";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div
      key={recipe.id}
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="aspect-video relative overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1">{recipe.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{recipe.authorId}</p>
        <p className="text-xs text-gray-500">
          {recipe.updatedAt.toDateString()}
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;
