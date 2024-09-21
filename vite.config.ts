import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import path from 'path';
import { terser } from 'rollup-plugin-terser';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'ViteButton',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        plugins: [terser()],
      },
    },
    sourcemap: true,
    emptyOutDir: true,
    cssCodeSplit: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    react(),
    dts(),
    {
      name: 'dynamic-import',
      resolveId(source) {
        if (source === 'dynamic-import') {
          return source;
        }
        return null;
      },
      load(id) {
        if (id === 'dynamic-import') {
          return 'export default "This is a dynamically imported module"';
        }
        return null;
      },
    },
  ],
});
