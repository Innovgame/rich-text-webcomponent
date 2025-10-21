import { defineConfig } from "vite";
import path from "path";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [react(), tailwindcss(), dts({ rollupTypes: true, outDir: "./dist" })],
    build: {
        lib: {
            entry: "./lib/entry.ts",
            name: "RichTextWebComponent",
            fileName: "rich-text-webcomponent",
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
