import { authenticationStatus } from "@/shared/actions/authentication-status";
import { getUserById } from "@/shared/actions/get-user";
import { AppHeader } from "@/shared/components/app-header";
import Image from "next/image";
import { getRecipes } from "../../shared/actions/recipe";
import { RecipeCardLG } from "@/shared/components/recipe-card-lg";
import Link from "next/link";

export default async function Page() {
  const authStatus = await authenticationStatus();
  const currentUser = await getUserById(authStatus.userId);
  const recipes = await getRecipes();
  return (
    <>
      <AppHeader auth={authStatus} avatarName={currentUser?.name || ""} />
      <main className="flex flex-col w-screen py-6 px-8">
        <section>
          <div className="relative w-full rounded-3xl h-96 overflow-hidden">
            <Image
              src={"/assets/recipes-backdrop-food.webp"}
              fill
              style={{ objectFit: "cover" }}
              alt="header-image"
              className="object-[100%_50%]"
            />
            <div className="absolute h-full w-1/2">
              <div className="max-w-[38rem] mx-auto h-full flex flex-col justify-center space-y-6">
                <div className="font-poppins text-7xl font-bold text-white">
                  Explore
                  <br />
                  <span className="text-orange-400"> Culinary </span>
                  Insight
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="flex items-center gap-8 my-16">
            <div className="h-[4px] grow bg-gray-200 rounded-full" />
            <div className="font-poppins font-semibold text-3xl">
              Looking for a <span className="text-orange-400">recipe</span> for
              today?
            </div>
            <div className="h-[4px] grow bg-gray-200 rounded-full" />
          </div>
          <div className="grid xl:grid-cols-5 lg:grid-cols-4 gap-x-4 mt-6">
            {recipes.map((e, idx) => (
              <Link key={idx + 1} href={`/recipes/${e.id}`}>
                <RecipeCardLG {...e} />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
