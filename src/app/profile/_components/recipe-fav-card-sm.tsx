import { ImageClient } from "@/app/recipes/[id]/_components/image-client";
import { RecipeCardProps } from "../../../shared/components/recipe-card-lg";
import { imgURL } from "@/utils/image-url";
import dateFormat from "@/utils/date-time";
import Link from "next/link";
import { RecipeFavAction } from "./recipe-fav-action";

export const RecipeFavCardSM = (props: RecipeCardProps) => {
  const imgSrc = imgURL(`${props.id}/${props.image}`);
  return (
    <div className="flex border border-gray-100 hover:shadow-md rounded-xl gap-3">
      <Link
        href={`/recipes/${props.id}`}
        className="flex-none rounded-l-xl size-32 overflow-hidden"
      >
        <ImageClient
          src={imgSrc}
          alt={props.title}
          className="object-cover size-full"
        />
      </Link>
      <Link
        href={`/recipes/${props.id}`}
        className="grow flex flex-col flex-wrap gap-2"
      >
        <div className="font-poppins text-xl font-semibold line-clamp-2">
          {props.title}
        </div>
        <div>
          Categories:{" "}
          <span className="text-orange-400">{props.categories.join(", ")}</span>
        </div>
        <div>Published at: {dateFormat(props.createdAt, "ll")}</div>
      </Link>
      <div className="self-end bottom-0">
        <RecipeFavAction recipeId={props.id} />
      </div>
    </div>
  );
};
