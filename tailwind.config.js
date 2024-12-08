/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.jsx",
    "./resources/**/*.js",
    "./resources/**/*.vue",
    "./resources/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        custom_SkinColour : '#E0AC69',
      },
    },
  },
  plugins: [],
  fontFamily: {
    Audrey : ['Audrey-Normal']
  }
}