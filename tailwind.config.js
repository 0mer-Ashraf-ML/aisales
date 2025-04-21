/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{html,ts}",],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#9333EA",
        secondary: "#ff7e33",
        info: "#0C63E7",
      },
      
    },
    // Rest of your theme configuration...
  },
  plugins: [],
}