module.exports = {
  theme: {
    fontFamily: {
      // Vincula el nombre de la utilidad con el @font-face del CSS
      'montserrat': ['Montserrat', 'sans-serif'],
    },
    animation: {
      fadeIn: 'fadeIn 0.3s ease-in-out'
    },
    keyframes: {
      fadeIn: {
        '0%': {opacity: 0},
        '100%': {opacity: 1}
      }
    }
  },
}
