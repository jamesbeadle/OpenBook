/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    screens: {
      xs: "480px",
      // => @media (min-width: 640px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }

      "3xl": "1920px",
      // => @media (min-width: 1920px) { ... }
    },
    fontSize: {
      xxs: ".625rem",
      xs: "0.7rem",
      sm: "0.8rem",
      base: "1rem",
      lg: "1.1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    extend: {
      colors: {
        BrandBlack: "#101111", //From Figma Screen Background
        BrandGray: "#1A1A1D", //From Figma Panel Background
        BrandLightGray: "#E8E8E8", //From Figma Text
        BrandAltGray: "#2E323A", //From Figma Panel Border
        BrandGreen: "#66E094", //From Figma Logo
        BrandRed: "#FF403C", //From Figma negative text
        BrandDisabledGray: "#8C8C8C", //Disable Icon
      },
    },
  },
  plugins: [],
};
