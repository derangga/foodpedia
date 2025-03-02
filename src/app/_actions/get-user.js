import { prisma } from "@/libs/postgres";

export async function getUserAction(sessionId) {
  const session = await prisma.session.findUnique({
    where: { session: sessionId },
  });
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
  });

  return user;
}
