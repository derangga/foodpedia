import { prisma } from "@/libs/postgres";

export async function getUserBySessionAction(sessionId) {
  const session = await prisma.session.findUnique({
    where: { session: sessionId },
  });
  const user = await prisma.user.findUnique({
    where: {
      id: session.userId,
      deletedAt: null,
    },
  });

  return user;
}

export async function getUserByEmailAction(email) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
}
