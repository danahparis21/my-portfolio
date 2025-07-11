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

        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      keyframes: {
        holoMove: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "100% 100%" }, // ✅ fix here
        },
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

        float: {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-20px) translateX(10px)" },
        },
        pulse: {
          "0%, 100%": { opacity: "0.7" },
          "50%": { opacity: "0.4" },
        },

        "slow-explode": {
          "0%, 100%": {
            opacity: "0",
            transform: "scale(0.5)",
          },
          "20%, 80%": {
            opacity: "1",
            transform: "scale(1.8)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(2.5)",
            filter: "blur(40px)",
          },
        },
        "slow-throb": {
          "0%, 100%": {
            opacity: "0.2",
            transform: "scaleX(0.8)",
          },
          "50%": {
            opacity: "1",
            transform: "scaleX(1.5)",
            filter: "blur(8px)",
          },
        },
        "slow-flash": {
          "0%": {
            opacity: "0.1",
            transform: "scaleX(0.7)",
            filter: "blur(15px)",
          },
          "30%": {
            opacity: "0.9",
            transform: "scaleX(1.8)",
            filter: "blur(35px)",
          },
          "70%": {
            opacity: "0.9",
            transform: "scaleX(1.8)",
            filter: "blur(35px)",
          },
          "100%": {
            opacity: "0.3", // 🔁 keep a soft glow instead of fully fading
            transform: "scaleX(1.2)",
            filter: "blur(20px)",
          },
        },

        "slow-dance": {
          "0%, 100%": {
            opacity: "0",
            transform: "translateY(-5px) scale(0.5)",
          },
          "50%": {
            opacity: "1",
            transform: "translateY(5px) scale(2)",
            filter: "blur(2px)",
          },
        },
        "slow-expand": {
          "0%": {
            opacity: "1",
            transform: "scale(0)",
          },
          "100%": {
            opacity: "0",
            transform: "scale(3)",
            filter: "blur(50px)",
          },
        },
        shimmer: {
          "0%": {
            transform: "skewX(-20deg) translateX(-100%)",
          },
          "100%": {
            transform: "skewX(-20deg) translateX(200%)",
          },
        },

        fadeBg: {
          '0%': { backgroundColor: '#ffffff' },
          '100%': { backgroundColor: '#070918' },
        },
      
    
      },
      animation: {
        holoMove: "holoMove 300s ease-in-out infinite",
        fadeInUp: "fadeInUp 1s ease-out both",
        letterGlow: "letterGlow 1.5s ease-in-out infinite",
        subtleGlow: "subtleGlow 10s ease-in-out infinite",

        float: "float 8s ease-in-out infinite",
        floatSlow: "float 12s ease-in-out infinite",
        pulse: "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        pulseSlow: "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",

        "slow-explode": "slow-explode 20s cubic-bezier(0.2, 0.8, 0.4, 1) infinite",
        "slow-throb": "slow-throb 20s ease-in-out infinite",
        "slow-flash": "slow-flash 25s ease-in-out infinite",
        "slow-dance": "slow-dance 20s ease-in-out infinite",
        "slow-expand": "slow-expand 30s linear infinite",

        shimmer: "shimmer 1.2s ease-out forwards",


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
  plugins: [require("tailwind-scrollbar")],
};
