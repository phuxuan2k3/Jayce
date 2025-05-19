import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());

	console.log('Loaded environment variables:', env);

	return {
		build: {
			rollupOptions: {
				external: (id) => {
					// Ignore all files in src/dev
					return id.startsWith('src/dev/');
				}
			}
		},
		define: {
			'process.env': env,
		},
		server: {
			host: "0.0.0.0",
		},
		plugins: [react()]
	};
});