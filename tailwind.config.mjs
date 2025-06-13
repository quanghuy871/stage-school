/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: ["keen-slider", "md:keen-slider"],
  theme: {
    container: {
      padding: {
        DEFAULT: "20px",
        sm: "20px",
        lg: "60px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Messina Sans", "sans-serif"],
      },
      fontSize: {
        "display-d1": ["100px", "100px"],
        "heading-h1": ["48px", "52px"],
        "heading-h2": ["44px", "50px"],
        "heading-h3": ["36px", "44px"],
        "heading-h4": ["32px", "36px"],
        "subheading-s1": ["28px", "30px"],
        "subheading-s2": ["24px", "30px"],
        "subheading-s3": ["20px", "26px"],
        "paragraph-p1": ["16px", "22px"],
        "paragraph-p2": ["14px", "20px"],
        "paragraph-p3": ["22px", "30px"],
        "caption-c1": ["12px", "17px"],
        "caption-c2": ["10px", "17px"],
      },
      screens: {
        md: "900px",
        lg: "1441px",
        "max-md": { max: "899px" },
        "h-max-md": { raw: "(max-height: 768px)" },
      },
      colors: {
        primary: "#000000",
        secondary: "#FFFFFF",
        neutrals5: "#F2F2F2",
        grey: "#3F4245",
        charcoal: "#282A2C",
        footer: "#4D4F4D",
        primaryOrange: "#FF970F",
        purple: "#E256D3",
        neutrals30: "#B3B3B3",
        neutrals60: "#666",
        orange: "#FF8000",
        cyan: "#32B9F5",
        vermillion: "#FF3F2B",
        lime: "#A0D828",
      },
      padding: {
        15: "60px",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("children", "&>*");
    }),
  ],
};
