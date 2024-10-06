import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => {
  return {
    base: command === "build" ? "/CRUD-FORM-CSV/" : "/", // Add your repo name here for build
    plugins: [react()],
  };
});
