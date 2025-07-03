export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        holo: `linear-gradient(
          135deg,
           #070918 0%,
    #070918 6%,
    #2a1188 10%,
    #070918 14%,
    #84559d 20%,
    #070918 26%,
    #5036d5 35%,
    #070918 45%,
    #c056b5 55%,
    #070918 65%,
    #fea4fe 75%,
    #070918 85%,
    #070918 100%
        )`,
      },
      keyframes: {
        holoMove: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "400% 400%" },
        },
        // Add to your tailwind config
        glow: {
          0: "0 0 0px rgba(255, 255, 255, 0)",
          50: "0 0 10px rgba(255, 255, 255, 0.3)",
          100: "0 0 20px rgba(255, 255, 255, 0.5)",
        },

        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        letterGlow: {
          "0%": {
            textShadow: "0 0 5px currentColor",
            transform: "scale(1)",
          },
          "50%": {
            textShadow: "0 0 15px currentColor, 0 0 20px var(--tw-gradient-to)",
            transform: "scale(1.05)",
          },
          "100%": {
            textShadow: "0 0 5px currentColor",
            transform: "scale(1)",
          },
        },
        subtleGlow: {
          "0%, 100%": {
            textShadow: "0 0 5px rgba(255,255,255,0.3)",
          },
          "50%": {
            textShadow: "0 0 8px rgba(255,255,255,0.5)",
          },
        },
      },
      animation: {
        holoMove: "holoMove 300s linear infinite",
        fadeInUp: "fadeInUp 1s ease-out both",
        letterGlow: "letterGlow 1.5s ease-in-out infinite",
        subtleGlow: "subtleGlow 10s ease-in-out infinite",
      },
      fontFamily: {
        sans: ['"Open Sans"', "sans-serif"],
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
