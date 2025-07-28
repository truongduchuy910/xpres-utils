import { defineConfig } from "tsup";

export default defineConfig({
  entryPoints: ["src"],
  format: ["cjs"],
  dts: true,
  loader: {
    '.html': 'text'
  }
});
