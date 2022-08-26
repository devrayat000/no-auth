import { Form, useLoaderData } from "@remix-run/react";
import {
  AuthenticityTokenInput,
  AuthenticityTokenProvider,
  createAuthenticityToken,
} from "remix-utils";
import type { LoaderArgs } from "@remix-run/node";
import { Container } from "@mantine/core";

import { getUserSession, requireUserId } from "~/services/cookie.server";
import { getFullUser } from "~/services/user.server";
import EditableField from "~/components/EditableField";

export async function loader({ request }: LoaderArgs) {
  const session = await getUserSession(request);
  const id = await requireUserId(request);
  const account = await getFullUser(id);

  return {
    account,
    csrf: createAuthenticityToken(session, "csrfToken"),
  };
}

export default function ProfileRoot() {
  const { account, csrf } = useLoaderData<typeof loader>();

  return (
    <Container>
      <AuthenticityTokenProvider token={csrf}>
        <Form>
          <AuthenticityTokenInput />
          <EditableField label="Name" defaultValue={account.user?.username} />
        </Form>
      </AuthenticityTokenProvider>
    </Container>
  );
}
