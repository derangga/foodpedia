import { UserRecipeItem } from "@/models/recipe";
import { format } from "date-fns";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface RecipeImageItemProps {
  recipe: UserRecipeItem;
}
const RecipeImageItem: React.FC<RecipeImageItemProps> = ({ recipe }) => {
  const imgSrc = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${recipe.id}/${recipe.image}`;
  return (
    <Link
      key={recipe.id}
      href={`/recipes/${recipe.id}`}
      className="group relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100"
    >
      <Image
        src={imgSrc}
        alt={recipe.title}
        fill
        style={{
          objectFit: "cover",
        }}
      />

      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="text-white text-center p-4">
          <h3 className="font-semibold mb-2">{recipe.title}</h3>
          <div className="flex items-center justify-center gap-2">
            <Heart className="h-5 w-5 fill-white" />
            <span>{recipe.likes}</span>
          </div>
          <div className="text-sm mt-2">
            {format(recipe.createdAt, "MMM d, yyyy")}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeImageItem;
