"use client";
import React, { useState } from "react";
import { BookOpen, Heart } from "lucide-react";
import clsx from "clsx";

// Dummy data for the profile
const USER_DATA = {
  name: "Emily Johnson",
  username: "@emilycooks",
  avatar: "https://images.pexels.com/photos/3338681/pexels-photo-3338681.jpeg",
  bio: "Passionate food lover | Recipe creator | Sharing my culinary adventures",
  stats: {
    recipes: 24,
    followers: 1420,
    following: 891,
  },
};

// Dummy data for recipes
const RECIPES = [
  {
    id: 1,
    title: "Chocolate Lava Cake",
    image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg",
    likes: 245,
    publishedAt: new Date("2024-02-15"),
  },
  {
    id: 2,
    title: "Grilled Chicken Salad",
    image: "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg",
    likes: 189,
    publishedAt: new Date("2024-02-14"),
  },
  {
    id: 3,
    title: "Beef Stroganoff",
    image: "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg",
    likes: 321,
    publishedAt: new Date("2024-02-13"),
  },
  {
    id: 4,
    title: "Classic Tiramisu",
    image: "https://images.pexels.com/photos/6601811/pexels-photo-6601811.jpeg",
    likes: 178,
    publishedAt: new Date("2024-02-12"),
  },
  {
    id: 5,
    title: "Spicy Chicken Wings",
    image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg",
    likes: 267,
    publishedAt: new Date("2024-02-11"),
  },
  {
    id: 6,
    title: "Beef Tacos",
    image: "https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg",
    likes: 198,
    publishedAt: new Date("2024-02-10"),
  },
  {
    id: 7,
    title: "Berry Cheesecake",
    image: "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg",
    likes: 289,
    publishedAt: new Date("2024-02-09"),
  },
  {
    id: 8,
    title: "Chicken Curry",
    image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
    likes: 234,
    publishedAt: new Date("2024-02-08"),
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"recipes" | "favorites">(
    "recipes"
  );

  return (
    <div className="container mx-auto px-4 py-24">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
        {/* Profile Picture */}
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={USER_DATA.avatar}
            alt={USER_DATA.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-2xl font-semibold">{USER_DATA.name}</h1>
            <span className="text-gray-600">{USER_DATA.username}</span>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mb-6">
            <div className="text-center">
              <div className="font-semibold">{USER_DATA.stats.recipes}</div>
              <div className="text-sm text-gray-600">Recipes</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">{USER_DATA.stats.followers}</div>
              <div className="text-sm text-gray-600">Followers</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">{USER_DATA.stats.following}</div>
              <div className="text-sm text-gray-600">Following</div>
            </div>
          </div>

          {/* Bio */}
          <p className="text-gray-800 whitespace-pre-line">{USER_DATA.bio}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <div className="flex gap-8">
          <button
            className={clsx(
              "flex items-center gap-2 pb-4 font-medium",
              activeTab === "recipes"
                ? "text-orange-500 border-b-2 border-orange-500"
                : "text-gray-600 hover:text-gray-900"
            )}
            onClick={() => setActiveTab("recipes")}
          >
            <BookOpen className="h-5 w-5" />
            Recipes
          </button>
          <button
            className={clsx(
              "flex items-center gap-2 pb-4 font-medium",
              activeTab === "favorites"
                ? "text-orange-500 border-b-2 border-orange-500"
                : "text-gray-600 hover:text-gray-900"
            )}
            onClick={() => setActiveTab("favorites")}
          >
            <Heart className="h-5 w-5" />
            Favorites
          </button>
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {RECIPES.map((recipe) => (
          <div
            key={recipe.id}
            className="group relative aspect-square rounded-lg overflow-hidden bg-gray-100"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-white text-center p-4">
                <h3 className="font-semibold mb-2">{recipe.title}</h3>
                <div className="flex items-center justify-center gap-2">
                  <Heart className="h-5 w-5 fill-white" />
                  <span>{recipe.likes}</span>
                </div>
                <div className="text-sm mt-2">MMM d, yyyy</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
