import * as arctic from "arctic";

export const googleClient = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID || "";
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET || "";
  const redirectURI = process.env.GOOGLE_REDIRECT_URI || "";
  return new arctic.Google(clientId, clientSecret, redirectURI);
};
