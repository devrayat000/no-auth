import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Divider,
  Box,
} from "@mantine/core";
import type { MetaFunction, ActionArgs } from "@remix-run/node";
import { Form, Link, useActionData, useTransition } from "@remix-run/react";

import SocialButton from "~/components/social-button";
import { validatePassword } from "~/modules/bcrypt.server";
import { login } from "~/services/auth.server";
import { createUserSession } from "~/services/cookie.server";
import {
  type LoginValidationError,
  validateLogin,
} from "~/services/validation.server";

export const meta: MetaFunction = () => {
  return {
    title: "NoAuth - Login",
    description: "",
  };
};

type ActionData = LoginValidationError & { authError?: string };

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const validated = validateLogin(formData);
  if (!validated.success) {
    return validated;
  }
  const { email, password, rememberMe } = validated.data;
  const account = await login({ email });
  if ("authError" in account) {
    return account;
  }

  const isPasswordCorrect = await validatePassword(
    password,
    account.user?.hash!
  );
  if (!isPasswordCorrect) {
    return { authError: "Password invalid!" };
  }

  return createUserSession(account.id, "/", rememberMe === "on");
}

export default function LoginPage() {
  const actionData = useActionData<ActionData>();
  const transition = useTransition();

  const loadTexts: any = {
    actionRedirect: "Redirecting...",
  };

  const loading =
    transition.state === "submitting" || transition.state === "loading";
  const text =
    transition.state === "submitting"
      ? "Logging In..."
      : transition.state === "loading"
      ? loadTexts[transition.type] || "Loading..."
      : "Log In";

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor component={Link} to="/register" size="sm">
          Create account
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
            label="Email"
            type="email"
            placeholder="john@doe.com"
            required
            name="email"
            defaultValue={actionData?.values?.email}
            error={actionData?.fieldErrors?.email}
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
          <Group position="apart" mt="md">
            <Checkbox
              label="Remember me"
              name="rememberMe"
              defaultValue={actionData?.values?.rememberMe}
            />
            <Anchor component={Link} to="/forgot-password" size="sm">
              Forgot password?
            </Anchor>
          </Group>
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
