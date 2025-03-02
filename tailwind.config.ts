/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "sm-max": { max: "374.99px" },
      md: "768px",
      lg: "1440px",
    },
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
  plugins: [
    ({ addComponents }) => {
      addComponents({
        ".container": {
          minWidth: "320px",
          maxWidth: "375px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "20px",
          paddingRight: "20px",
          "@screen md": {
            paddingLeft: "32px",
            paddingRight: "32px",
            maxWidth: "768px",
          },
          "@screen lg": {
            paddingLeft: "32px",
            paddingRight: "32px",
            maxWidth: "1280px",
          },
        },
      });
    },
  ],
};
