import { Container, Text } from "@mantine/core";
import { useOutletContext } from "@remix-run/react";
import type { LocalUser, User } from "@prisma/client";

export default function ProfilePage() {
  const user = useOutletContext<User & { localUser: LocalUser }>();

  return (
    <Container>
      <Text component="p">
        <>Name: {user.localUser.username}</>
      </Text>
    </Container>
  );
}
