import { ChefHat } from "lucide-react";
import Image from "next/image";

export const RecipeCardLG = () => {
  return (
    <div className="bg-slate-100 rounded-2xl h-[28rem] p-3 flex flex-col justify-between hover:cursor-pointer">
      <div className="font-poppins font-semibold text-2xl">
        Spicy Vermicelli Noodles Salad
      </div>
      <div className="relative rounded-xl w-full h-72 overflow-hidden">
        <Image
          src={"/assets/dummy-food.webp"}
          fill
          style={{ objectFit: "cover" }}
          alt="content-1"
        />
      </div>
      <div className="bg-black w-full rounded-full h-11 flex flex-row items-center justify-between px-3">
        <div className="text-white text-sm">See complete recipe</div>
        <div className="p-1 bg-white rounded-full">
          <ChefHat size={18} />
        </div>
      </div>
    </div>
  );
};
