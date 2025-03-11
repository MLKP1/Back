import { defineConfig } from 'tsup'

// biome-ignore lint/style/noDefaultExport: tsup requires default
export default defineConfig({
  entry: ['src/server.ts'],
  format: ['cjs'],
  outExtension: () => ({ js: '.js' }),
  // dts: true,
  clean: true,
  minify: true,
})
