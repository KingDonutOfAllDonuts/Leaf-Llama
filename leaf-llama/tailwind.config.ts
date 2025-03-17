import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        lora: ["var(--font-lora)"],
        kaushan: ["var(--font-kaushan)"],
        varela: ["var(--font-varela)"],
        poor: ["var(--font-poor)"],
      },
    },
  },
  plugins: [],
};
export default config;
