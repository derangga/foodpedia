import { authenticationStatus } from "@/shared/actions/authentication-status";
import { GptForm } from "./_components/gpt-form";

export default async function Page() {
  const authStatus = await authenticationStatus();

  return <GptForm authStatus={authStatus} />;
}
