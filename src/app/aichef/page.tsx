import { authStatus } from "@/utils/auth-status";
import { GptForm } from "./_components/gpt-form";

export default async function Page() {
  const auth = await authStatus();

  return <GptForm authStatus={auth} />;
}
