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
          700: '#4b6ec0',
        }, 
        fire: {
          500: '#EE8130',
          700: '#c66526',
        }, 
        grass: {
          500: '#7AC74C',
          700: '#5f9b3c',
        },  
        normal: {
          500: '#A8A77A',
          700: '#86835f',
        }, 
        electric: {
          500: '#F7D02C',
          700: '#c6a923',
        }, 
        ice: {
          500: '#96D9D6',
          700: '#74aea9',
        }, 
        fighting: {
          500: '#C22E28',
          700: '#991e1c',
        }, 
        poison: {
          500: '#A33EA1',
          700: '#822f81',
        }, 
        ground: {
          500: '#E2BF65',
          700: '#b19a50',
        }, 
        flying: {
          500: '#A98FF3',
          700: '#8772c2',
        }, 
        bug: {
          500: '#A6B91A',
          700: '#849215',
        }, 
        rock: {
          500: '#B6A136',
          700: '#917f2b',
        }, 
        ghost: {
          500: '#735797',
          700: '#5a4577',
        }, 
        dragon: {
          500: '#6F35FC',
          700: '#5629c9',
        }, 
        dark: {
          500: '#705746',
          700: '#574335',
        }, 
        steel: {
          500: '#B7B7CE',
          700: '#8f8fa4',
        }, 
        fairy: {
          500: '#D685AD',
          700: '#ad6a89',
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