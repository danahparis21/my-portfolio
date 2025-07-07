import React, { useState } from "react";
import GlowCircles from "./GlowCircles";

const techIcons = [
  { icon: "devicon-java-plain", label: "Java", glow: "#f89820" },
  { icon: "devicon-python-plain", label: "Python", glow: "#3572A5" },
  { icon: "devicon-cplusplus-plain", label: "C++", glow: "#00599C" },
  { icon: "devicon-react-original", label: "ReactJS", glow: "#61DBFB" },
  { icon: "devicon-javascript-plain", label: "JavaScript", glow: "#f7df1e" },
  { icon: "devicon-mysql-plain", label: "MySQL", glow: "#00758F" },
  { icon: "devicon-php-plain", label: "PHP", glow: "#8892BF" },
  { icon: "devicon-html5-plain", label: "HTML5", glow: "#e44d26" },
  { icon: "devicon-css3-plain", label: "CSS3", glow: "#264de4" },
  { icon: "devicon-tailwindcss-plain", label: "Tailwind CSS", glow: "#38bdf8" },
];

const TechStack = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [fadingIndex, setFadingIndex] = useState(null);

  return (
    <section className="relative w-full min-h-[70vh] overflow-hidden z-10 text-white px-6 pt-6 pb-12">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#070918] -z-40" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-5 mix-blend-overlay pointer-events-none -z-30" />
      <div className="absolute inset-0 bg-holo bg-[length:300%_300%] opacity-20 blur-xl mix-blend-soft-light pointer-events-none -z-20" />

      {/* Glowing circles */}
      <GlowCircles />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center space-y-10">
        <div>
          <p className="uppercase tracking-widest text-sm text-white/60 mb-2">
            my tools & languages
          </p>
          <h2 className="text-4xl md:text-5xl font-bold animate-fadeInUp">
            Tech Stack
          </h2>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 mt-8">
          {techIcons.map(({ icon, label, glow }, index) => (
            <div
              key={index}
              onMouseEnter={() => {
                setHoveredIndex(index);
                setFadingIndex(null);
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                setFadingIndex(index);
                setTimeout(() => {
                  setFadingIndex(null);
                }, 10000); // 1s fade-out duration
              }}
              className="group relative flex flex-col items-center text-6xl p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-md transition-all duration-300 hover:border-white/20 overflow-visible"
            >
              {/* Glow */}
              <div
                className={`absolute inset-0 rounded-xl z-0 pointer-events-none transition-opacity blur-md ${
                  hoveredIndex === index || fadingIndex === index
                    ? "opacity-100"
                    : "opacity-0"
                }`}
                style={{
                    transitionDuration: hoveredIndex === index ? "200ms" : "2000ms",
                    boxShadow: `
                      0 0 8px 2px ${glow},
                      0 0 12px 3px ${glow}
                    `,
                    background: "transparent"
                  }}
                  
              ></div>

              {/* Icon */}
              <span
                className={`relative z-10 transition-colors duration-300 ${
                  hoveredIndex === index ? "text-[inherit]" : "text-white"
                }`}
                style={hoveredIndex === index ? { color: glow } : {}}
              >
                <i className={icon}></i>
              </span>

              {/* Label */}
              <p className="mt-3 text-sm text-white/60 group-hover:text-white/80 uppercase tracking-widest relative z-10 transition-colors duration-300">
                {label}
              </p>
            </div>
          ))}
        </div>
        
      </div>
      {/* Gradient Bridge to Projects */}
<div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-[#070918] pointer-events-none z-0" />

      
    </section>
  );
};

export default TechStack;
