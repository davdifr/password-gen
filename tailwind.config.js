/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      base: {
        100: "hsl(var(--base-100) / <alpha-value>)",
        200: "hsl(var(--base-200) / <alpha-value>)",
        300: "hsl(var(--base-300) / <alpha-value>)",
        400: "hsl(var(--base-400) / <alpha-value>)",
        500: "hsl(var(--base-500) / <alpha-value>)",
        600: "hsl(var(--base-600) / <alpha-value>)",
        900: "hsl(var(--base-900) / <alpha-value>)",
      },
      primary: "hsl(var(--primary) / <alpha-value>)",
    },
    fontFamily: {
      mono: ["Roboto Mono", "sans-serif"],
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
