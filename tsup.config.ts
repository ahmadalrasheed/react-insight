import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'], // or index.tsx if needed
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  target: 'es2017',
});
