import { authenticationStatus } from "@/shared/actions/authentication-status";
import { GptForm } from "./_components/gpt-form";
import { getUserBySessionAction } from "@/shared/actions/get-user";

export default async function Page() {
  const authStatus = await authenticationStatus();
  if (!authStatus.isAuthenticate) {
    redirect("/");
  }

  const user = await getUserBySessionAction(authStatus?.sessionId);

  return <GptForm currenetUser={user} />;
}
