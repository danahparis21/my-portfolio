export default {
  darkMode: "class",
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
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        letterGlow: {
          '0%': { 
            textShadow: '0 0 5px currentColor',
            transform: 'scale(1)'
          },
          '50%': { 
            textShadow: '0 0 15px currentColor, 0 0 20px var(--tw-gradient-to)',
            transform: 'scale(1.05)'
          },
          '100%': { 
            textShadow: '0 0 5px currentColor',
            transform: 'scale(1)'
          },
        },
        subtleGlow: {
          '0%, 100%': { 
            textShadow: '0 0 5px rgba(255,255,255,0.3)',
          },
          '50%': { 
            textShadow: '0 0 8px rgba(255,255,255,0.5)',
          },
        }
      },
      animation: {
        fadeInUp: 'fadeInUp 1s ease-out both',
        letterGlow: 'letterGlow 1.5s ease-in-out infinite',
        subtleGlow: 'subtleGlow 3s ease-in-out infinite',
      },
      
    },
    
  },

  
  plugins: [],
};