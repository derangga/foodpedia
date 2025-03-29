import { authenticationStatus } from "@/shared/actions/authentication-status";
import { getUserById } from "@/shared/actions/get-user";
import { getRecipeByUserIdAction } from "@/shared/actions/recipe";
import { AppHeader } from "@/shared/components/app-header";
import { redirect } from "next/navigation";
import { RecipeCardSM } from "@/app/profile/_components/recipe-card-sm";
import { ProfileTabs } from "./_components/profile-tabs";
import { getFavoriteByUserIdAction } from "@/shared/actions/favorite";
import { RecipeFavCardSM } from "./_components/recipe-fav-card-sm";

export default async function Page() {
  const authStatus = await authenticationStatus();
  if (!authStatus.isAuthenticate) {
    redirect("/auth");
  }

  const currentUser = await getUserById(authStatus.userId);
  const recipes = await getRecipeByUserIdAction(authStatus.userId);
  const favoriteRecipes = await getFavoriteByUserIdAction(authStatus.userId);
  const avatar = currentUser?.name.charAt(0).toUpperCase() || "";

  return (
    <div>
      <AppHeader auth={authStatus} />
      <main className="w-2/3 mx-auto py-20 flex flex-col">
        <div className="flex flex-row gap-16 items-center">
          <div className="flex justify-center items-center size-24 bg-black rounded-full text-white font-poppins text-3xl font-bold">
            {avatar}
          </div>
          <div className="flex flex-col h-32 justify-between">
            <div className="font-poppins text-2xl font-semibold">
              {currentUser?.name}
            </div>
            <div className="font-poppins text-xl text-gray-500">
              {currentUser?.email}
            </div>
            <div className="flex flex-row w-80 text-lg font-poppins justify-between">
              <div className="font-semibold">
                50 <span className="font-normal text-gray-500">posts</span>
              </div>
              <div className="font-semibold">
                50 <span className="font-normal text-gray-500">favorites</span>
              </div>
            </div>
          </div>
        </div>
        <ProfileTabs
          className="w-full mt-14 flex flex-col items-center"
          recipeContent={
            <div className="grid grid-cols-2 gap-4 mt-6">
              {recipes.map((e, idx) => (
                <RecipeCardSM {...e} key={idx + 1} />
              ))}
            </div>
          }
          favoriteContent={
            <div className="grid grid-cols-2 gap-4 mt-6">
              {favoriteRecipes.map((e, idx) => (
                <RecipeFavCardSM {...e} key={idx + 1} />
              ))}
            </div>
          }
        />
      </main>
    </div>
  );
}
