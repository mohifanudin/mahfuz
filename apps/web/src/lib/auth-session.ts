import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "./auth";

export const getSession = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      const headers = getRequestHeaders();
      const session = await auth.api.getSession({ headers });
      if (!session) return null;
      const { id, name, email, image } = session.user;
      return { user: { id, name, email, image: image ?? null } };
    } catch {
      return null;
    }
  }
);

/** Only reveal which login methods are configured; never return OAuth secrets. */
export const getAuthProviders = createServerFn({ method: "GET" }).handler(async () => ({
  google: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
}));
