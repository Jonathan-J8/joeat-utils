import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import glsl from 'vite-plugin-glsl';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	server: {
		port: 8080,
	},
	build: {
		lib: {
			minify: true,
			types: 'src/index.ts',
			formats: ['es', 'cjs'],
			entry: resolve(__dirname, 'src/index.ts'),
			fileName: (format) => `index.${format}.js`,
			// ssr: true,
			name: process.env.npm_package_name,
		},
		rollupOptions: {
			external: [],
		},
	},
	plugins: [
		glsl({ minify: true, exclude: [/node_modules/, /dist/, /test/] }),
		dts({
			// optional tweaks:
			insertTypesEntry: true,
			copyDtsFiles: true,
		}),
	],

	test: {
		environment: 'jsdom',
	},
});
