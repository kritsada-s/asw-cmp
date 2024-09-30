import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'ci-blue': '#123F6D',
        'ci-lightblue': '#1B93FA',
        navy: '#000080',
      },
    },
  },
  plugins: [nextui({
    layout: {
      fontSize: {
        small: '1.2rem'
      },
      radius: {
        small: "5px", // rounded-small
        medium: "8px", // rounded-medium
        large: "10px", // rounded-large
      },
    }
  })],
};
export default config;
