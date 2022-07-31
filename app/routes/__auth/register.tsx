import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Divider,
} from "@mantine/core";
import type { MetaFunction } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";

import SocialButton from "~/components/social-button";

export const meta: MetaFunction = () => {
  return {
    title: "NoAuth - Create New Account",
    description: "",
  };
};

export default function RegisterPage() {
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome to NoAuth!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{" "}
        <Anchor component={Link} to="/login" size="sm">
          Login
        </Anchor>
      </Text>

      <Paper component={Form} withBorder shadow="md" p="xl" mt="lg" radius="md">
        <SocialButton />

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="md"
        />

        <TextInput
          label="Full Name"
          type="text"
          placeholder="John Doe"
          required
          name="username"
        />
        <TextInput
          label="Email"
          type="email"
          placeholder="john@doe.com"
          required
          mt="sm"
          name="email"
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="sm"
          name="password"
        />
        <Checkbox mt="md" label="I accept terms and conditions" />
        <Button fullWidth mt="md" type="submit" name="provider" value="local">
          Create Account
        </Button>
      </Paper>
    </Container>
  );
}
