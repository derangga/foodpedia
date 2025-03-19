"use server";
import { prisma } from "@/libs/postgres";
import { tryCatch } from "@/utils/try-catch";
import { cookies } from "next/headers";

export async function authenticationStatus() {
  const nextCookie = await tryCatch(cookies());

  if (nextCookie.error) {
    console.log(`validateAuthAction [ERROR]: ${nextCookie.error}`);
  }
  const cookie = nextCookie.data;

  const sessionId = cookie?.get("session_id");
  if (!sessionId || sessionId.value === "") return { isAuthenticate: false };

  const session = await prisma.session.findUnique({
    where: {
      session: sessionId.value,
      deletedAt: null,
    },
  });

  if (!session) {
    return { isAuthenticate: false, sessionId: sessionId.value };
  }

  const now = new Date();
  if (session.expiresAt < now) return { isAuthenticate: false };

  return { isAuthenticate: true, sessionId: sessionId.value };
}
