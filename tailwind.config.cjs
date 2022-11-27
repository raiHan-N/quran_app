/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Roboto Slab", ...defaultTheme.fontFamily.serif],
        arabic: ["Noto Naskh Arabic", "serif"],
      },
      colors: {
        light: "#F6F6F6",
        primary: "#5CB8E4",
        secondary: "#8758FF",
        lightdark: "#BDBDBD",
        dark: "#181818",
      },
    },
  },
  plugins: [],
};
