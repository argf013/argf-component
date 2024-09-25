import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import terser from '@rollup/plugin-terser';
import path from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'argf-react',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
      plugins: [terser(), visualizer({ filename: './stats/stats.html' })],
    },
    sourcemap: false,
    emptyOutDir: true,
    cssCodeSplit: false,
  },
  plugins: [react(), dts()],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
});
