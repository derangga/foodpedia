"use server";
import { prisma } from "@/libs/postgres";
import { tryCatch } from "@/utils/try-catch";
import { cookies } from "next/headers";

export async function getUserById(userId: number) {
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      createdAt: true,
    },
  });

  return user;
}

export async function getUserAction() {
  const nextCookie = await tryCatch(cookies());
  if (nextCookie.error) {
    console.error(`get-user [ERROR]: ${nextCookie.error}`);
    return null;
  }

  const userId = nextCookie.data?.get("user_id")?.value || "";
  const user = await prisma.user.findUnique({
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      createdAt: true,
    },
    where: { id: Number(userId) },
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
