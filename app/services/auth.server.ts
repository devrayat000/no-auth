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
  const account = await db.$transaction(async (prisma) => {
    const account = await db.account.create({
      data: {
        providerAccountId: "",
        user: {
          create: {
            email,
            username,
            hash,
            salt,
          },
        },
      },
      select: { id: true, user: { select: { id: true } } },
    });
    await prisma.account.update({
      where: { id: account.id },
      data: { providerAccountId: account.user?.id },
    });
    return account;
  });

  return { id: account.id, email };
}

export async function login({ email }: LoginForm) {
  const account = await db.account.findFirst({
    where: {
      user: {
        email,
      },
    },
    select: {
      id: true,
      user: {
        select: {
          email: true,
          hash: true,
        },
      },
    },
  });
  if (!account) return { authError: "User not found!" };

  return account;
}

export async function getUser(userId: string) {
  try {
    const user = await db.account.findUniqueOrThrow({
      where: { id: userId },
      select: {
        id: true,
        user: {
          select: { id: true },
        },
      },
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
