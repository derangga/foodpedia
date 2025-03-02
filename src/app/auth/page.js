import { AuthForm } from "./_components/auth-form";
import { redirect } from "next/navigation";
import { isAuthenticateAction } from "../_actions/is-authenticate";

export default async function Page() {
  const { isAuthenticate } = await isAuthenticateAction();
  if (isAuthenticate) {
    redirect("/");
  }

  return <AuthForm />;
}
