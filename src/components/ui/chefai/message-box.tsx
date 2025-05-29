import { Message } from "@/models/message";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import TypingMarkdownMessage from "./typing-markdown-message";
import { GptRecipeSuggestions } from "@/models/gpt";
import { SuggestRecipeItem } from "./suggest-recipe-item";
import { format } from "date-fns";
import { CircleAlert, RotateCw } from "lucide-react";

interface MessageBoxProps {
  messages: Message[];
  handleTypingComplete?: (messageId: string) => void;
}

interface MessageBoxItemProps {
  message: Message;
}

const UserMessageBox: React.FC<MessageBoxItemProps> = ({ message }) => {
  return (
    <div className="mb-6 ml-8">
      <div className="flex flex-row justify-end items-end gap-2">
        <CircleAlert size={16} className="hidden text-red-500" />
        <div className="rounded-lg p-4 max-w-xl bg-orange-500 text-white">
          <p className="text-sm whitespace-pre-wrap">
            {message.content as string}
          </p>
        </div>
      </div>
      <div className="flex flex-row h-6 items-center gap-3 justify-end mt-1">
        <button className="hidden rounded-md hover:bg-gray-100 p-1">
          <RotateCw size={14} className="text-gray-400" />
        </button>
        <div className="text-xs text-gray-500">
          {format(message.timestamp, "h:mm a")}
        </div>
      </div>
    </div>
  );
};

interface GptMessageBoxItemProps extends MessageBoxItemProps {
  handleTypingComplete?: (messageId: string) => void;
}
const GptMessageBox: React.FC<GptMessageBoxItemProps> = ({
  message,
  handleTypingComplete,
}) => {
  return (
    <div className="mb-6 mr-8">
      <div className="flex justify-start">
        <div className="rounded-lg p-4 max-w-xl border border-gray-200">
          {message.isTyping ? (
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
              {(message.content as GptRecipeSuggestions[]).map((e, idx) => (
                <SuggestRecipeItem key={idx + 1} recipe={e} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="text-xs text-gray-500 mt-1 text-left">
        {format(message.timestamp, "h:mm a")}
      </div>
    </div>
  );
};

const MessageBox: React.FC<MessageBoxProps> = ({
  messages,
  handleTypingComplete,
}) => {
  return (
    <>
      {messages.map((message, idx) =>
        message.role === "assistant" ? (
          <GptMessageBox
            key={idx + 1}
            message={message}
            handleTypingComplete={handleTypingComplete}
          />
        ) : (
          <UserMessageBox key={idx + 1} message={message} />
        )
      )}
    </>
  );
};

export default MessageBox;
