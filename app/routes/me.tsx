import { Outlet, useLoaderData } from "@remix-run/react";
import {
  AuthenticityTokenProvider,
  createAuthenticityToken,
} from "remix-utils";
import type { LoaderArgs } from "@remix-run/node";

import { getUserSession, requireUserId } from "~/services/cookie.server";
import { getFullUser } from "~/services/user.server";

export async function loader({ request }: LoaderArgs) {
  console.log("session");
  const session = await getUserSession(request);
  const id = await requireUserId(request);
  const user = await getFullUser(id);

  return {
    user,
    csrf: createAuthenticityToken(session, "csrfToken"),
  };
}

export default function ProfileRoot() {
  const { user, csrf } = useLoaderData<typeof loader>();

  return (
    <AuthenticityTokenProvider token={csrf}>
      <Outlet context={user} />
    </AuthenticityTokenProvider>
  );
}
