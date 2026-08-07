import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  assetsInclude: ["**/*.PNG"],
  plugins: [
    {
      name: "admin-api-dev",
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url === "/admin" || req.url === "/admin/") {
            req.url = "/admin/index.html";
            return next();
          }

          if (req.url && req.url.startsWith("/admin/api.php")) {
            const urlObj = new URL(req.url, "http://localhost:8080");
            const action = urlObj.searchParams.get("action");

            const fs = await import("fs");
            const pathModule = await import("path");

            let chunks: Buffer[] = [];
            req.on("data", (chunk) => { chunks.push(chunk); });
            req.on("end", () => {
              const bodyBuffer = Buffer.concat(chunks);
              const body = bodyBuffer.toString("utf-8");
              res.setHeader("Content-Type", "application/json");

              try {
                if (action === "login") {
                  return res.end(JSON.stringify({ success: true, token: "local_session_token", message: "Logged in" }));
                }

                if (action === "upload_image") {
                  const contentType = (req.headers["content-type"] || "") as string;
                  const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
                  const boundary = boundaryMatch ? (boundaryMatch[1] || boundaryMatch[2]).trim() : null;

                  const uploadsDir = pathModule.resolve(__dirname, "public/uploads");
                  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

                  if (boundary) {
                    const boundaryBuf = Buffer.from(`--${boundary}`);
                    let savedUrl = "";
                    let start = 0;
                    let pos = bodyBuffer.indexOf(boundaryBuf, start);

                    while (pos !== -1) {
                      const nextPos = bodyBuffer.indexOf(boundaryBuf, pos + boundaryBuf.length);
                      if (nextPos === -1) break;

                      const part = bodyBuffer.subarray(pos + boundaryBuf.length, nextPos);
                      const headerEnd = part.indexOf("\r\n\r\n");

                      if (headerEnd !== -1) {
                        const headerStr = part.subarray(0, headerEnd).toString("utf-8");
                        const filenameMatch = headerStr.match(/filename="([^"]+)"/i);

                        if (filenameMatch && filenameMatch[1]) {
                          const originalName = filenameMatch[1];
                          const ext = pathModule.extname(originalName) || ".png";
                          const safeName = pathModule.basename(originalName, ext).replace(/[^a-z0-9_-]/gi, "_");
                          const filename = `${safeName}_${Date.now()}${ext}`;

                          let fileData = part.subarray(headerEnd + 4);
                          if (fileData.length >= 2 && fileData[fileData.length - 2] === 13 && fileData[fileData.length - 1] === 10) {
                            fileData = fileData.subarray(0, fileData.length - 2);
                          }

                          fs.writeFileSync(pathModule.join(uploadsDir, filename), fileData);
                          savedUrl = `/uploads/${filename}`;
                          break;
                        }
                      }

                      pos = nextPos;
                    }

                    if (savedUrl) {
                      return res.end(JSON.stringify({ success: true, url: savedUrl, message: "Image uploaded successfully" }));
                    }
                  }

                  return res.end(JSON.stringify({ success: false, error: "Failed to process uploaded file" }));
                }

                if (action === "submit_contact") {
                  const data = JSON.parse(body || "{}");
                  const contentDir = pathModule.resolve(__dirname, "public/content");
                  if (!fs.existsSync(contentDir)) fs.mkdirSync(contentDir, { recursive: true });
                  const file = pathModule.join(contentDir, "submissions.json");
                  let subs = [];
                  if (fs.existsSync(file)) {
                    try { subs = JSON.parse(fs.readFileSync(file, "utf-8")); } catch (e) {}
                  }
                  const newEntry = {
                    id: Date.now().toString() + "_" + Math.floor(Math.random() * 9000 + 1000),
                    date: new Date().toISOString().replace("T", " ").substring(0, 19),
                    name: data.name || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    eventType: data.eventType || "",
                    message: data.message || "",
                  };
                  subs.unshift(newEntry);
                  fs.writeFileSync(file, JSON.stringify(subs, null, 2));
                  return res.end(JSON.stringify({ success: true, message: "Submission saved" }));
                }

                if (action === "save_content") {
                  const data = JSON.parse(body || "{}");
                  const fileKey = (data.file || "").replace(/[^a-z0-9_-]/gi, "");
                  if (!fileKey) return res.end(JSON.stringify({ success: false, error: "No file key" }));
                  const contentDir = pathModule.resolve(__dirname, "public/content");
                  if (!fs.existsSync(contentDir)) fs.mkdirSync(contentDir, { recursive: true });
                  const file = pathModule.join(contentDir, `${fileKey}.json`);
                  fs.writeFileSync(file, JSON.stringify(data.content, null, 2));
                  return res.end(JSON.stringify({ success: true, message: "Content saved" }));
                }

                if (action === "delete_submission") {
                  const data = JSON.parse(body || "{}");
                  const file = pathModule.resolve(__dirname, "public/content/submissions.json");
                  if (fs.existsSync(file)) {
                    try {
                      let subs = JSON.parse(fs.readFileSync(file, "utf-8"));
                      subs = subs.filter((item: any) => item.id !== data.id);
                      fs.writeFileSync(file, JSON.stringify(subs, null, 2));
                    } catch (e) {}
                  }
                  return res.end(JSON.stringify({ success: true, message: "Deleted" }));
                }
              } catch (err: any) {
                return res.end(JSON.stringify({ success: false, error: err.message }));
              }

              res.end(JSON.stringify({ success: true }));
            });
            return;
          }

          next();
        });
      },
    },
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
