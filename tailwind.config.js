module.exports = {
  purge: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'pastel-pink': '#fecdd3',
        'pastel-green': '#d1fae5',
        'pastel-blue': '#bfdbfe',
        'pastel-purple': '#e9d5ff',
      },
      fontFamily: {
        'comic-neue': ['Comic Neue', 'cursive'],
        'inter': ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1.5rem',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
