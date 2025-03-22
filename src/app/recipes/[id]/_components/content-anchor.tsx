"use client";

import { Recipe } from "@/model/recipe";
import { favoriteAction } from "@/shared/actions/favorite";
import { Heart, MessageCircle, Share2 } from "lucide-react";

export type ContentAnchorProps = {
  isOwner: boolean;
  isFavorited?: boolean;
  favoriteCount?: number;
  commentCount?: number;
  recipe: Recipe;
};
export const ContentAnchor = (props: ContentAnchorProps) => {
  const onFavorite = async () => {
    await favoriteAction(props.recipe);
  };
  return (
    <div className="flex flex-row border-y py-4 my-6 px-4 gap-4">
      <div
        className={`flex gap-2 items-center ${
          props.isOwner ? "" : "hover:cursor-pointer"
        }`}
        onClick={onFavorite}
      >
        <Heart
          color={props.isFavorited ? "oklch(0.586 0.253 17.585)" : "#6b7280"}
          strokeWidth={props.isFavorited ? 0 : 2}
          size={22}
          fill={props.isFavorited ? "oklch(0.586 0.253 17.585)" : "transparent"}
        />
        <div className="font-poppins text-gray-400 hover:text-gray-500 text-sm">
          {props.favoriteCount || 0}
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <MessageCircle color="#6b7280" strokeWidth={2} size={22} />
        <div className="font-poppins text-gray-400 hover:text-gray-500 text-sm">
          {props.commentCount || 0}
        </div>
      </div>
      <div className="grow" />
      <Share2
        color="#6b7280"
        strokeWidth={1}
        size={22}
        className="hover:cursor-pointer"
      />
    </div>
  );
};
