"use client";

import { useRef, useState } from "react";
import { Button } from "../button";
import { Send } from "lucide-react";
import { Message } from "@/models/message";
import { useAtom, useSetAtom } from "jotai";
import {
  useGptSessionAtom,
  useLoadingAtom,
  useMessageAtom,
} from "@/models/atom";
import { createGptSession, promptGpt } from "@/actions/gpt";
import { toast } from "sonner";

export const GptPromptInput: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useAtom(useMessageAtom);
  const setLoading = useSetAtom(useLoadingAtom);
  const setGptSessions = useSetAtom(useGptSessionAtom);
  const currentSession = useRef<string>("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const pushNewChatSideBar = async (message: Message) => {
    if (messages.length > 0) return;
    const result = await createGptSession(message.content as string);
    if (result instanceof Error) {
      toast.error("Create session failed", {
        description:
          "There is an error while create session, your current chat will not be save",
        duration: 2000,
      });
      return;
    }

    currentSession.current = result.id;
    setGptSessions((prev) => [
      {
        id: result.id,
        title: message.content as string,
        createdAt: message.timestamp,
      },
      ...prev,
    ]);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setInput("");
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);
    await pushNewChatSideBar(userMessage);

    if (currentSession.current === "") {
      setLoading(false);
      return;
    }

    const result = await promptGpt(currentSession.current, input);
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
    <div className="border-t border-gray-200 p-4">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <textarea
            ref={inputRef}
            value={input}
            name="prompt-editor"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask for recipe suggestions..."
            className="w-full p-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            rows={3}
          />
          <Button
            type="submit"
            className="absolute right-4 bottom-4 rounded-full text-white disabled:opacity-50"
            disabled={!input.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default GptPromptInput;
