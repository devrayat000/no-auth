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
  Box,
} from "@mantine/core";
import type { MetaFunction, ActionArgs } from "@remix-run/node";
import { Form, Link, useActionData, useTransition } from "@remix-run/react";

import SocialButton from "~/components/social-button";
import { hashPassword } from "~/modules/bcrypt.server";
import { register } from "~/services/auth.server";
import { createUserSession } from "~/services/cookie.server";
import {
  type RegisterValidationError,
  validateRegister,
} from "~/services/validation.server";

export const meta: MetaFunction = () => {
  return {
    title: "NoAuth - Create New Account",
    description: "",
  };
};

type ActionData = RegisterValidationError & { authError?: string };

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const validated = validateRegister(formData);
  if (!validated.success) {
    return validated;
  }
  const { email, password, username } = validated.data;
  const { hash, salt } = await hashPassword(password);
  const user = await register({ email, hash, salt, username });

  return createUserSession(user.id, "/");
}

export default function RegisterPage() {
  const actionData = useActionData<ActionData>();
  const transition = useTransition();

  const loadTexts: any = {
    actionRedirect: "Redirecting...",
  };

  const loading =
    transition.state === "submitting" || transition.state === "loading";
  const text =
    transition.state === "submitting"
      ? "Creating Account..."
      : transition.state === "loading"
      ? loadTexts[transition.type] || "Loading..."
      : "Create Account";

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

      <Paper
        component={Form}
        method="post"
        withBorder
        shadow="md"
        p="xl"
        mt="lg"
        radius="md"
      >
        <SocialButton />

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="md"
        />

        <Box component="fieldset" disabled={loading}>
          <TextInput
            label="Full Name"
            type="text"
            placeholder="John Doe"
            required
            name="username"
            defaultValue={actionData?.values?.username}
            error={actionData?.fieldErrors?.username}
          />
          <TextInput
            label="Email"
            type="email"
            placeholder="john@doe.com"
            required
            mt="sm"
            name="email"
            defaultValue={actionData?.values?.username}
            error={actionData?.fieldErrors?.username}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="sm"
            name="password"
            defaultValue={actionData?.values?.password}
            error={actionData?.fieldErrors?.password}
          />
          <Checkbox
            mt="md"
            label="I accept terms and conditions"
            name="termsConditions"
            defaultValue={actionData?.values?.termsConditions}
          />
        </Box>
        {actionData?.authError && (
          <Text size="sm" component="p" color="red">
            {actionData.authError}
          </Text>
        )}
        <Button
          fullWidth
          mt="md"
          type="submit"
          name="provider"
          value="local"
          loading={loading}
        >
          {text}
        </Button>
      </Paper>
    </Container>
  );
}
