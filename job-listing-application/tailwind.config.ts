import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          "custom-gradient": "linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #4640DE",
          
          
        
      },
      colors:{
        "my-yellow": "#FFB836",
        "dark-blue": "#25324B",
        "orange-tag": "#FFB836",
        "green-tag": "#56CDAD",
        "purple-tag": "#4640DE",
        "grey-subtitle": "#7C8493",
        "light-grey": "#D6DDEB",
        "disabled-grey": "#202430",
        "brighter-grey": "#CCCCF5",
        "light-black": "#515B6F",
        "bluish-grey": "#F8F8FD"
        
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
        body: ['Epilogue', 'sans-serif']
      },
    },
  },
  plugins: [],
};
export default config;
