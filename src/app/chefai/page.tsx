"use client";
import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { format } from "date-fns";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import TypingMarkdownMessage from "@/components/ui/chefai/typing-markdown-message";
import { Button } from "@/components/ui/button";
import { askRecipePromptGpt, promptGpt } from "@/actions/gpt";
import { GptRecipeSuggestions } from "@/models/gpt";
import { SuggestRecipeItem } from "@/components/ui/chefai/suggest-recipe-item";

interface Message {
  id: string;
  answerType?: string;
  language?: string;
  content: string | GptRecipeSuggestions[];
  role: "user" | "assistant";
  isTyping?: boolean;
  timestamp: Date;
}

export default function ChefAiPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setLoading(true);

    const result = await promptGpt(input);
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

  const handleAskRecipe = async (recipeName: string) => {
    if (!recipeName.trim()) return;

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

  const handleTypingComplete = (messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, isTyping: false } : msg
      )
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="grow p-4 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-6 ${
                message.role === "assistant" ? "mr-8" : "ml-8"
              }`}
            >
              <div
                className={`flex ${
                  message.role === "assistant" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`rounded-lg p-4 max-w-xl ${
                    message.role === "assistant"
                      ? "bg-white border border-gray-200"
                      : "bg-orange-500 text-white"
                  }`}
                >
                  {message.role === "assistant" ? (
                    message.isTyping ? (
                      <TypingMarkdownMessage
                        content={message.content as string}
                        messageId={message.id}
                        onComplete={() => handleTypingComplete(message.id)}
                      />
                    ) : message.answerType === "recipe_food" ? (
                      <div
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(
                            marked.parse(message.content as string) as string
                          ),
                        }}
                      />
                    ) : (
                      <div className="flex flex-col gap-2">
                        {(message.content as GptRecipeSuggestions[]).map(
                          (e, idx) => (
                            <SuggestRecipeItem
                              key={idx + 1}
                              recipe={e}
                              askRecipe={handleAskRecipe}
                            />
                          )
                        )}
                      </div>
                    )
                  ) : (
                    <p className="text-sm whitespace-pre-wrap">
                      {message.content as string}
                    </p>
                  )}
                </div>
              </div>
              <div
                className={`text-xs text-gray-500 mt-1 ${
                  message.role === "assistant" ? "text-left" : "text-right"
                }`}
              >
                {format(message.timestamp, "h:mm a")}
              </div>
            </div>
          ))}

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
      </div>

      {/* Input Section */}
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
    </div>
  );
}
