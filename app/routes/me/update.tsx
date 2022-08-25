import { Container, Paper, TextInput, Title } from "@mantine/core";
import { Form, useOutletContext } from "@remix-run/react";
import { AuthenticityTokenInput, verifyAuthenticityToken } from "remix-utils";
import type { LocalUser, User } from "@prisma/client";

import type { ActionArgs } from "@remix-run/node";
import { getUserSession } from "~/services/cookie.server";
export async function action({ request }: ActionArgs) {
  const session = await getUserSession(request);
  await verifyAuthenticityToken(request, session, "csrfToken");

  const formData = await request.formData();
  // return redirect(``);
}

export default function UpdateProfilePage() {
  const user = useOutletContext<User & { localUser: LocalUser }>();

  return (
    <Container>
      <Title order={2} align="center">
        Update Profile
      </Title>
      <Paper component={Form}>
        <AuthenticityTokenInput />
        <TextInput name="username" defaultValue={user.localUser.username} />
      </Paper>
    </Container>
  );
}
