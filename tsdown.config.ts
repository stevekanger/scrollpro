import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/index.ts'],
  outDir: 'dist',
  // minify: true,
  dts: true,
  platform: 'browser',
  exports: true,
  format: 'esm',
})
