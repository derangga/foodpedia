import { authenticationStatus } from "@/shared/actions/authentication-status";
import { GptForm } from "./_components/gpt-form";
import { getUserById } from "@/shared/actions/get-user";
import { redirect } from "next/navigation";
import { User } from "@/model/user";

export default async function Page() {
  const authStatus = await authenticationStatus();
  if (!authStatus.isAuthenticate) {
    redirect("/auth");
  }

  const user = await getUserById(authStatus.userId);

  if (!user) {
    redirect("/auth");
  }

  return <GptForm authStatus={authStatus} currentUser={user as User} />;
}
