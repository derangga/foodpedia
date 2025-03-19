import { prisma } from "@/libs/postgres";
import { tryCatch } from "@/utils/try-catch";
import { cookies } from "next/headers";

export async function getUserBySessionAction(sessionId: string | undefined) {
  if (!sessionId) return null;

  const session = await prisma.session.findUnique({
    where: { session: sessionId },
  });

  if (!session) return null;

  const user = await prisma.user.findUnique({
    omit: {
      password: true,
    },
    where: {
      id: session.userId,
      deletedAt: null,
    },
  });

  return user;
}

export async function getUserAction() {
  const nextCookie = await tryCatch(cookies());
  if (nextCookie.error) {
    console.log(`get-user [ERROR]: ${nextCookie.error}`);
    return null;
  }

  const sessionId = nextCookie.data?.get("session_id")?.value;
  const session = await prisma.session.findUnique({
    where: { session: sessionId },
  });

  if (!session) return null;

  const user = await prisma.user.findUnique({
    omit: {
      password: true,
    },
    where: { id: session.userId },
  });

  return user;
}

export async function getUserByEmailAction(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
}
