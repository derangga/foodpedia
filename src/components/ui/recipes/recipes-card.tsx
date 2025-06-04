import { RecipeItem } from "@/models/recipe";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";
import { Card, CardContent, CardHeader } from "../card";
import Link from "next/link";

interface RecipeCardProps {
  recipe: RecipeItem;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const imgSrc = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${recipe.id}/${recipe.image}`;
  return (
    <Link href={`/recipes/${recipe.id}`}>
      <Card key={recipe.id} className="overflow-hidden p-0 gap-0">
        <CardHeader className="relative p-0 h-44">
          <Image
            src={imgSrc || ""}
            alt={recipe.title}
            fill
            style={{
              objectFit: "cover",
            }}
            className="absolute inset-0"
          />
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1">{recipe.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{recipe.username}</p>
          <p className="text-xs text-gray-500">
            {format(recipe.createdAt || new Date(), "MMMM d, yyyy")}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RecipeCard;
