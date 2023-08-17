/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary: "#00668a",
        // secondary: "#004e71",
        primary: "#1f2125",
        secondary: "#343a40",
      },
      fontFamily: { 
        roboto: ["Roboto", "sans-serif"],
      },
      container:{
        padding:"2rem",
        center: true,
      },
      // screens: {
      //   sm:"640px",
      //   md:"768px",
      // },
    },
  },
  plugins: [],
};
