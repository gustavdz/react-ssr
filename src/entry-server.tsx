import React from "react";
import ReactDOMServer from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
interface IRenderProps {
  path: string;
}
export function render({ path }: IRenderProps) {
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <HelmetProvider>
        <StaticRouter location={path}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </React.StrictMode>,
  );
  return { html };
}
