import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, path.resolve(__dirname, "..")) };

	return {
		plugins: [react()],
		server: {
			port: 5180,
		},
		test: {
			globals: true,
			environment: "jsdom",
			setupFiles: ["./src/setupTests.ts"],
			css: false,
			include: ["src/components/__tests__/*.test.{ts,tsx}"],
			exclude: ["node_modules", "dist"],
		},
	};
});
