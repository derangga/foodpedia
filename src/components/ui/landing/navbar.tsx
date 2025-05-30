"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  ChefHat,
  LogIn,
  X,
  FilePlus,
  CircleUserRound,
  LogOut,
} from "lucide-react";
import { Button } from "../button";
import authClient from "@/lib/auth-client";
import { User } from "better-auth";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { useRouter } from "next/navigation";

interface SessionProps {
  user?: User;
}

const Navbar: React.FC<SessionProps> = ({ user }) => {
  const headerRef = useRef<HTMLElement | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!headerRef.current) return;
    const header = headerRef.current;

    const handleScroll = () => {
      if (window.scrollY > 0) {
        header.dataset.scrolled = "";
      } else {
        delete header.dataset.scrolled;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const signIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.refresh();
        },
      },
    });
  };

  const fallbackAvatar = user?.name.charAt(0);

  return (
    <header
      ref={headerRef}
      className="fixed w-full top-0 z-50 transition-all duration-300 bg-transparent data-[scrolled]:bg-white data-[scrolled]:shadow-md"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full flex items-center justify-between h-16 md:h-20">
          <Link className="flex items-center hover:cursor-pointer" href={"/"}>
            <ChefHat className="h-8 w-8 text-orange-500" />
            <span className="ml-2 text-xl font-bold text-orange-600">
              Foodpedia
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink icon={null} label="Recipes" route="/recipes" />
            <NavLink icon={null} label="ChefAI" route="/chefai" />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="hover:cursor-pointer">
                    <AvatarImage src={user.image || ""} />
                    <AvatarFallback className="rounded-full bg-gray-200 hover:bg-gray-700 hover:text-white">
                      {fallbackAvatar}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => router.push("/recipes/new")}
                    >
                      <FilePlus />
                      Create Recipe
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/profiles")}>
                      <CircleUserRound />
                      Profile
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="focus:bg-red-200 focus:text-red-600"
                    onClick={() => signOut()}
                  >
                    <LogOut />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                className="rounded-full bg-orange-500 text-white font-medium transition-all hover:bg-orange-600 hover:cursor-pointer"
                onClick={() => {
                  signIn();
                }}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-500 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink icon={null} label="Recipes" route="/recipes" />
            <MobileNavLink icon={null} label="ChefAI" route="/chefai" />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="hover:cursor-pointer">
                    <AvatarImage src={user.image || ""} />
                    <AvatarFallback className="rounded-full bg-gray-200 hover:bg-gray-700 hover:text-white">
                      {fallbackAvatar}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => router.push("/recipes/new")}
                    >
                      <FilePlus />
                      Create Recipe
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/profiles")}>
                      <CircleUserRound />
                      Profile
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="focus:bg-red-200 focus:text-red-600"
                    onClick={() => signOut()}
                  >
                    <LogOut />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => {
                  signIn();
                }}
              >
                <LogIn /> Sign in
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  icon: React.ReactNode | null;
  label: string;
  route: string;
}

const NavLink: React.FC<NavLinkProps> = ({ icon, label, route }) => (
  <a
    href={route}
    className="flex items-center text-orange-400 hover:text-orange-500 transition-colors font-medium"
  >
    {icon && <span className="mr-1">{icon}</span>}
    {label}
  </a>
);

interface MobileNavLinkProps extends NavLinkProps {
  isButton?: boolean;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({
  icon,
  label,
  isButton,
}) => (
  <a
    href="#"
    className={`flex items-center py-2 px-3 rounded-md ${
      isButton
        ? "bg-orange-500 text-white font-medium"
        : "text-gray-700 hover:bg-gray-100"
    }`}
  >
    {icon && <span className="mr-2">{icon}</span>}
    {label}
  </a>
);

export default Navbar;
