import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());

	console.log('Loaded environment variables:', env);

	return {
		define: {
			'process.env': env,
		},
		plugins: [react()]
	};
});