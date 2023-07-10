/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/(auth)/*.{js,jsx,ts,tsx}",
    "./app/index.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#EBF3F7",
        secondary: "#9BC8E3",
        gray: "#83829A",
        gray2: "#C1C0C8",
        white: "#F3F4F8",
        lightWhite: "#FAFAFC",
      }
    },
  },
  plugins: [],
};
