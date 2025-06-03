import { getRecipeByUser } from "@/actions/recipe";
import { getProfiles } from "@/actions/user";
import EmptyRecipe from "@/components/ui/profiles/empty-recipe";
import RecipeImageItem from "@/components/ui/profiles/recipe-image-item";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [profile, recipes] = await Promise.all([
    getProfiles(id),
    getRecipeByUser(id),
  ]);

  if (profile === null) {
    notFound();
  }

  const username = profile.email.split("@")[0];

  return (
    <div className="container mx-auto px-4 py-24">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
        {/* Profile Picture */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={profile.image || ""}
            alt={profile.name}
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-2xl font-semibold">{profile.name}</h1>
            <span className="text-gray-600">{username}</span>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mb-6">
            <div className="text-center">
              <div className="font-semibold">{profile.recipePost}</div>
              <div className="text-sm text-gray-600">Recipes</div>
            </div>
          </div>

          {/* Bio */}
          <p className="text-gray-800 whitespace-pre-line">{profile.bio}</p>
        </div>
      </div>

      <div className="my-8 p-0.5 bg-gray-200 rounded-full" />
      {recipes.length === 0 ? (
        <EmptyRecipe />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recipes.map((e) => (
            <RecipeImageItem key={e.id} recipe={e} />
          ))}
        </div>
      )}
    </div>
  );
}
