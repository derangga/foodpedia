import { Homepage } from "./_components/homepage";
import { isAuthenticateAction } from "./_actions/is-authenticate";
import { getUserAction } from "./_actions/get-user";

export default async function Home() {
  const { isAuthenticate, sessionId } = await isAuthenticateAction();
  let props = { authenticated: isAuthenticate };
  if (isAuthenticate) {
    const user = await getUserAction(sessionId);
    props = {
      ...props,
      currentUser: user,
    };
  }
  return <Homepage {...props} />;
}
