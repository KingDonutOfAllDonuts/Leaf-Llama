import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  mode: 'jit',
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['var(--font-roboto)'],
        'kaushan': ['var(--font-kaushan)']
      },
    },
  },
  plugins: [],
};
export default config;
