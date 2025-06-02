import React from "react";
import ProfileTabs from "@/components/ui/profiles/profile-tabs";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getRecipeByUser, getRecipeFavorite } from "@/actions/recipe";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { getProfiles } from "@/actions/user";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user ?? redirect("/");
  const [profile, recipes, favorites] = await Promise.all([
    getProfiles(user.id),
    getRecipeByUser(user.id),
    getRecipeFavorite(user.id),
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

      <ProfileTabs recipes={recipes} favorites={favorites} />
    </div>
  );
}
