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

            let body = "";
            req.on("data", (chunk) => { body += chunk; });
            req.on("end", () => {
              res.setHeader("Content-Type", "application/json");

              try {
                if (action === "login") {
                  return res.end(JSON.stringify({ success: true, token: "local_session_token", message: "Logged in" }));
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
