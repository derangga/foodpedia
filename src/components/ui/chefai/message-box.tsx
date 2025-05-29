import { Message } from "@/models/message";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import TypingMarkdownMessage from "./typing-markdown-message";
import { GptRecipeSuggestions } from "@/models/gpt";
import { SuggestRecipeItem } from "./suggest-recipe-item";
import { format } from "date-fns";

interface MessageBoxProps {
  messages: Message[];
  handleTypingComplete?: (messageId: string) => void;
}

const MessageBox: React.FC<MessageBoxProps> = ({
  messages,
  handleTypingComplete,
}) => {
  return (
    <>
      {messages.map((message, idx) => (
        <div
          key={idx + 1}
          className={`mb-6 ${message.role === "assistant" ? "mr-8" : "ml-8"}`}
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
                    onComplete={() => handleTypingComplete?.(message.id)}
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
                        <SuggestRecipeItem key={idx + 1} recipe={e} />
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
    </>
  );
};

export default MessageBox;
