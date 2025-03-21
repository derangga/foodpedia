"use client";
import { Button, Textarea } from "@heroui/react";
import { FormEvent, useState } from "react";
import { askRecipedetail, askRecipeRecommendation } from "../_actions/ask-ai";
import { ArrowUp } from "lucide-react";
import { User } from "@/model/user";
import { GptRecipeGuide, GptRecipeSuggestions } from "@/model/gpt";
import { ChatBubble } from "./chat-bubble";
import { AppHeader } from "@/shared/components/app-header";
import { AuthStatus } from "@/model/auth-status";

type ChatModel = {
  sender: string;
  type?: string;
  message: string | GptRecipeSuggestions | GptRecipeGuide | null;
};

export const GptForm = ({
  authStatus,
  currentUser,
}: {
  authStatus: AuthStatus;
  currentUser: User;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState<Array<ChatModel>>([]);

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
      <AppHeader auth={authStatus} avatarName={currentUser?.name || ""} />
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
