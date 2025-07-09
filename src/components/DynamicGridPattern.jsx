"use client";

import React from "react";

export const DynamicGridPattern = ({
  numOfRows = 25,
  numOfCols = 25,
  className,
}) => {
  const rows = new Array(numOfRows).fill(1);
  const cols = new Array(numOfCols).fill(1);

  return (
    <div
      style={{
        transform:
          "translate(10%,40%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)",
      }}
      className="absolute bottom-0 right-0 z-0 flex p-4"
    >
      {rows.map((_, i) => (
        <div key={`row-${i}`} className="relative h-8 w-16 border-l">
          {cols.map((_, j) => (
            <div
              key={`col-${j}`}
              className={`bg-[#08090e] hover:bg-[#a855f7]/80 relative h-8 w-16 border-r border-t border-white/5 transition-all duration-1000 hover:duration-200 shadow-[0_0_4px_#a855f7]/20 ${
                className || ""
              }`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};