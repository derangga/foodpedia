import { BookOpen, Heart, PlusCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";
import { UserRecipeItem } from "@/models/recipe";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

interface RecipeImageItemProps {
  recipe: UserRecipeItem;
}
const RecipeImageItem: React.FC<RecipeImageItemProps> = ({ recipe }) => {
  const imgSrc = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${recipe.id}/${recipe.image}`;
  return (
    <div
      key={recipe.id}
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
    </div>
  );
};

const EmptyState: React.FC<{ type: "recipes" | "favorites" }> = ({ type }) => (
  <div className="flex flex-col items-center justify-center py-12 px-4">
    {type === "recipes" ? (
      <div className="text-center">
        <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No recipes yet
        </h3>
        <p className="text-gray-500 mb-4">
          Share your first recipe with the community
        </p>
        <Link
          href="/recipes/new"
          className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Create Recipe
        </Link>
      </div>
    ) : (
      <div className="text-center">
        <Heart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No favorite recipes
        </h3>
        <p className="text-gray-500 mb-4">
          Start exploring and save recipes you love
        </p>
        <Link
          href="/recipes"
          className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Explore Recipes
        </Link>
      </div>
    )}
  </div>
);

interface ProfileTabsProps {
  recipes: UserRecipeItem[];
  favorites: UserRecipeItem[];
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ recipes, favorites }) => {
  return (
    <div className="flex gap-8">
      <Tabs defaultValue="recipes" className="container">
        <TabsList className="w-full rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            value="recipes"
            className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
          >
            <BookOpen className="h-5 w-5" />
            Recipes
          </TabsTrigger>
          <TabsTrigger
            value="favorites"
            className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-primary data-[state=active]:shadow-none "
          >
            <Heart className="h-5 w-5" />
            Favorites
          </TabsTrigger>
        </TabsList>
        <TabsContent value="recipes">
          {recipes.length === 0 ? (
            <EmptyState type="recipes" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recipes.map((e) => (
                <RecipeImageItem key={e.id} recipe={e} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="favorites">
          {favorites.length === 0 ? (
            <EmptyState type="favorites" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((e) => (
                <RecipeImageItem key={e.id} recipe={e} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
