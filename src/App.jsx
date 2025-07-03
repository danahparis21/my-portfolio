import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from "./components/Navbar";
import Home from "./components/Home";

function App() {
  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />

      <div className="bg-dark text-white min-h-screen font-sans">
      <Home />
    </div>
    </div>
  );
}
export default App;
