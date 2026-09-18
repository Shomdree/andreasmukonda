import node from "@astrojs/node";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const site = process.env.PUBLIC_SITE_URL || "http://localhost:4321";

function hostPattern(hostname, protocol) {
  return protocol ? { hostname, protocol } : { hostname };
}

const publicHost = (() => {
  try {
    return new URL(site).hostname;
  } catch {
    return "localhost";
  }
})();

export default defineConfig({
  site,
  output: "server",
  adapter: node({ mode: "standalone" }),
  security: {
    checkOrigin: true,
    allowedDomains: [
      hostPattern(publicHost),
      hostPattern("andreasmukonda.com", "https"),
      hostPattern("www.andreasmukonda.com", "https"),
      hostPattern("andreasmukonda.onrender.com", "https"),
      hostPattern("localhost"),
      hostPattern("127.0.0.1"),
    ],
  },
  compressHTML: true,
  build: {
    inlineStylesheets: "auto",
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
    },
  },
});
