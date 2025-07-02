import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />

      <div className="pt-32 flex flex-col items-center text-center space-y-4">
        <h1 className="text-4xl font-bold text-glow4 drop-shadow-glow">Hello, Danah ✨</h1>
        <p className="text-glow5">Your glowing portfolio starts here!</p>
      </div>
    </div>
  );
}
export default App;
