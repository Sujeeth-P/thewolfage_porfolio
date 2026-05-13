/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Bebas Neue'", "'Anton'", 'sans-serif'],
        body: ["'Space Grotesk'", 'sans-serif'],
      },
    },
  },
  plugins: [],
}
