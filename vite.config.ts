import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react(), dts({ rollupTypes: true, outDir: "./dist" })],
    build: {
        lib: {
            entry: "./lib/entry.ts",
            name: "RichTextWebComponent",
            fileName: "rich-text-webcomponent",
        },
    },
});
