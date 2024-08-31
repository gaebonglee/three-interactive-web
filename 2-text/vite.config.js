import { build } from "vite";

// @type {import('vite').UserConfig}
export default {
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
};
