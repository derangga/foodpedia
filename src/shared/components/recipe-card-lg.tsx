import { ImageClient } from "@/app/recipes/[id]/_components/image-client";
import { imgURL } from "@/utils/image-url";
import { ChefHat } from "lucide-react";

export type RecipeCardProps = {
  id: number;
  title: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  userId: number;
  categories: string[];
  ingredients: string[];
  story: string | null;
  description: string;
};
export const RecipeCardLG = (props: RecipeCardProps) => {
  const imgSrc = imgURL(`${props.id}/${props.image}`);
  return (
    <div className="bg-slate-100 rounded-2xl h-[26rem] p-3 flex flex-col hover:cursor-pointer">
      <div className="font-poppins font-semibold text-xl h-[90px] line-clamp-3">
        {props.title}
      </div>
      <div className="relative rounded-xl w-full h-56 overflow-hidden">
        <ImageClient
          src={imgSrc}
          alt={props.title}
          className="object-cover size-full"
        />
      </div>
      <div className="grow" />
      <div className="bg-black w-full rounded-full h-11 flex flex-row items-center justify-between px-3">
        <div className="text-white text-sm">See complete recipe</div>
        <div className="p-1 bg-white rounded-full">
          <ChefHat size={18} />
        </div>
      </div>
    </div>
  );
};
