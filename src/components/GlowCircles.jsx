
import React from 'react';

const GlowCircles = () => {
    return (
      <>
        {/* Left Glow Circle */}
        <div className="absolute left-[-200px] top-1/3 w-[500px] h-[500px] rounded-full blur-[160px] opacity-90 z-0 animate-floatSlow">
          <div className="absolute inset-0 bg-gradient-to-br from-glow2 to-transparent rounded-full animate-pulseSlow" />
        </div>
  
        {/* Right Glow Circle */}
        <div className="absolute right-[-200px] top-1/2 w-[500px] h-[500px] rounded-full blur-[160px] opacity-90 z-0 animate-float">
          <div className="absolute inset-0 bg-gradient-to-tr from-glow3 to-transparent rounded-full animate-pulse" />
        </div>
      </>
    );
  };
  

export default GlowCircles;