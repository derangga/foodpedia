import { z } from "zod";
import { GptRecipeSuggestions } from "./gpt";

export interface Message {
  id: string;
  answerType?: string | null;
  language?: string;
  content: string | GptRecipeSuggestions[];
  role: "user" | "assistant";
  isTyping?: boolean;
  isFailed?: boolean;
  timestamp: Date;
}

export const GptSessionSchema = z.object({
  id: z.string().optional(), // filed by db
  userId: z.string().optional(), // filed by db
  title: z.string().min(1),
  createdAt: z.date(),
  deletedAt: z.date().optional(),
});

export type GptSession = z.infer<typeof GptSessionSchema>;

export const GptMessageSchema = z.object({
  sessionId: z.string().min(1),
  senderRole: z.enum(["user", "gpt"]),
  answerType: z.string().optional(),
  message: z.string().min(1),
  createdAt: z.date(),
  deletedAt: z.date().optional(),
});

export type GptMessage = z.infer<typeof GptMessageSchema>;
