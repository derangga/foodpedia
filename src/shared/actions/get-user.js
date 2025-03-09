import { prisma } from "@/libs/postgres";
import { tryCatch } from "@/utils/try-catch";
import { cookies } from "next/headers";

export async function getUserBySessionAction(sessionId) {
  const session = await prisma.session.findUnique({
    where: { session: sessionId },
  });
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

  const sessionId = nextCookie.data.get("session_id").value;
  const session = await prisma.session.findUnique({
    where: { session: sessionId },
  });
  const user = await prisma.user.findUnique({
    omit: {
      password: true,
    },
    where: { id: session.userId },
  });

  return user;
}

export async function getUserByEmailAction(email) {
  const user = await prisma.user.findUnique({
    omit: {
      password: true,
    },
    where: {
      email: email,
    },
  });

  return user;
}
