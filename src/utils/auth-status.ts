"use server";
import { AuthStatus } from "@/model/auth-status";
import { tryCatch } from "@/utils/try-catch";
import { cookies } from "next/headers";

export async function authStatus(): Promise<AuthStatus> {
  const nextCookie = await tryCatch(cookies());

  if (nextCookie.error) {
    console.error(`validateAuthAction [ERROR]: ${nextCookie.error}`);
  }
  const cookie = nextCookie.data;

  const userId = Number(cookie?.get("user_id")?.value);

  return {
    isAuthenticate: userId > 0,
    userId: userId,
  };
}
