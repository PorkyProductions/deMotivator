/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.html', './src/**/*.js', './src/**/*.svelte', './src/components/**/*.svelte', 'index.html'],
  theme: {
    fontFamily: {
      primary: ['Raleway', 'sans-serif'],
    },
    extend: {
      colors: {
        'primary-majorelleBlue': '#4f46e5',
        'secondary-orangePantone': '#F75C03',
        'tertiary-mauve': '#DABFFF',
      },
    },
  },
  plugins: [],
};
