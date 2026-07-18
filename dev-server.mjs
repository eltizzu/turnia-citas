import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, resolve } from "node:path";

const root = process.cwd();
const port = Number(process.env.PORT || 5180);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
};

createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  // Mismas reglas que vercel.json, para que probar local sirva de verdad.
  const rewrites = { "/": "/index.html", "/demo": "/demo.html", "/panel": "/demo.html" };
  const pathname = rewrites[url.pathname] || url.pathname;
  const filePath = resolve(join(root, decodeURIComponent(pathname)));

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const body = await readFile(filePath);
    response.writeHead(200, {
      "Content-Type": types[extname(filePath)] || "application/octet-stream",
    });
    response.end(body);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Turnia demo: http://127.0.0.1:${port}`);
});
