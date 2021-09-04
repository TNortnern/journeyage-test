const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"],
      },
      backgroundColor: {
        "primary-light": "#004EEF",
        primary: "#03256C",
        secondary: "#FFBC4F",
        "secondary-dark": "#FCA311",
        gray: "#f2f2f2",
      },
      padding: {
        "app-container": "3.5rem"
      },
      textColor: {
        primary: "#212B36",
        secondary: "#707881",
        active: "#03256C",
        cta: "#FCA311",
        warning: "#412801",
        white: "#ffffff",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1900px",
        "4xl": "2560px",
      },
      colors: {
        "app-blue": "#03256C",
        "app-gray": "#F4F6F8",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
