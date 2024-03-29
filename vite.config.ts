import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import checker from 'vite-plugin-checker'; 

export default defineConfig({
  plugins: [checker({ typescript: false }), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
