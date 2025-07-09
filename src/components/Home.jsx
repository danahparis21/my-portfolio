import React, { useState, useRef, useEffect } from "react";
import profilePic from "../assets/profile.jpg";
import { motion, useInView } from "framer-motion";
import { useScrollDirection } from "../hooks/useScrollDirection";
import { useScroll, useTransform } from "framer-motion";

const GlowText = ({ text, glowRadius = 2 }) => {
  const [hoveredLetter, setHoveredLetter] = useState(null);
  const textRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!textRef.current) return;

    const letters = textRef.current.querySelectorAll("span");
    const { left } = textRef.current.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const letterWidth = textRef.current.offsetWidth / text.length;
    const hoveredIndex = Math.min(
      Math.floor(mouseX / letterWidth),
      text.length - 1
    );

    setHoveredLetter(hoveredIndex);
  };

  const handleMouseLeave = () => {
    setHoveredLetter(null);
  };

  return (
    <div
      ref={textRef}
      className="relative inline-block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {text.split("").map((letter, index) => {
        const isGlowing =
          hoveredLetter !== null &&
          Math.abs(index - hoveredLetter) <= glowRadius;
        return (
          <span
            key={index}
            className={`inline-block ${
              letter === " " ? "w-2" : ""
            } transition-all duration-500 ease-out ${
              isGlowing ? "text-glow4 glow-text" : "text-white"
            }`}
            style={{
              transitionDelay: `${index * 20}ms`,
            }}
          >
            {letter}
          </span>
        );
      })}
    </div>
  );
};

function Home() {
  const handleContactClick = () => {
    window.open(
      "https://mail.google.com/mail/?view=cm&to=micadanah21@gmail.com",
      "_blank"
    );
  };

  const scrollDirection = useScrollDirection();
  const sectionRef = useRef();
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative bg-transparent pt-48 pb-48"
    >
      {/* Solid Base Dark Background */}
      <div className="fixed inset-0 -z-40 bg-[#070918]" />

      <div className="fixed inset-0 pointer-events-none z-[-20] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-5 mix-blend-overlay" />

      {/* Animated Gradient Overlay */}
      <div
        style={{ willChange: "background-position" }}
        className="fixed inset-0 z-[-30] bg-holo bg-[length:300%_300%] animate-holoMove opacity-40 backdrop-blur-xl bg-white/5
 mix-blend-soft-light"
      />

      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_80%)] z-[-20]" />

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-5 z-[-10] mix-blend-overlay pointer-events-none" />

      {/* MORE DECORATIONS */}
      {/* Dark */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full blur-[80px] z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-purple-900/60 rounded-full mix-blend-multiply" />
      </div>

      {/*  Strong Left Spotlight */}
      <div className="absolute top-[-150px] left-[-200px] w-[800px] h-[400px] blur-[150px] opacity-90 z-10 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-glow2 via-pink-400 to-transparent animate-pulseSlow mix-blend-lighten"
          style={{ clipPath: "polygon(0 0, 100% 0, 70% 100%, 0 100%)" }}
        />
      </div>

      {/* Right Glare  */}
      <div className="absolute top-[-150px] right-[-150px] w-[500px] h-[500px] rounded-full blur-[150px] opacity-90 z-0">
        <div className="absolute inset-0 bg-gradient-to-bl from-glow3 via-amber-200 to-transparent rounded-full animate-pulseSlow mix-blend-screen" />
      </div>

      {/*  Horizontal Glare Line  */}
      <div className="absolute top-[50px] left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-glow5/90 to-transparent opacity-80 blur-[6px] z-10 animate-pulseSlow" />

      {/* random circles, changes every refresh */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={`absolute rounded-full blur-[60px] opacity-80 z-0 animate-floatSlow pointer-events-none mix-blend-screen`}
          style={{
            width: `${100 + Math.random() * 100}px`,
            height: `${100 + Math.random() * 100}px`,
            top: `${-50 + Math.random() * 150}px`,
            left: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, ${
              [
                "#f0abfc",
                "#93c5fd",
                "#86efac",
                "#fca5a5",
                "#fcd34d",
                "#c4b5fd",
              ][i]
            } 0%, transparent 70%)`,
            animationDuration: `${15 + Math.random() * 20}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      {/* Horizontal Glare Line */}
      <div className="absolute top-[50px] left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-glow5/80 to-transparent opacity-70 blur-[6px] z-0 animate-pulseSlow" />

      {/*  Secondary Soft Beams  */}
      <div className="absolute top-[-400px] left-[-350px] w-[1000px] h-[600px] rotate-[35deg] bg-gradient-to-l from-glow2/50 via-glow3/30 to-transparent opacity-25 blur-[80px] z-0 animate-pulseSlow pointer-events-none" />
      <div className="absolute top-[-380px] left-[-320px] w-[1100px] h-[120px] rotate-[32deg] bg-gradient-to-l from-glow2/40 via-glow3/20 to-transparent opacity-20 blur-[60px] z-0 animate-pulseSlow pointer-events-none" />

      {/* Animated content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{
          opacity: isInView ? 1 : 0,
          y: isInView ? 0 : scrollDirection === "down" ? 40 : -40,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col md:flex-row items-center justify-center px-4 text-white gap-4"
      >
        {/* HOME CONTENT */}
        {/* Top Row: Profile Picture + Name + Location */}
        <div className="flex flex-col md:flex-row items-center justify-center px-4 text-white gap-4 animate-fadeInUp">
          <img
            src={profilePic}
            alt="Danah Paris"
            className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover shadow-lg border-4 border-white/20 hover:shadow-glow3/50 transition-all duration-500"
          />
          <div className="text-center md:text-left">
            <h2 className="text-5xl font-bold ">
              <GlowText text="Danah Paris" />
            </h2>
            <div className="text-white/80 text-xl flex items-center justify-center md:justify-start mt-1">
              <GlowText text="Based in Philippines" />
              <img
                src="https://flagcdn.com/ph.svg"
                alt="PH Flag"
                className="w-10 h-10 ml-2 inline-block hover:shadow-glow3/50 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{
          opacity: isInView ? 1 : 0,
          y: isInView ? 0 : scrollDirection === "down" ? 40 : -40,
        }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        className="text-center mt-2"
      >
        {/* SOFTWARE + ENGINEER + BUTTON */}
        <div className="text-center mt-2 animate-fadeInUp">
          <h1 className="text-7xl font-extrabold tracking-wide leading-none bg-gradient-to-r from-white via-white/80 to-white/60 bg-clip-text text-transparent drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
            <GlowText text="SOFTWARE" />
          </h1>

          <div className="flex justify-center items-center gap-6 mt-1">
            <h2 className="text-5xl font-extrabold tracking-wide leading-none bg-gradient-to-r from-white via-white/80 to-white/60 bg-clip-text text-transparent drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
              <GlowText text="ENGINEER" />
            </h2>

            <button
              onClick={handleContactClick}
              className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:scale-105 transition-all duration-300 text-xl hover:shadow-glow4/50 hover:text-glow5 relative overflow-hidden group flex items-center gap-3"
            >
              <i className="fas fa-paper-plane relative z-10"></i>
              <span className="relative z-10">Contact Me</span>

              <span className="absolute inset-0 bg-gradient-to-r from-glow2/30 to-glow3/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </button>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{
          opacity: isInView ? 1 : 0,
          y: isInView ? 0 : scrollDirection === "down" ? 40 : -40,
        }}
        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        className="flex justify-center gap-10 mt-4 text-4xl"
      >
        {/* Social Icons */}
        <div className="flex justify-center gap-10 mt-4 text-4xl animate-fadeInUp">
          {[
            {
              href: "https://www.linkedin.com/in/mica-danah-paris-374a10289/",
              icon: "fab fa-linkedin",
              color: "hover:text-blue-500",
              glow: "hover:shadow-blue-500/30",
            },
            {
              href: "https://www.instagram.com/danahparis_/",
              icon: "fab fa-instagram",
              color: "hover:text-pink-400",
              glow: "hover:shadow-pink-400/30",
            },
            {
              href: "https://github.com/danahparis21",
              icon: "fab fa-github",
              color: "hover:text-purple-300",
              glow: "hover:shadow-purple-300/30",
            },
            {
              href: "/myResume.pdf",
              icon: "fas fa-file-alt",
              color: "hover:text-yellow-300",
              glow: "hover:shadow-yellow-300/30",
            },
          ].map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-white ${social.color} transition-all duration-500 hover:scale-110 ${social.glow} p-2 rounded-full`}
            >
              <i className={social.icon}></i>
            </a>
          ))}
        </div>
      </motion.div>

      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-b from-transparent to-[#070918] z-10 pointer-events-none" />
    </section>
  );
}

export default Home;
