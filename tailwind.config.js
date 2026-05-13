/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        wolf: {
          dark: '#080808',
          yellow: '#E8F020',
          white: '#FAFAF7',
          card: '#0E0E0E',
        },
      },
      fontFamily: {
        display: ["'Bebas Neue'", "'Anton'", 'sans-serif'],
        body: ["'Space Grotesk'", 'sans-serif'],
      },
      keyframes: {
        'pop-in': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '70%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'pop-in': 'pop-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both',
      },
    },
  },
  plugins: [],
}
