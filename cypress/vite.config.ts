import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import istanbul from "vite-plugin-istanbul"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      jsxRuntime: "automatic",
      babel: {
        plugins: ["@emotion/babel-plugin"],
        compact: false,
      },
      exclude: [/\.stories\.([tj])sx?$/, /\.test\.([tj])sx?$/],
      include: ["**/**.tsx", "**/**.ts"],
    }),
    istanbul({
      cypress: true,
      requireEnv: false,
      exclude: ["node_modules", "cypress/", "dist"],
      extension: ["ts", "tsx"],
    }),
  ],
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
  server: {
    watch: {
      ignored: [
        "**/cypress-coverage/**",
        "**/jest-coverage/**",
        "**/coverage/**",
      ],
    },
  },
  optimizeDeps: {
    include: ["@emotion/react/jsx-dev-runtime"],
  },
  // cypress coverage need sourcemap
  build: {
    sourcemap: true,
  },
})
