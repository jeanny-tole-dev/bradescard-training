/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bradescard: {
          red: '#E30613',
          dark: '#1A1A1A',
        },
        positive: {
          blue: '#005691',
          orange: '#FF8200',
        }
      }
    },
  },
  plugins: [],
}