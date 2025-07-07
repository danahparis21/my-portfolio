"use client";

import React from 'react';

function throttleRAF(func) {
  let isRunning = false;
  return (...args) => {
    if (!isRunning) {
      isRunning = true;
      requestAnimationFrame(() => {
        func(...args);
        isRunning = false;
      });
    }
  };
}

export const Parallax = ({ className = "", children }) => {
  const [rotate, setRotate] = React.useState({ x: 0, y: 0 });
  const cardRef = React.useRef(null);

  const onMouseMove = React.useMemo(
    () =>
      throttleRAF((e) => {
        if (!cardRef.current) return;
        
        const box = cardRef.current.getBoundingClientRect();
        const x = e.clientX - box.left;
        const y = e.clientY - box.top;
        const centerX = box.width / 2;
        const centerY = box.height / 2;
        
        // Smoother easing and smaller rotation range
        const rotateX = ((y - centerY) / centerY) * 3; // Reduced from 5 to 3 degrees
        const rotateY = ((centerX - x) / centerX) * 3;

        setRotate({ 
          x: rotateX,
          y: rotateY 
        });
      }),
    []
  );

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={`relative size-full rounded-xl transition-all duration-300 ease-out will-change-transform ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
      }}
    >
      {children}
    </div>
  );
};