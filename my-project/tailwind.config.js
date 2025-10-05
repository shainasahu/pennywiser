/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          sans: ['var(--font-inter)', 'sans-serif'],    // body text
          heading: ['var(--font-roboto)', 'sans-serif'], // headings
        },
      },
    },
    plugins: [],
};
  