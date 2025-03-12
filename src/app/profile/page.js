import { authenticationStatus } from "@/shared/actions/authentication-status";
import { getUserBySessionAction } from "@/shared/actions/get-user";
import { getRecipeByUserIdAction } from "@/shared/actions/recipe";
import { AppHeader } from "@/shared/components/app-header";
import { RecipeCardLG } from "@/shared/components/recipe-card-lg";
import { Divider } from "@heroui/react";
import Link from "next/link";

export default async function Page() {
  const authStatus = await authenticationStatus();
  const currentUser = await getUserBySessionAction(authStatus?.sessionId);
  const recipes = await getRecipeByUserIdAction();

  return (
    <div>
      <AppHeader authStatus={authStatus} avatarName={currentUser?.name || ""} />
      <main className="w-2/3 mx-auto py-20 flex flex-col">
        <div className="flex flex-row gap-16 items-center">
          <div className="flex justify-center items-center size-24 bg-black rounded-full text-white font-poppins text-3xl font-bold">
            J
          </div>
          <div className="flex flex-col h-32 justify-between">
            <div className="font-poppins text-2xl font-semibold">John Doe</div>
            <div className="font-poppins text-xl text-gray-500">
              johndoe@gmail.com
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
        <Divider className="my-14" />
        <div className="grid grid-cols-4 gap-4 mt-6">
          {recipes.map((e, idx) => (
            <Link key={idx + 1} href={`/recipes/${e.id}`}>
              <RecipeCardLG recipe={e} />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
