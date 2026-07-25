/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#05070f',
          card: 'rgba(10, 15, 30, 0.7)',
          border: 'rgba(255, 255, 255, 0.08)',
          primary: '#3b82f6', // blue
          secondary: '#06b6d4', // cyan
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
