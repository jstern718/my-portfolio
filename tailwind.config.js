/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,mdx}",
    "./src/components/**/*.{js,jsx,mdx}",
    "./src/app/**/*.{js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'green-dark': '#444A3F',
        'green-mid': '#122012',
        'green-accent': '#1a3a1a',
        'green-highlight': '#2d5a2d',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};