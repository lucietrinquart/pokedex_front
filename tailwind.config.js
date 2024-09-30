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
        'noir': '#313131',
        water: {
          500: '#6390F0',
        }, 
        fire: {
          500: '#EE8130',
        }, 
        grass: {
          500: '#7AC74C', 
        },  
        normal: {
          500: '#A8A77A', 
        }, 
        electric: {
          500: '#F7D02C', 
        }, 
        ice: {
          500: '#96D9D6', 
        }, 
        fighting: {
          500: '#C22E28', 
        }, 
        poison: {
          500: '#A33EA1', 
        }, 
        ground: {
          500: '#E2BF65', 
        }, 
        flying: {
          500: '#A98FF3', 
        }, 
        bug: {
          500: '#A6B91A', 
        }, 
        rock: {
          500: '#B6A136', 
        }, 
        ghost: {
          500: '#735797', 
        }, 
        dragon: {
          500: '#6F35FC', 
        }, 
        dark: {
          500: '#705746', 
        }, 
        steel: {
          500: '#B7B7CE', 
        }, 
        fairy: {
          500: '#D685AD', 
        }, 
      },
  },
  },
  safelist: [
    {
      pattern: /(grass|fire|water|electric|ice|normal|fighting|poison|ground|flying|psychic|bug|rock|ghost|dragon|dark|steel|fairy)/,
    },
  ],
  plugins: [],
}