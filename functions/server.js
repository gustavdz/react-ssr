/* eslint-disable @typescript-eslint/no-var-requires */
import functions from "firebase-functions";
import * as fs from "node:fs/promises";
import express from "express";

// Constants
const app = express();
const base = "/";

// Create http server

// Add Vite or respective production middlewares
let vite;
const compression = (await import("compression")).default;
const sirv = (await import("sirv")).default;
app.use(compression());
app.use(base, sirv("./dist/client", { extensions: [] }));
// Serve HTML
app.use("**", async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, "");
    // Cached production assets
    const templateHtml = await fs.readFile("./dist/client/index.html", "utf-8");
    const ssrManifest = await fs.readFile("./dist/client/ssr-manifest.json", "utf-8");
    let template;
    let render;

    template = templateHtml;
    render = (await import("./dist/server/entry-server.js")).render;

    const rendered = await render(url, ssrManifest);

    const html = template
      .replace("<!--app-head-->", rendered.head ?? "")
      .replace("<!--app-html-->", rendered.html ?? "");

    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (e) {
    console.log("*****ERROR*****");
    vite?.ssrFixStacktrace(e);
    // eslint-disable-next-line no-console
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});
export const webApi = functions.https.onRequest(app);
