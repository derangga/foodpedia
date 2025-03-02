import { Homepage } from "./_components/homepage";
import { isAuthenticateAction } from "@/shared/actions/is-authenticate";
import { getUserBySessionAction } from "@/shared/actions/get-user";

export default async function Home() {
  const { isAuthenticate, sessionId } = await isAuthenticateAction();

  let props = { authenticated: isAuthenticate };
  if (isAuthenticate) {
    const user = await getUserBySessionAction(sessionId);
    props = {
      ...props,
      currentUser: user,
    };
  }
  return <Homepage {...props} />;
}
