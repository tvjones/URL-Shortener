/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
   "scripts":{
    "build":"tailwindcss build style.css -o css/style.css"
  }
}
