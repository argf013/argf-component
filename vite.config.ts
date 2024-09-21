import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import terser from "@rollup/plugin-terser";
import path from "path";
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "index.ts"),
      name: "ViteButton",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
      plugins: [
        terser(), // Untuk mengoptimalkan ukuran bundle
        visualizer({ filename: './dist/stats.html' }), // Untuk analisis ukuran bundle
      ],
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [react(), dts()],
});
