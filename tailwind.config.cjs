/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}', 'index.html'],
  theme: {
    fontFamily: {
      primary: ['Raleway', 'sans-serif'],
    },
    extend: {
      colors: {
        primaryMajorelleBlue: '#4f46e5',
        secondaryOrangePantone: '#F75C03',
        tertiaryMauve: '#DABFFF',
        themeRed: '#db0000',
        themeOrange: '#ff7b00',
        themeYellow: '#ffbb00',
        themeLime: '#00ff22',
        themeGreen: '#046d00',
        themeLightBlue: '#00fffb',
        themeBlue: '#001eff',
        themeBlueVibrant: '#0000F4',
        themeIndigo: '#6f00ff',
        themePurple: '#36008c',
        themePink: '#ff00d4',
        themeWhite: '#fffff6',
        themeBlack: '#0a0a0a',
      },
    },
  },
  plugins: [],
};
