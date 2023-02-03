/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        text: "#F0F0F0",
        secondary: "#737E76",
      },
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      serif: ["Inconsolata", "Merriweather", "serif"],
    },
  },
  plugins: [],
};
