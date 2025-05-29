"use client";

import React, { useRef, useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { useLoadingAtom, useMessageAtom } from "@/models/atom";
import GptPromptInput from "@/components/ui/chefai/gpt-prompt-input";
import { Greeting, useGreeting } from "@/hooks/use-gpt-greeting";
import MessageBox from "@/components/ui/chefai/message-box";

const greetings: Greeting[] = [
  {
    title: "🍳 Ready to cook something amazing?",
    description: "Ask me for recipes, cooking tips, or ingredient suggestions!",
  },
  {
    title: "👨‍🍳 What's cooking today?",
    description:
      "I can help you find recipes, suggest dishes, or answer any cooking questions!",
  },
  {
    title: "🍽️ Let's create something delicious!",
    description: "Ask me about recipes, ingredients, or cooking techniques",
  },
];

export default function ChefAiPage() {
  const [messages, setMessages] = useAtom(useMessageAtom);
  const isLoading = useAtomValue(useLoadingAtom);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const greeting = useGreeting(greetings);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleTypingComplete = (messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, isTyping: false } : msg
      )
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="grow p-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="max-w-3xl mx-auto h-full flex flex-col items-center justify-center gap-2">
            <div className="text-2xl font-semibold">{greeting.title}</div>
            <div className="text-xl">{greeting.description}</div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <MessageBox
              messages={messages}
              handleTypingComplete={handleTypingComplete}
            />

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex items-center text-gray-500 mb-6 mr-8">
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Section */}
      <GptPromptInput />
    </div>
  );
}
