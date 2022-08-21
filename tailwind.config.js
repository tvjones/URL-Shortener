/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens:{
      'sm':{'min':'300px', 'max':'900px'},
    },
    extend: {},
  },
  plugins: [],
}
