import { useState, useEffect, useRef } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

function Navbar() {
  const [darkMode, setDarkMode] = useState(true);
  const [hoverIndex, setHoverIndex] = useState(null);
  const navRefs = useRef([]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[40%] max-w-5xl h-12 bg-white/10 dark:bg-white/10 backdrop-blur-lg border border-white/20 px-10 rounded-full flex items-center justify-between shadow-md z-50 font-sans">
      {/* Left: Name */}
      <div className="text-lg font-bold text-white tracking-wide">
        Danah Paris
      </div>

      {/* Center: Nav Links */}
      <div className="relative flex items-center justify-center">
        {/* Hover Glass - Only for nav items (index 0-2) */}
        <div
          className="absolute top-1/2 left-0 h-8 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 transition-all duration-300 ease-in-out -translate-y-1/2 shadow-[0_0_12px_rgba(255,255,255,0.1)] scale-105"
          style={{
            width:
              hoverIndex !== null && hoverIndex < 3
                ? `${navRefs.current[hoverIndex]?.offsetWidth + 16}px`
                : 0,
            transform:
              hoverIndex !== null && hoverIndex < 3
                ? `translateY(-50%) translateX(${
                    navRefs.current[hoverIndex]?.offsetLeft - 8
                  }px)`
                : "translateY(-50%) translateX(0)",
            opacity: hoverIndex !== null && hoverIndex < 3 ? 1 : 0,
          }}
        />

        <ul className="flex gap-6 text-white font-light text-base relative z-10">
          {["Home", "Projects", "Contact"].map((label, idx) => {
            const targetId = label.toLowerCase(); // ✅ Now valid
            return (
              <li
                key={label}
                ref={(el) => (navRefs.current[idx] = el)}
                onMouseEnter={() => setHoverIndex(idx)}
                onMouseLeave={() => setHoverIndex(null)}
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

      {/* Right: Theme Toggle */}
      <div className="relative">
        <button
          onMouseEnter={() => setHoverIndex(null)} // Explicitly set to null
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-transparent text-white/80 text-xl transition-all duration-300 hover:text-white hover:bg-white/10 hover:scale-110"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
