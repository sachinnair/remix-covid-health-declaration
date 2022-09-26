import { withEmotionCache } from "@emotion/react";
import { ChakraProvider } from "@chakra-ui/react";

import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { ServerStyleContext, ClientStyleContext } from "./context";

import { getUser } from "./session.server";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import { useContext, useEffect } from "react";
import { ErrorPage } from "./components/ErrorPage";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }, { rel:"icon", href: 'https://www.tech.gov.sg/images/favicon-govtech.ico', type:'image/icon type' }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "GovTech - Health Declaration",
  viewport: "width=device-width,initial-scale=1",
});

export function ErrorBoundary({ error }) {
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <ErrorPage />
        <Scripts />
      </body>
    </html>
  );
}

export async function loader({ request }: LoaderArgs) {
  return json({
    user: await getUser(request),
  });
}

interface DocumentProps {
  children: React.ReactNode;
}

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    // Only executed on client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData?.reset();
    }, []);

    return (
      <html lang="en">
        <head>
          <Meta />
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(" ")}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body className="mb-20">
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
);

export default function App() {
  return (
    <Document>
      <ChakraProvider>
        <Outlet />
      </ChakraProvider>
    </Document>
  );
}
