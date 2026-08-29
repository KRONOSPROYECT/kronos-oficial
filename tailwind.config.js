/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        quantum: {
          black: "#050505",
          gold: "#B88A2D",
          cyan: "#00FFFF",
          purple: "#8A2BE2",
        }
      },
      fontFamily: {
        luxury: ['"Times New Roman"', 'serif'],
        tech: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 20px rgba(184, 138, 45, 0.6)',
        'cyan-glow': '0 0 20px rgba(0, 255, 255, 0.6)',
      }
    },
  },
  plugins: [],
};