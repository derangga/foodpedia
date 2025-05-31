import { RecipeItem } from "@/models/recipe";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";

interface RecipeCardProps {
  recipe: RecipeItem;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const imgSrc = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${recipe.id}/${recipe.image}`;
  return (
    <div
      key={recipe.id}
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="aspect-video relative overflow-hidden h-48 w-full">
        <Image
          src={imgSrc || ""}
          alt={recipe.title}
          fill
          style={{
            objectFit: "cover",
          }}
          className="absolute inset-0"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1">{recipe.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{recipe.userName}</p>
        <p className="text-xs text-gray-500">
          {format(recipe.createdAt || new Date(), "MMMM d, yyyy")}
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;
