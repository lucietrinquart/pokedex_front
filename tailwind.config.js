//modification de couleurs, tailles des espacement, etc

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
      sans: ['Fira Sans', 'sans-serif'],
      'police': 'montserrat'
      },
      colors:{
        'rouge': '#EB0000',
        'autrerouge': '#FF6E6E',
        'noir': '#313131'
      }
  },
  },
  plugins: [],
}