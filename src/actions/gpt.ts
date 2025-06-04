"use server";
import drizzleDb from "@/db";
import { gptMessage, gptSession } from "@/db/schema";
import {
  promptAskRecipe,
  promptSuggestionRecipe,
} from "@/lib/ai/openai-client";
import { auth } from "@/lib/auth";
import { SessionNotFound } from "@/models/error";
import { GptRecipeSuggestions } from "@/models/gpt";
import { GptSession, Message } from "@/models/message";
import { and, desc, eq, isNull } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function promptGpt(sessionId: string, command: string) {
  try {
    const userMsgValue: typeof gptMessage.$inferInsert = {
      sessionId: sessionId,
      senderRole: "user",
      message: command,
      createdAt: new Date(),
    };

    const gptResponse = await promptSuggestionRecipe(command);
    if (!gptResponse) {
      return null;
    }

    const message =
      gptResponse.answer_type === "recipe_suggestions"
        ? JSON.stringify(gptResponse.answer)
        : (gptResponse.answer as string);

    const gptMsgValue: typeof gptMessage.$inferInsert = {
      sessionId: sessionId,
      senderRole: "assistant",
      answerType: gptResponse.answer_type,
      message: message,
      createdAt: new Date(),
    };

    await drizzleDb.insert(gptMessage).values([userMsgValue, gptMsgValue]);

    return gptResponse;
  } catch (error) {
    console.error(`failed create process message: ${error}`);
    return null;
  }
}

export async function askRecipePromptGpt(
  sessionId: string,
  language: string,
  command: string
) {
  try {
    const userMsgValue: typeof gptMessage.$inferInsert = {
      sessionId: sessionId,
      senderRole: "user",
      message: command,
      createdAt: new Date(),
    };

    const gptResponse = await promptAskRecipe(language, command);
    if (!gptResponse) {
      return null;
    }

    const message = gptResponse.answer as string;

    const gptMsgValue: typeof gptMessage.$inferInsert = {
      sessionId: sessionId,
      senderRole: "assistant",
      answerType: gptResponse.answer_type,
      message: message,
      createdAt: new Date(),
    };

    await drizzleDb
      .insert(gptMessage)
      .values([userMsgValue, gptMsgValue])
      .returning();

    return gptResponse;
  } catch (error) {
    console.error(`failed create process message: ${error}`);
    return null;
  }
}

export async function createGptSession(title: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/");
  }

  const validTitle = title.length > 60 ? title.slice(0, 60).trim() : title;
  const sessionValues: typeof gptSession.$inferInsert = {
    userId: session.user.id,
    title: validTitle,
    createdAt: new Date(),
  };

  try {
    const [result] = await drizzleDb
      .insert(gptSession)
      .values(sessionValues)
      .returning();
    return result;
  } catch (error) {
    console.error(`failed create session: ${error}`);
    return error as Error;
  }
}

export async function getGptSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/");
  }

  try {
    const results = await drizzleDb
      .select()
      .from(gptSession)
      .where(
        and(
          eq(gptSession.userId, session.user.id),
          isNull(gptSession.deletedAt)
        )
      )
      .orderBy(desc(gptSession.createdAt));

    const sessionMap: GptSession[] = results.map((e) => ({
      id: e.id,
      title: e.title,
      userId: e.userId,
      createdAt: e.createdAt,
    }));
    return sessionMap;
  } catch (error) {
    console.error(`failed create session: ${error}`);
    return [];
  }
}

export async function getHistoryChatGpt(sessionId: string) {
  try {
    const session = await drizzleDb
      .select({ id: gptSession.id })
      .from(gptSession)
      .where(and(eq(gptSession.id, sessionId), isNull(gptSession.deletedAt)));

    if (session.length === 0) {
      return new SessionNotFound("Session not found");
    }

    const result = await drizzleDb
      .select()
      .from(gptMessage)
      .where(eq(gptMessage.sessionId, sessionId));

    const messageMap: Message[] = result.map((e) => ({
      id: e.sessionId,
      answerType: e.answerType,
      role: e.senderRole,
      content:
        e.answerType === "recipe_suggestions"
          ? (JSON.parse(e.message) as GptRecipeSuggestions[])
          : e.message,
      timestamp: e.createdAt,
    }));

    return messageMap;
  } catch (error) {
    console.error(`failed get history message: ${error}`);
    return [];
  }
}
