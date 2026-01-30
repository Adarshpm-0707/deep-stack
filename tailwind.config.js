/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        deepblack: "#000000",
        neon: "#E6FF00",
      },
    },
  },
  plugins: [],
};