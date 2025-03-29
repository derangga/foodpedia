"use server";
import { AuthStatus } from "@/model/auth-status";
import { tryCatch } from "@/utils/try-catch";
import { cookies } from "next/headers";

export async function authenticationStatus(): Promise<AuthStatus> {
  const nextCookie = await tryCatch(cookies());

  if (nextCookie.error) {
    console.error(`validateAuthAction [ERROR]: ${nextCookie.error}`);
  }
  const cookie = nextCookie.data;

  const sessionId = cookie?.get("session_id");
  const userId = cookie?.get("user_id");
  if (!sessionId || sessionId.value === "") return { isAuthenticate: false };
  if (!userId || userId.value === "") return { isAuthenticate: false };

  return {
    isAuthenticate: true,
    sessionId: sessionId.value,
    userId: userId.value,
  };
}
