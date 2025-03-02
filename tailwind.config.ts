/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        sm: "0 2px 4px #f9f9f9",
        md: "0 0 4px #f9f9f919",
      },
      fontFamily: {
        gilroy: ["Gilroy", "sans-serif"],
      },
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [],
};
