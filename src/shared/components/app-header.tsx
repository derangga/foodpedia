"use client";

import Image from "next/image";
import Link from "next/link";
import { FilePenLine, Search } from "lucide-react";
import { AvatarMenu } from "./avatar-menu";
import { useEffect, useRef } from "react";
import { Input, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { AuthStatus } from "@/model/auth-status";

export type AppHeaderProps = {
  auth: AuthStatus;
  avatarName: string;
};
export const AppHeader = (props: AppHeaderProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const router = useRouter();
  const isLogin = props.auth.isAuthenticate;
  const name = props.avatarName;
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

  return (
    <header
      ref={ref}
      className="flex flex-row sticky top-0 w-screen bg-white px-8 h-16 items-center justify-center z-50 data-[scrolled]:shadow-md data-[scrolled]:bg-white transition-all"
    >
      <div className="grow">
        <div className="flex flex-row items-center space-x-4">
          <Image
            src={"/assets/foodpedia-logo.png"}
            alt="foodpedia"
            width={100}
            height={100}
          />
          <Link
            href={"/"}
            className="px-4 py-1 rounded-lg hover:bg-slate-50 font-semibold font-mono hover:cursor-pointer"
          >
            Home
          </Link>
          <Link
            href={"/recipes"}
            className="px-4 py-1 rounded-lg hover:bg-slate-50 font-semibold font-mono hover:cursor-pointer"
          >
            Recipes
          </Link>
          <Link
            href={"/aichef"}
            className="px-4 py-1 rounded-lg hover:bg-slate-50 font-semibold font-mono hover:cursor-pointer"
          >
            AI Chef
          </Link>
        </div>
      </div>
      <div className="flex flex-row justify-end space-x-2">
        <Input
          placeholder="Search..."
          className="w-fit"
          radius="full"
          endContent={
            <div className="p-1 hover:cursor-pointer rounded-full">
              <Search color="#9E9E9E" />
            </div>
          }
        />
        {isLogin && (
          <Link
            href={"/recipes/new"}
            className="flex flex-row items-center px-3 space-x-2 rounded-lg text-gray-400 hover:cursor-pointer hover:text-black"
          >
            <FilePenLine />
            <div>Write</div>
          </Link>
        )}
        {isLogin ? (
          <AvatarMenu name={name} />
        ) : (
          <div className="space-x-2">
            <Button
              variant="light"
              onPress={() => {
                router.push("/auth");
              }}
            >
              Sign in
            </Button>
            <Button
              className="border-black font-mono"
              variant="bordered"
              onPress={(e) => {
                router.push("/auth?tab=sign-up");
              }}
            >
              Sign up
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
