import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Contacts from "./components/Contacts";

function App() {
  return (
    <div className="text-white font-sans scrollbar-thin scrollbar-thumb-[#35174a] scrollbar-track-[#070918] overflow-y-scroll overflow-x-hidden h-screen scroll-smooth">
      <Navbar />
      <section id="home"><Home /></section>
      <TechStack />
      <section id="projects"><Projects /></section>
      <section id="contact"><Contacts /></section>
    </div>
  );
}



export default App;
