import { prisma } from "@/libs/postgres";
import { tryCatch } from "@/utils/try-catch";
import { cookies } from "next/headers";

export async function isAuthenticateAction() {
  const { data, error } = await tryCatch(cookies());

  if (error) {
    console.log(`validateAuthAction [ERROR]: ${error}`);
  }

  const sessionId = data.get("session_id");
  if (!sessionId || sessionId.value === "") return { isAuthenticate: false };

  const session = await prisma.session.findUnique({
    where: {
      session: sessionId.value,
      deletedAt: null,
    },
  });

  if (!session) {
    data.delete("session_id");
    return { isAuthenticate: false };
  }

  const now = new Date();
  if (session.expiresAt < now) return { isAuthenticate: false };

  return { isAuthenticate: true, sessionId: sessionId.value };
}
