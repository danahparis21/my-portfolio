import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Contacts from "./components/Contacts";
import { useTheme } from "./context/ThemeContext"; 
import TestVideo from "./components/TestVideo"; 
function App() {
  const { darkMode } = useTheme();

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      {/* Global Background Layer */}
      <div
        className={`fixed inset-0 -z-50 transition-colors duration-700 ${
          darkMode ? "bg-[#070918]" : "bg-white"
        }`}
      />

  

      {/* Scrollable App Content */}
      <div
        className="relative bg-transparent text-neutral-800 dark:text-white font-sans overflow-y-scroll overflow-x-hidden h-screen scroll-smooth
        [&::-webkit-scrollbar]:hidden
        [-ms-overflow-style:'none']
        [scrollbar-width:'none']"
      >
        <Navbar />
        <section id="home">
          <Home />
        </section>
        <TechStack />
        <section id="projects">
          
          <Projects />
        </section>
        <section id="contact">
          <Contacts />
  
        </section>
      </div>
    </div>
  );
}

export default App;
