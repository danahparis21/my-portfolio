export default {
  darkMode: "class", // <--- Add this!
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'],
      },
      colors: {
        dark: "#090b1a",
        glow1: "#2a1188",
        glow2: "#764ed4",
        glow3: "#c056b5",
        glow4: "#fbf1fe",
        glow5: "#ffffce",
      },
  },
},
  plugins: [],
};
