import React from "react";

const GlowCircles = () => {
  return (
    <>
      {/* Left Glow Circle */}
      <div className="absolute left-[-150px] top-1/3 w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] rounded-full blur-[120px] sm:blur-[140px] md:blur-[160px] opacity-90 z-0 animate-floatSlow">
        <div className="absolute inset-0 bg-gradient-to-br from-glow2 to-transparent rounded-full animate-pulseSlow" />
      </div>

      {/* Right Glow Circle */}
      <div className="absolute right-[-150px] top-1/2 w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] rounded-full blur-[120px] sm:blur-[140px] md:blur-[160px] opacity-90 z-0 animate-float">
        <div className="absolute inset-0 bg-gradient-to-tr from-glow3 to-transparent rounded-full animate-pulse" />
      </div>
    </>
  );
};

export default GlowCircles;
