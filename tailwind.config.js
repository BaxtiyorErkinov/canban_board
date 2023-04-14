/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-100": "#adb5bd",
        "dark-200": "#6c757d",
        "dark-300": "#495057",
        "dark-400": "#343a40",
        "dark-500": "#212529",
      },
    }

  },
  plugins: [],
}