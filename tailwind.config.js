const flexoki = require('./tailwind.config')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode
        'bg': {
          DEFAULT: '#FFFCF0',
          dark: '#100F0F',
        },
        'fg': {
          DEFAULT: '#100F0F',
          dark: '#FFFCF0',
        },
        'paper': {
          DEFAULT: '#F2F0E5',
          dark: '#1C1C1C',
        },
        'muted': {
          DEFAULT: '#878580',
          dark: '#6F6E69',
        },
        'accent': {
          DEFAULT: '#D14D41',
          dark: '#FE640B',
        },
        'border': {
          DEFAULT: '#E8E6E1',
          dark: '#1C1C1C',
        },
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'merriweather': ['Merriweather', 'serif'],
        'playfair': ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}