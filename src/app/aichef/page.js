"use client";
import { addToast, Button, Spinner, Textarea } from "@heroui/react";
import { useActionState, useEffect, useState } from "react";
import { askAI } from "./_actions/ask-ai";
import { SuggestRecipeItem } from "./_components/suggest-recipe-item";
import { ArrowUp, CornerUpLeft } from "lucide-react";
import { AvatarMenu } from "@/shared/components/avatar-menu";

export default function Page() {
  const [showSubmit, setShowSubmit] = useState(false);
  const [state, formAction, isLoading] = useActionState(askAI, null);

  useEffect(() => {
    if (state?.reject_reason) {
      addToast({
        title: "Invalid prompt context",
        description: "Your question is not related food recipe",
        color: "danger",
      });
    }
  }, [state]);

  return (
    <div className="h-full flex flex-col">
      <header className="h-20 w-full flex flex-row justify-between items-center px-6 bg-white">
        <Button isIconOnly variant="light">
          <CornerUpLeft />
        </Button>
        <AvatarMenu name="Ace" />
      </header>
      <main className="grow py-8 px-3 flex flex-col w-2/3 mx-auto gap-10 overflow-scroll scrollbar-hide">
        <div className="grow flex flex-col justify-end gap-3 px-4">
          {state?.recipes.map((e, idx) => (
            <SuggestRecipeItem key={idx + 1} recipe={e} />
          ))}
        </div>
        <form
          className="flex sticky bottom-0 gap-3 bg-white shadow-xl border rounded-3xl z-50 py-4 px-6"
          action={formAction}
        >
          <Textarea
            name="prompt"
            placeholder="ask a recipe based on ingridients"
            variant="underlined"
            minRows={2}
            color="warning"
            onValueChange={(s) => {
              if (s.length > 0 && !showSubmit) {
                setShowSubmit(true);
              } else if (s.length === 0 && showSubmit) {
                setShowSubmit(false);
              }
            }}
          ></Textarea>
          <Button
            type="submit"
            isLoading={isLoading}
            color="warning"
            isIconOnly
            radius="full"
            className={`text-white ${showSubmit ? "" : "hidden"}`}
          >
            <ArrowUp />
          </Button>
        </form>
      </main>
    </div>
  );
}
