import { authenticationStatus } from "@/shared/actions/authentication-status";
import { GptForm } from "./_components/gpt-form";
import { getUserBySessionAction } from "@/shared/actions/get-user";
import { redirect } from "next/navigation";

export default async function Page() {
  const authStatus = await authenticationStatus();
  if (!authStatus.isAuthenticate) {
    redirect("/");
  }

  const user = await getUserBySessionAction(authStatus?.sessionId);

  if (!user) {
    redirect("/");
  }

  return <GptForm currenetUser={user} />;
}
