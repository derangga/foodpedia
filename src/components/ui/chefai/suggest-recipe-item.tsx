"use client";

import { GptRecipeSuggestions } from "@/models/gpt";
import { Button } from "../button";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  useMessageAtom,
  useLoadingAtom,
  useGptSessionAtom,
} from "@/models/atom";
import { Message } from "@/models/message";
import { askRecipePromptGpt } from "@/actions/gpt";

export type SuggestRecipeItemProps = {
  recipe: GptRecipeSuggestions;
};

export const SuggestRecipeItem: React.FC<SuggestRecipeItemProps> = ({
  recipe,
}) => {
  const [messages, setMessages] = useAtom(useMessageAtom);
  const sessions = useAtomValue(useGptSessionAtom);
  const setLoading = useSetAtom(useLoadingAtom);
  const categories = recipe.categories.join(", ");

  const handleAskRecipe = async (recipeName: string) => {
    if (!recipeName.trim()) return;

    /**
     * active session always place at index 0
     * @file gpt-prompt-input.tsx
     */
    const activeSession = sessions[0].id || "";
    const userMessage: Message = {
      id: Date.now().toString(),
      content: recipeName,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    const message = messages.find((msg) => typeof msg.language === "string");
    const result = await askRecipePromptGpt(
      activeSession,
      message?.language || "english",
      recipeName
    );
    setLoading(false);
    if (!result) return;

    // Simulate AI response delay
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: result.answer,
      answerType: result.answer_type,
      language: result.language_use,
      role: "assistant",
      timestamp: new Date(),
      isTyping: result.answer_type === "recipe_food",
    };

    setMessages((prev) => [...prev, aiMessage]);
  };

  return (
    <div className="flex flex-row items-center justify-between hover:shadow-sm rounded-xl border py-2 px-4 gap-3 max-w-[560px]">
      <div className="flex flex-col gap-1">
        <div className="font-poppins font-semibold line-clamp-2">
          {recipe.title}
        </div>
        <div className="text-sm">
          Categories:{" "}
          <span className="text-orange-400 font-semibold">{categories}</span>
        </div>
      </div>
      <Button
        size="sm"
        color="warning"
        className="text-white"
        onClick={() => handleAskRecipe(recipe.title)}
      >
        Ask recipe
      </Button>
    </div>
  );
};
