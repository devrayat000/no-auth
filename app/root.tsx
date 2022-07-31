import { Global, MantineProvider } from "@mantine/core";
import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          withCSSVariables
          theme={{ colorScheme: "light", primaryColor: "cyan" }}
        >
          <Global
            styles={{
              fieldset: {
                border: "none",
                margin: 0,
                padding: 0,
              },
            }}
          />
          <Outlet />
        </MantineProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
