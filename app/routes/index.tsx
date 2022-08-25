import { type LoaderArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getUser } from "~/services/auth.server";
import { requireUserId } from "~/services/cookie.server";

export async function loader({ request }: LoaderArgs) {
  const id = await requireUserId(request);
  const user = await getUser(id);

  if (!user) {
    const searchParams = new URLSearchParams([["_next", "/"]]);
    throw redirect(`/login?${searchParams}`);
  }

  return user;
}

export default function Index() {
  const user = useLoaderData();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
