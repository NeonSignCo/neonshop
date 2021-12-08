module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./context/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: { 
      colors: {
        accent: "#1e272e",
      },
      screens: {
        'xs': "300px"
      }
    },
  },
  variants: {
    extend: {}, 
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
  