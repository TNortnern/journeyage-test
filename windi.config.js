
/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "app-blue": "#03256C",
        "app-gray": "#F4F6F8",
      },
    },
  },
  plugins: [],
};
