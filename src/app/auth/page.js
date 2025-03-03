import { AuthForm } from "./_components/auth-form";
import { redirect } from "next/navigation";
import { authenticationStatus } from "@/shared/actions/authentication-status";

export default async function Page() {
  const { isAuthenticate } = await authenticationStatus();
  if (isAuthenticate) {
    redirect("/");
  }

  return <AuthForm />;
}
