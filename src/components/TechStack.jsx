import React, { useState, useEffect, useRef } from "react";
import GlowCircles from "./GlowCircles";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useInView, motion } from "framer-motion";
import { useScrollDirection } from "../hooks/useScrollDirection";
import { useTheme } from "../context/ThemeContext";

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
  { icon: "devicon-tailwindcss-plain", label: "Tailwind", glow: "#38bdf8" },
];

const DraggableTechIcon = ({
  iconData,
  index,
  moveItem,
  hoveredIndex,
  setHoveredIndex,
  fadingIndex,
  setFadingIndex,
  isDraggingOver,
  draggedItemIndex,
  shiftDirection,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TECH_ICON",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const { darkMode } = useTheme();

  const [{ isOver }, drop] = useDrop({
    accept: "TECH_ICON",
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
    if (isDragging) return "scale(1.05) translateX(0px)";

    if (draggedItemIndex !== null && shiftDirection !== 0) {
      return `translateX(${shiftDirection * 40}px)`; // shift 40px left/right
    }

    return "translateX(0px)";
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
      className={`group relative flex flex-col items-center text-6xl p-6 rounded-xl 
        border transition-all duration-300 overflow-visible shadow-md backdrop-blur-md
        ${
          darkMode
            ? "bg-white/5 border-white/10 hover:border-white/20 text-white"
            : " border-black/20 hover:border-black/40 text-black"
        } 
        ${isDragging ? "opacity-50 z-50" : "opacity-100 z-10"}`}
      style={{
        cursor: "default",

        transform: `${getShiftTransform()} ${
          isDragging ? "scale(1.05)" : "scale(1)"
        }`,
        transition: "transform 0.3s ease, opacity 0.2s ease",

        pointerEvents: isDragging ? "none" : "auto",
      }}
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
          background: "transparent",
        }}
      ></div>

      {/* Icon */}
      <span
        className={`relative z-10 transition-colors duration-300 
    text-2xl sm:text-3xl md:text-4xl 
    ${hoveredIndex === index ? "" : darkMode ? "text-white" : "text-black"}`}
        style={hoveredIndex === index ? { color: glow } : {}}
      >
        <i className={icon}></i>
      </span>

      {/* Label */}
      <p
        className={`mt-1 text-[0.50rem] sm:text-sm uppercase tracking-widest relative z-10 transition-colors duration-300 whitespace-nowrap
    ${
      darkMode
        ? "text-white/60 group-hover:text-white/80"
        : "text-black/60 group-hover:text-black"
    }`}
      >
        {label}
      </p>
    </div>
  );
};

const TechStack = () => {
  const { darkMode } = useTheme();

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [fadingIndex, setFadingIndex] = useState(null);
  const [techItems, setTechItems] = useState(techIcons);
  const [isDraggingOverGrid, setIsDraggingOverGrid] = useState(false);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  const sectionRef = useRef();
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const scrollDirection = useScrollDirection();

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
    <section
      ref={sectionRef}
      className="relative w-full min-h-[70vh] overflow-hidden z-10 text-white px-6 pt-6 pb-12"
    >
      {/* Background layers */}

      {/* Glowing circles */}
      <GlowCircles />

      {/* Content container */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center space-y-10">
        {/* Title */}
        <motion.div
          key={`title-${isInView}-${scrollDirection}`}
          initial={{
            opacity: 0,
            y: scrollDirection === "down" ? 30 : -30,
          }}
          animate={{
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : scrollDirection === "down" ? 30 : -30,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p
            className={`uppercase tracking-widest text-xs mb-2 transition-colors duration-300 ${
              darkMode ? "text-white/60" : "text-black/60"
            }`}
          >
            my tools & languages
          </p>

          <h2
            className={`text-3xl md:text-5xl font-medium leading-snug pb-2 transition-all duration-300 ${
              darkMode
                ? "bg-gradient-to-r from-white via-white/80 to-white/60 bg-clip-text text-transparent drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                : "text-black"
            }`}
          >
            Tech Stack
          </h2>
        </motion.div>

        {/* Grid */}
        <DndProvider backend={HTML5Backend}>
          <motion.div
            className="grid grid-cols-5 gap-4 sm:gap-6 mt-8"
            key={`grid-${isInView}-${scrollDirection}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            onDragEnter={() => setIsDraggingOverGrid(true)}
            onDragLeave={() => setIsDraggingOverGrid(false)}
          >
            {techItems.map((item, index) => {
              let shift = 0;

              if (draggedItemIndex !== null && draggedItemIndex !== index) {
                if (draggedItemIndex < index) {
                  shift = -1;
                } else if (draggedItemIndex > index) {
                  shift = 1;
                }
              }

              return (
                <motion.div
                  key={`icon-${index}-${isInView}-${scrollDirection}`}
                  initial={{
                    opacity: 0,
                    y: scrollDirection === "down" ? 20 : -20,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: isInView ? 1 : 0,
                    y: isInView ? 0 : scrollDirection === "down" ? 20 : -20,
                    scale: isInView ? 1 : 0.9,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                    delay: isInView ? index * 0.03 : 0,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <DraggableTechIcon
                    style={{ cursor: "default" }}
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
                </motion.div>
              );
            })}
          </motion.div>
        </DndProvider>
      </div>

      <div
        className={`absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent ${
          darkMode ? "to-[#070918]" : "to-white"
        } pointer-events-none z-0 transition-colors duration-700`}
      ></div>
    </section>
  );
};

export default TechStack;
