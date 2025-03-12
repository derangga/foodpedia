"use client";
import { Button, Textarea } from "@heroui/react";
import { useState } from "react";
import { askRecipedetail, askRecipeRecommendation } from "./_actions/ask-ai";
import { SuggestRecipeItem } from "./_components/suggest-recipe-item";
import { ArrowUp } from "lucide-react";
import { AvatarMenu } from "@/shared/components/avatar-menu";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    let tempChat = chats;
    tempChat.push({
      sender: "user",
      message: formData.get("prompt").toString(),
    });
    setChats(tempChat);

    e.currentTarget.reset();

    setIsLoading(true);
    const result = await askRecipeRecommendation(formData);

    const respondType = result.reject_reason ? "rejection" : "suggestion";
    tempChat.push({
      sender: "gpt",
      type: respondType,
      message: result,
    });
    setChats(tempChat);

    setIsLoading(false);
  };

  const askRecipe = async (recipeName) => {
    let tempChat = chats;
    tempChat.push({
      sender: "user",
      message: recipeName,
    });
    setChats(tempChat);

    setIsLoading(true);
    const result = await askRecipedetail(recipeName);
    tempChat.push({
      sender: "gpt",
      type: "recipe",
      message: result,
    });

    setIsLoading(false);
  };

  const chatBubble = (chat, key) => {
    if (chat.sender === "user") {
      return (
        <div
          key={key}
          className="py-2 px-4 bg-gray-100 rounded-xl w-fit self-end"
        >
          {chat.message}
        </div>
      );
    } else {
      const { message } = chat;
      if (chat.type === "recipe") {
        const recipe = message.recipe;
        const categories = recipe.categories.join(", ");
        return (
          <div key={key} className="flex flex-col gap-2">
            <div className="font-semibold text-xl">{recipe.title}</div>
            <div className="font-semibold text-xl">
              Categories:{" "}
              <span className="text-orange-400 text-base">{categories}</span>
            </div>
            <div className="font-semibold text-xl">Ingredients: </div>
            <ul className="list-disc pl-4">
              {recipe.ingredients?.map((e, idx) => (
                <li key={idx + 1}>{e}</li>
              ))}
            </ul>
            <div className="font-semibold text-xl">Guide to cook</div>
            <ul className="list-disc pl-4">
              {recipe.steps?.map((e, idx) => (
                <li key={idx + 1}>{e.detail}</li>
              ))}
            </ul>
          </div>
        );
      } else if (chat.type === "suggestion") {
        return (
          <div key={key} className="flex flex-col gap-2 w-[36rem]">
            {message.recipes.map((e, idx) => (
              <SuggestRecipeItem
                key={idx + 1}
                recipe={e}
                askRecipe={askRecipe}
              />
            ))}
          </div>
        );
      } else if (chat.type === "rejection") {
        return (
          <div key={key} className="py-2 px-4">
            {message.reject_reason}
          </div>
        );
      }

      return <div key={key} />;
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <header className="h-16 w-full flex flex-row sticky top-0 z-50 justify-between items-center px-8 bg-white shadow-sm">
        <Link href={"/"}>
          <Image
            src={"/assets/foodpedia-logo.png"}
            alt="foodpedia"
            width={100}
            height={100}
          />
        </Link>
        <AvatarMenu name="Ace" />
      </header>
      <main className="grow py-8 px-3 flex flex-col w-1/2 mx-auto gap-10 overflow-scroll scrollbar-hide">
        <div className="grow flex flex-col justify-end gap-3 px-4">
          {chats.map((e, idx) => chatBubble(e, idx + 1))}
        </div>
        <form
          className="flex sticky bottom-0 gap-3 bg-white shadow-xl border rounded-3xl z-50 py-4 px-6"
          onSubmit={onSubmit}
        >
          <Textarea
            name="prompt"
            placeholder="ask a recipe based on ingredients"
            variant="underlined"
            minRows={2}
            color="warning"
          ></Textarea>
          <Button
            type="submit"
            isLoading={isLoading}
            color="warning"
            isIconOnly
            radius="full"
            className="text-white"
          >
            <ArrowUp />
          </Button>
        </form>
      </main>
    </div>
  );
}
