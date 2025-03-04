import { authenticationStatus } from "@/shared/actions/authentication-status";
import { redirect } from "next/navigation";

export default async function RecipeLayout({ children }) {
  const authStatus = await authenticationStatus();
  if (!authStatus.isAuthenticate) {
    redirect("/");
  }

  return <div>{children}</div>;
}
