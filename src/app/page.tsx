import { authenticationStatus } from "@/shared/actions/authentication-status";
import { RecipeCardLG } from "@/shared/components/recipe-card-lg";
import { CircleUserRound, Earth, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AppHeader } from "@/shared/components/app-header";
import { getRecipes } from "../shared/actions/recipe";
import { Footer } from "@/shared/components/footer";

export default async function Page() {
  const auth = await authenticationStatus();

  // TODO: replace with top 5 recipe favorite
  const recipes = await getRecipes();
  return (
    <>
      <AppHeader auth={auth} />
      <main className="flex flex-col w-screen py-6 px-8">
        <section>
          <div className="relative w-full rounded-3xl h-[30rem] overflow-hidden">
            <Image
              src={"/assets/backdrop-food.webp"}
              fill
              style={{ objectFit: "cover" }}
              alt="header-image"
              className="object-[100%_75%]"
            />
            <div className="absolute h-full xl:w-1/2 lg:w-2/3">
              <div className="max-w-[38rem] mx-auto flex flex-col items-center mt-16 space-y-6">
                <div className="font-poppins text-7xl font-bold text-white">
                  Adventure of
                  <span className="text-orange-400"> delicious</span>
                </div>
                <div className="font-poppins text-slate-200 mx-auto text-lg">
                  Explore food recipe around the world and unleash your inner
                  chef easy way with foodpedia
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="flex flex-row w-full h-52 mt-6 gap-6">
            <div className="rounded-xl bg-slate-100">
              <div className="grid grid-cols-3 h-full">
                <div className="flex flex-col p-3">
                  <div className="p-2 w-fit rounded-full bg-white">
                    <CircleUserRound />
                  </div>
                  <div className="font-bold mt-4">User-centered</div>
                  <div className="mt-1 line-clamp-3">
                    Your feedback shapes our platform, ensuring a seamless and
                    satisfying culinary journey
                  </div>
                </div>
                <div className="flex flex-col p-3">
                  <div className="p-2 w-fit rounded-full bg-white">
                    <Earth />
                  </div>
                  <div className="font-bold mt-4">Diverse Recipe</div>
                  <div className="mt-1 line-clamp-3">
                    We celebrate diverse culinary tranditions from around the
                    world, inspiring you today.
                  </div>
                </div>
                <div className="flex flex-col p-3">
                  <div className="p-2 w-fit rounded-full bg-white">
                    <Heart />
                  </div>
                  <div className="font-bold mt-4">Fun Community</div>
                  <div className="mt-1 line-clamp-3">
                    We foster a vibrant foodies community where joy comes with
                    sharing recipe with us.
                  </div>
                </div>
              </div>
            </div>
            <Link
              href={"/aichef"}
              className="w-72 flex flex-col rounded-xl border border-slate-100 bg-slate-50 shadow-md"
            >
              <div className="grow relative w-full rounded-t-xl overflow-hidden">
                <Image
                  src={"/assets/ai-chef.webp"}
                  sizes="(max-width: 12rem)"
                  fill
                  style={{ objectFit: "cover" }}
                  alt="header-image"
                />
              </div>
              <div className="flex flex-col justify-center h-10 px-3">
                <div className="font-poppins font-semibold text-orange-400 hover:underline">
                  Talk with AI-Chef
                </div>
              </div>
            </Link>
          </div>
        </section>
        <section>
          <div className="flex flex-col py-8">
            <div className="text-4xl font-poppins font-semibold">
              Popular <span className="text-orange-400">Recipes</span>
            </div>
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 gap-x-4 mt-6">
              {recipes.map((e, idx) => (
                <Link key={idx + 1} href={`/recipes/${e.id}`}>
                  <RecipeCardLG {...e} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
