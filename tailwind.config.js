/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGreen: '#2F715B',
        lightGreen:'#50B38C',
      },
    },
  },
  plugins: [],
}

