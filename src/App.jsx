import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import TechStack from "./components/TechStack"; 

function App() {
  return (
    <div className="text-white font-sans">
      <Navbar />
      <Home />
      <TechStack />
    </div>
  );
}

export default App;
