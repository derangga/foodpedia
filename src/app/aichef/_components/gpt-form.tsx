"use client";
import { Button, Textarea } from "@heroui/react";
import { FormEvent, Key, useState } from "react";
import { askRecipedetail, askRecipeRecommendation } from "../_actions/ask-ai";
import { SuggestRecipeItem } from "./suggest-recipe-item";
import { ArrowUp } from "lucide-react";
import { AvatarMenu } from "@/shared/components/avatar-menu";
import Link from "next/link";
import Image from "next/image";
import { tryCatch } from "@/utils/try-catch";
import { redirect, useRouter } from "next/navigation";
import { User } from "@/model/user";
import { GptRecipeGuide, GptRecipeSuggestions } from "@/model/gpt";
import { ChatBubble } from "./chat-bubble";

type ChatModel = {
  sender: string;
  type?: string;
  message: string | GptRecipeSuggestions | GptRecipeGuide | null;
};

export const GptForm = ({ currenetUser }: { currenetUser: User }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState<Array<ChatModel>>([]);
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    let tempChat = chats;
    tempChat.push({
      sender: "user",
      message: formData.get("prompt") as string,
    });
    setChats(tempChat);

    e.currentTarget.reset();

    setIsLoading(true);
    const result = await askRecipeRecommendation(formData);

    const respondType = result?.reject_reason ? "rejection" : "suggestion";
    tempChat.push({
      sender: "gpt",
      type: respondType,
      message: result,
    });
    setChats(tempChat);

    setIsLoading(false);
  };

  const askRecipe = async (recipeName: string) => {
    let tempChat = chats;
    tempChat.push({
      sender: "user",
      message: recipeName,
    });
    setChats(tempChat);

    setIsLoading(true);
    const result = await askRecipedetail(recipeName);

    // TODO: handle null response
    if (!result) return;

    tempChat.push({
      sender: "gpt",
      type: "recipe",
      message: result,
    });

    setIsLoading(false);
  };

  const onCornerMenuAction = async (key: Key) => {
    if (key === "sign-out") {
      const result = await tryCatch(
        fetch("/api/auth/logout", {
          method: "POST",
        })
      );
      if (result.error) return;

      redirect("/");
    } else {
      router.push(`/${key}`);
    }
  };

  const chatBubble = (chat: ChatModel, key: number) => {
    if (chat.sender === "user") {
      return (
        <div
          key={key}
          className="py-2 px-4 bg-gray-100 rounded-xl w-fit self-end"
        >
          {chat.message as string}
        </div>
      );
    } else {
      return (
        <ChatBubble
          key={key}
          type={chat.type}
          chatModel={chat.message}
          askRecipe={askRecipe}
        />
      );
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
        <AvatarMenu
          name={currenetUser.name}
          onCornerMenuAction={onCornerMenuAction}
        />
      </header>
      <main className="grow py-8 px-3 flex flex-col w-1/2 mx-auto gap-10 overflow-scroll scrollbar-hide">
        {chats.length === 0 ? (
          <div className="my-14"></div>
        ) : (
          <div className="grow flex flex-col justify-end gap-3 px-4">
            {chats.map((e, idx) => chatBubble(e, idx + 1))}
          </div>
        )}
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
};
