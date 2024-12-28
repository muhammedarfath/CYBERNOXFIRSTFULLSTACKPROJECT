
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{ts,tsx,jsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    colors: {
      primary: "#740938",
      primary2:"#DE7C7D",
      white:"#fff", 
      gray:"#CCC",
      gary200:"#",
      red:"#AF1740",
      button: "#CC2B52", 
      buttonhover: "#2563EB", 
      black:"#000000",
      gray50:"#F8F9FF",
      lightgreen:"#E0FBFD",


    },
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      screens: {
        "custom-md": "1020px",
      },
      animation: {
        "rotate-x": "rotateX 2s ease-out once",
      },
      keyframes: {
        rotateX: {
          "0%": { transform: "rotateX(0deg)" },
          "100%": { transform: "rotateX(360deg)" },
        },
      },
    },
  },
  plugins: [addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
