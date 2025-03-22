"use client";

import { Tab, Tabs } from "@heroui/react";
import { CookingPot, Heart } from "lucide-react";
import { ReactNode } from "react";

export const ProfileTabs = ({
  className,
  recipeContent,
  favoriteContent,
}: {
  className?: string;
  recipeContent: ReactNode;
  favoriteContent: ReactNode;
}) => {
  return (
    <div className={className}>
      <Tabs aria-label="Dynamic tabs" variant="underlined" color="warning">
        <Tab
          key="recipe"
          title={
            <div className="flex items-center space-x-2">
              <CookingPot />
              <span>Recipe</span>
            </div>
          }
        >
          {recipeContent}
        </Tab>
        <Tab
          key="favorite"
          title={
            <div className="flex items-center space-x-2">
              <Heart />
              <span>Favorite</span>
            </div>
          }
        >
          {favoriteContent}
        </Tab>
      </Tabs>
    </div>
  );
};
