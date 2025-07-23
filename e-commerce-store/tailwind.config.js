/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}", // Adjust path as per your project structure
    "./public/index.html",             // Include HTML files if needed
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af',  // Example: Add custom color
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Example: Add custom font
      },
    },
  },
  plugins: [],
}
