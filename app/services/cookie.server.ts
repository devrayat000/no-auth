import { createCookieSessionStorage, redirect } from "@remix-run/node";

let sessionSecret: string | undefined;

if (process.env.NODE_ENV === "production") {
  sessionSecret = process.env.SESSION_SECRET;
  if (!sessionSecret) {
    throw new Error("SESSION_SECRET must be set");
  }
} else {
  sessionSecret = "-- DEV SESSION SECRET --";
}

export const storage = createCookieSessionStorage({
  cookie: {
    name: "noauth.session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export function getUserSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function createUserSession(
  userId: string,
  redirectTo: string,
  remember?: boolean
) {
  const session = await storage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session, {
        maxAge: remember ? 86400 : 0,
      }),
    },
  });
}

export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") return null;
  return userId;
}

export function unauthorized(redirectTo?: string) {
  if (redirectTo) {
    const searchParams = new URLSearchParams([["_next", redirectTo]]);
    return redirect(`/login?${searchParams}`, { status: 401 });
  }
  return redirect(`/login`, { status: 401 });
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    throw unauthorized(redirectTo);
  }
  return userId;
}
