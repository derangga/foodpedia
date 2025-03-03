import { Homepage } from "./_components/homepage";
import { authenticationStatus } from "@/shared/actions/authentication-status";
import { getUserBySessionAction } from "@/shared/actions/get-user";

export default async function Home() {
  const authStatus = await authenticationStatus();

  let props = { authStatus };
  if (authStatus.isAuthenticate) {
    const user = await getUserBySessionAction(authStatus.sessionId);
    props = {
      ...props,
      currentUser: user,
    };
  }
  return (
    <div>
      <Homepage {...props} />
    </div>
  );
}
