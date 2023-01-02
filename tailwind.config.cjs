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
        'theme-red': '#db0000',
        'theme-orange': '#ff7b00',
        'theme-yellow': '#ffbb00',
        'theme-lime': '#00ff22',
        'theme-green': '#046d00',
        'theme-lightBlue': '#00fffb',
        'theme-blue': '#001eff',
        'theme-blue-vibrant': '#0000F4',
        'theme-indigo': '#6f00ff',
        'theme-purple': '#36008c',
        'theme-pink': '#ff00d4',
        'theme-white': '#fffff6',
        'theme-black': '#000000',
      },
    },
  },
  plugins: [],
};
