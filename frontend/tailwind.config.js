/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        abyss: '#0A0A0A',
        surface: '#121212',
        elevated: '#1A1A1A',
        blood: '#D42A2A',
        'blood-dark': '#B91C1C',
        bone: '#E0E0E0',
        ash: '#A1A1AA',
        grit: '#333333',
      },
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        marker: ['Permanent Marker', 'cursive'],
        body: ['IBM Plex Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
