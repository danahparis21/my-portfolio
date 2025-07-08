import React, { useState, useEffect, useRef } from "react";
import GlowCircles from "./GlowCircles";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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



const DraggableTechIcon = ({ iconData, index, moveItem, hoveredIndex, setHoveredIndex, fadingIndex, setFadingIndex, isDraggingOver, draggedItemIndex,  shiftDirection }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TECH_ICON',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'TECH_ICON',
    hover: (draggedItem, monitor) => {
     
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
      
        draggedItem.index = index;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const { icon, label, glow } = iconData;

  const getShiftTransform = () => {
    if (isDragging) return 'scale(1.05) translateX(0px)';
  
    // Animate shift if another item is being dragged
    if (draggedItemIndex !== null && shiftDirection !== 0) {
      return `translateX(${shiftDirection * 40}px)`; // shift 40px left/right
    }
  
    return 'translateX(0px)';
  };
  

  return (
    <div
      ref={(node) => drag(drop(node))}
      onMouseEnter={() => {
        setHoveredIndex(index);
        setFadingIndex(null);
      }}
      onMouseLeave={() => {
        setHoveredIndex(null);
        setFadingIndex(index);
        setTimeout(() => {
          setFadingIndex(null);
        }, 10000);
      }}
      className={`group relative flex flex-col items-center text-6xl p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-md transition-all duration-300 hover:border-white/20 overflow-visible ${
        isDragging ? 'opacity-50 z-50' : 'opacity-100 z-10'
      }`}
      style={{
        cursor: 'move',
    
        transform: `${getShiftTransform()} ${isDragging ? 'scale(1.05)' : 'scale(1)'}`,
        transition: 'transform 0.3s ease, opacity 0.2s ease',
      
        pointerEvents: isDragging ? 'none' : 'auto',
      }}
    >
      {/* Glow */}
      <div
        className={`absolute inset-0 rounded-xl z-0 pointer-events-none transition-opacity blur-md ${
          hoveredIndex === index || fadingIndex === index
            ? 'opacity-100'
            : 'opacity-0'
        }`}
        style={{
          transitionDuration: hoveredIndex === index ? '200ms' : '2000ms',
          boxShadow: `
            0 0 8px 2px ${glow},
            0 0 12px 3px ${glow}
          `,
          background: 'transparent',
        }}
      ></div>

      {/* Icon */}
      <span
        className={`relative z-10 transition-colors duration-300 ${
          hoveredIndex === index ? 'text-[inherit]' : 'text-white'
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
  );
};

const TechStack = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [fadingIndex, setFadingIndex] = useState(null);
  const [techItems, setTechItems] = useState(techIcons);
  const [isDraggingOverGrid, setIsDraggingOverGrid] = useState(false);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null); 

  const moveItem = (fromIndex, toIndex) => {

    setTechItems((prevItems) => {
      const updatedItems = [...prevItems];
      const [movedItem] = updatedItems.splice(fromIndex, 1);
      updatedItems.splice(toIndex, 0, movedItem);
      return updatedItems;
    });
  };

  const handleDragStart = (index) => {
    setDraggedItemIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedItemIndex(null);
  };

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
          <h2 className="text-4xl md:text-5xl font-medium leading-snug pb-2 animate-fadeInUp bg-gradient-to-r from-white via-white/80 to-white/60 bg-clip-text text-transparent drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
            Tech Stack
          </h2>
        </div>

        <DndProvider backend={HTML5Backend}>
          <div
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 mt-8"
            onDragEnter={() => setIsDraggingOverGrid(true)}
            onDragLeave={() => setIsDraggingOverGrid(false)}
          >
            {techItems.map((item, index) => {
  let shift = 0;

  if (
    draggedItemIndex !== null &&
    draggedItemIndex !== index
  ) {
    if (draggedItemIndex < index) {
      shift = -1; // shift left
    } else if (draggedItemIndex > index) {
      shift = 1; // shift right
    }
  }

  return (
    <DraggableTechIcon
      key={index}
      index={index}
      iconData={item}
      moveItem={moveItem}
      hoveredIndex={hoveredIndex}
      setHoveredIndex={setHoveredIndex}
      fadingIndex={fadingIndex}
      setFadingIndex={setFadingIndex}
      isDraggingOver={isDraggingOverGrid}
      draggedItemIndex={draggedItemIndex}
      shiftDirection={shift}
      onDragStart={() => handleDragStart(index)}
      onDragEnd={handleDragEnd}
    />
  );
})}

          </div>
        </DndProvider>
      </div>
      {/* Gradient Bridge to Projects */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-[#070918] pointer-events-none z-0" />
    </section>
  );
};

export default TechStack;