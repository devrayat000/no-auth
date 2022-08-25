import { redirect } from "@remix-run/node";

import { db } from "~/modules/db.server";
import { getUserSession, storage, unauthorized } from "./cookie.server";

type LoginForm = {
  email: string;
};

type RegistrationForm = {
  email: string;
  username: string;
  hash: string;
  salt: string;
};

export async function register({
  email,
  username,
  hash,
  salt,
}: RegistrationForm) {
  const user = await db.localUser.create({
    data: {
      email,
      username,
      hash,
      salt,
      user: { create: {} },
    },
    select: { id: true },
  });
  return { id: user.id, email };
}

export async function login({ email }: LoginForm) {
  const user = await db.localUser.findUnique({
    where: { email },
    select: { id: true, hash: true },
  });
  if (!user) return { authError: "User not found!" } as const;

  return user;
}

export async function getUser(userId: string) {
  try {
    const user = await db.localUser.findUnique({
      where: { id: userId },
      select: { id: true, email: true },
    });
    return user;
  } catch (error) {
    console.log(error);
    throw unauthorized();
  }
}

export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}
