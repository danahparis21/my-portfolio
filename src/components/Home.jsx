import React, { useState, useRef, useEffect } from "react";
import profilePic from "../assets/profile.jpg";

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

  return (
    <section className="relative bg-transparent pt-48 pb-48">


      {/* 🔥 Solid Base Dark Background */}
      <div className="fixed inset-0 -z-40 bg-[#070918]" />

      <div className="fixed inset-0 pointer-events-none z-[-20] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-5 mix-blend-overlay" />

      {/* 🔮 Animated Gradient Overlay */}
      <div
        style={{ willChange: "background-position" }}
        className="fixed inset-0 z-[-30] bg-holo bg-[length:300%_300%] animate-holoMove opacity-40 backdrop-blur-xl bg-white/5
 mix-blend-soft-light"
      />

      {/* ✨ Radial Spotlight Mask */}
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_80%)] z-[-20]" />

      {/* 🌫️ Optional: Subtle Noise */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-5 z-[-10] mix-blend-overlay pointer-events-none" />

      {/* 🌟 Decorative Glowing Circles */}
      <div className="absolute top-[-100px] left-[-150px] w-[400px] h-[400px] rounded-full blur-[140px] opacity-80 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-glow2 to-transparent rounded-full animate-pulseSlow" />
      </div>

      <div className="absolute top-[-80px] right-[-150px] w-[400px] h-[400px] rounded-full blur-[140px] opacity-80 z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-glow3 to-transparent rounded-full animate-pulseSlow" />
      </div>

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

      {/* SOFTWARE + ENGINEER + BUTTON */}
      <div className="text-center mt-2 animate-fadeInUp">
        <h1 className="text-7xl font-extrabold tracking-wide leading-none">
          <GlowText text="SOFTWARE" />
        </h1>

        <div className="flex justify-center items-center gap-6 mt-1">
          <h2 className="text-5xl font-extrabold tracking-wide leading-none">
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

      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-b from-transparent to-[#070918] z-10 pointer-events-none" />
      </section>
  );
}

export default Home;
