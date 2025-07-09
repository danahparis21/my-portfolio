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
    <div className="text-white font-sans scrollbar-thin scrollbar-thumb-[#35174a] scrollbar-track-[#070918] overflow-y-scroll overflow-x-hidden h-screen">
  <Navbar />
      <Home />
      <TechStack />
      <Projects />
      <Contacts />
    </div>
  );
}


export default App;
