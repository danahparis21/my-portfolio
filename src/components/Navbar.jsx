import { useState, useEffect, useRef } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { darkMode, setDarkMode } = useTheme();

  const [hoverIndex, setHoverIndex] = useState(null);
  const navRefs = useRef([]);

  const isTouchDevice =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  const shouldEnableHover = () => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const isSmallScreen = window.innerWidth < 1024;
    return !isCoarse && !isSmallScreen;
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <nav
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 
    w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] max-w-5xl h-12
    backdrop-blur-lg px-4 sm:px-6 md:px-10
    rounded-full flex items-center justify-between shadow-md z-50 font-sans
    transition-colors duration-300
    ${
      darkMode
        ? "bg-white/10 border border-white/20 text-white"
        : "bg-white/80 border border-black/20 text-black"
    }`}
    >
      <div
        className={`text-lg font-bold tracking-wide transition-colors duration-300 ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        {/* Show DP only below 1201px */}
        <span className="block custom-xl:hidden">DP</span>

        {/* Show Danah Paris only at 1201px and above */}
        <span className="hidden custom-xl:inline">Danah Paris</span>
      </div>

      {/* 🧭 Center: Nav Links */}
      <div className="relative hidden sm:flex items-center justify-center">
        <div
          className={`absolute top-1/2 left-0 h-10 rounded-full 
      backdrop-blur-[6px] transition-all duration-300 ease-in-out 
      -translate-y-1/2 scale-110
      ${
        darkMode
          ? "bg-white/10 border border-white/20 shadow-[0_0_12px_rgba(255,255,255,0.1)]"
          : "bg-white/30 border border-black/20 shadow-[0_0_24px_rgba(255,255,255,0.4)]"
      }`}
          style={{
            width:
              hoverIndex !== null && hoverIndex < 3
                ? `${navRefs.current[hoverIndex]?.offsetWidth + 24}px`
                : 0,
            transform:
              hoverIndex !== null && hoverIndex < 3
                ? `translateY(-50%) translateX(${
                    navRefs.current[hoverIndex]?.offsetLeft - 12
                  }px)`
                : "translateY(-50%) translateX(0)",
            opacity: hoverIndex !== null && hoverIndex < 3 ? 1 : 0,
          }}
        />

        <ul
          className={`flex gap-4 font-light text-base relative z-10 transition-colors duration-300 ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          {["Home", "Projects", "Contact"].map((label, idx) => {
            const targetId = label.toLowerCase();
            return (
              <li
                key={label}
                ref={(el) => (navRefs.current[idx] = el)}
                onMouseEnter={() => {
                  if (!shouldEnableHover()) return;
                  setHoverIndex(idx);
                }}
                onMouseLeave={() => {
                  if (!shouldEnableHover()) return;
                  setHoverIndex(null);
                }}
                onClick={() => {
                  const section = document.getElementById(targetId);
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="px-2 py-1 transition-all cursor-pointer"
              >
                {label}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mobile Nav (Visible on small screens only) */}
      <div className="sm:hidden flex items-center justify-between w-full px-4 py-2">
        {/* Center: Nav Links */}
        <div className="flex space-x-4">
          {["Home", "Projects", "Contact"].map((label) => {
            const targetId = label.toLowerCase();
            return (
              <button
                key={label}
                onClick={() => {
                  const section = document.getElementById(targetId);
                  section?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`px-2 py-1 text-sm font-medium rounded-full transition-colors ${
                  darkMode
                    ? "text-white hover:bg-white/10"
                    : "text-black hover:bg-black/10"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 🌗 Theme Toggle — Desktop and Tablet Only */}
      <div className="hidden sm:block relative">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full text-xl transition-all duration-300
    hover:scale-110 text-neutral-800 dark:text-white
    hover:bg-neutral-200 dark:hover:bg-white/10"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      {/* 🌗 Theme Toggle — Mobile Only */}
      <div className="flex-shrink-0 sm:hidden">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full text-xl transition-all duration-300
    hover:scale-110 text-neutral-800 dark:text-white
    hover:bg-neutral-200 dark:hover:bg-white/10"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
