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
        'bg': 'var(--bg)',
        'fg': 'var(--fg)',
        'paper': 'var(--paper)',
        'muted': 'var(--muted)',
        'accent': 'var(--accent)',
        'accent-fg': 'var(--accent-fg)',
        'border': 'var(--border)',
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