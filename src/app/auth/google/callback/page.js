import { redirect } from "next/navigation";
import {
  appAuthFlow,
  registerGoogleAction,
  validateGoogleAuth,
} from "./_actions/google-auth";
import { LoadingBar } from "./_components/loading-bar";

export default async function Page({ searchParams }) {
  const query = await searchParams;
  const account = await validateGoogleAuth(query);

  if (!account) {
    redirect("/auth");
  }

  const authFlow = await appAuthFlow(account);
  let token = authFlow.token || "";
  if (authFlow.authType === "register") {
    const result = await registerGoogleAction(account);
    token = result.token;

    if (!result.success) {
      redirect("/auth");
    }
  }

  return (
    <main className="flex flex-col w-screen h-screen justify-center items-center">
      <LoadingBar token={token} />
    </main>
  );
}
