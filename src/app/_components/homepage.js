"use client";

import { RecipeCardLG } from "@/shared/components/recipe-card-lg";
import { CircleUserRound, Earth, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { tryCatch } from "@/utils/try-catch";
import { AppHeader } from "@/shared/components/app-header";

export const Homepage = ({ authStatus, currentUser }) => {
  const ref = useRef(null);
  const [isLogin, setIsLogin] = useState(authStatus?.isAuthenticate || false);
  const router = useRouter();
  const executeLogout = async () => {
    console.log("cal logout");
    return await tryCatch(
      fetch("/api/auth/logout", {
        method: "POST",
      })
    );
  };

  useEffect(() => {
    if (!ref.current) return;
    const header = ref.current;
    const onScroll = () => {
      if (window.scrollY > 0) {
        header.dataset.scrolled = "";
      } else {
        delete header.dataset.scrolled;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!authStatus.isAuthenticate && authStatus.sessionId) {
      executeLogout().then((r) => {
        if (r.data.ok) {
          setIsLogin(false);
        }
      });
    }
  }, [authStatus]);

  const onCornerMenuAction = async (key) => {
    if (key === "sign-out") {
      const result = await executeLogout();
      if (result.error) return;

      setIsLogin(false);
    } else {
      router.push(`/${key}`);
    }
  };

  return (
    <>
      <AppHeader
        isLogin={isLogin}
        avatarName={currentUser?.email || ""}
        onCornerMenuAction={onCornerMenuAction}
      />
      <main className="flex flex-col w-screen py-6 px-8">
        <section>
          <div className="relative w-full rounded-xl h-[30rem] overflow-hidden">
            <Image
              src={"/assets/backdrop-food.png"}
              fill
              style={{ objectFit: "cover" }}
              alt="header-image"
              className="object-[100%_75%]"
            />
            <div className="absolute h-full xl:w-1/2 lg:w-2/3">
              <div className="max-w-[38rem] mx-auto flex flex-col items-center mt-16 space-y-6">
                <div className="font-poppins text-7xl font-bold text-white">
                  Adventure of
                  <span className="text-orange-400">delicious</span>
                </div>
                <div className="font-poppins text-slate-200 mx-auto text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="flex flex-row w-full h-52 mt-6 space-x-5">
            <div className="grow rounded-xl bg-slate-100">
              <div className="grid grid-cols-3 gap-4 h-full">
                <div className="xl:w-72 lg:w-44 flex flex-col p-3">
                  <div className="p-2 w-fit rounded-full bg-white">
                    <CircleUserRound />
                  </div>
                  <div className="font-bold mt-4">Fun Comunity</div>
                  <p className="mt-1 line-clamp-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
                <div className="xl:w-72 lg:w-44 flex flex-col p-3">
                  <div className="p-2 w-fit rounded-full bg-white">
                    <Earth />
                  </div>
                  <div className="font-bold mt-4">Fun Comunity</div>
                  <p className="mt-1 line-clamp-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
                <div className="xl:w-72 lg:w-44 flex flex-col p-3">
                  <div className="p-2 w-fit rounded-full bg-white">
                    <Heart />
                  </div>
                  <div className="font-bold mt-4">Fun Comunity</div>
                  <p className="mt-1 line-clamp-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              </div>
            </div>
            <Link
              href={"/ai-chef"}
              className="w-48 flex flex-col rounded-xl border border-slate-100 bg-slate-50 shadow-lg"
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
                <div className="font-poppins font-semibold text-orange-400 text-lg hover:underline">
                  Talk with AI-Chef
                </div>
              </div>
            </Link>
            <div className="w-48 flex flex-col rounded-xl border border-slate-100 bg-slate-50 shadow-lg p-3">
              <div className="font-poppins font-semibold text-orange-400 text-lg ">
                FEATURED
              </div>
              <div className="flex flex-col grow justify-between mt-1">
                <div className="font-poppins font-bold text-xl">
                  Ranch Chicken and Rice
                </div>
                <div className=""></div>
                <Link
                  className="font-poppins text-sm underline font-semibold"
                  href={"/recipe/id"}
                >
                  See recipe
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="flex flex-col py-8">
            <div className="text-4xl font-poppins font-semibold">
              Popular <span className="text-orange-400">Recipes</span>
            </div>
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 gap-x-4 mt-6">
              <RecipeCardLG />
              <RecipeCardLG />
              <RecipeCardLG />
              <RecipeCardLG />
              <RecipeCardLG />
            </div>
          </div>
        </section>
      </main>
      <footer></footer>
    </>
  );
};
