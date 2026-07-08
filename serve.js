const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 4173;
const root = path.resolve(__dirname);

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml; charset=utf-8",
  ".webp": "image/webp",
};

http
  .createServer((request, response) => {
    const urlPath = request.url === "/" ? "/index.html" : request.url || "/index.html";
    const filePath = path.resolve(path.join(root, `.${decodeURIComponent(urlPath)}`));

    if (!filePath.startsWith(root)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    fs.readFile(filePath, (error, data) => {
      if (error) {
        response.writeHead(error.code === "ENOENT" ? 404 : 500, {
          "Content-Type": "text/plain; charset=utf-8",
        });
        response.end(error.code === "ENOENT" ? "Not found" : "Server error");
        return;
      }

      response.writeHead(200, {
        "Content-Type": types[path.extname(filePath).toLowerCase()] || "application/octet-stream",
      });
      response.end(data);
    });
  })
  .listen(port, () => {
    console.log(`Static server running on http://localhost:${port}`);
  });
