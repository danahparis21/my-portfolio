import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useTheme } from "../context/ThemeContext";
const Modal = ({ isOpen, onClose, project, darkMode }) => {
  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className={`relative z-10 rounded-xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide border shadow-xl
            transition-colors duration-300 ${
              darkMode
                ? "bg-[#0e0e14] text-white border-white/10"
                : "bg-[#f5f3ff] text-black border-black/10"
            }`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
          {/* 🌌 Top-Only Purple Gradients (Bigger & More Visible) */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Mid Left - Soft Glow */}

            {/* Center - Biggest & Brightest */}
            <div className="absolute top-[-180px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-b from-purple-600/80 via-purple-500/40 to-transparent opacity-50 rounded-full blur-[110px]" />

            {/* Mid Right - Vibrant Pop */}
            <div className="absolute top-[-100px] right-[15%] w-[380px] h-[380px] bg-gradient-to-bl from-purple-900/90 to-transparent opacity-45 rounded-full blur-[95px]" />

            {/* Far Right - Subtle Edge */}
            <div className="absolute top-[-130px] right-[-120px] w-[420px] h-[420px] bg-gradient-to-tl from-purple-700/60 to-transparent opacity-30 rounded-full blur-[85px]" />
          </div>

          {/* Close Button */}
          <div className="sticky top-0 z-20 flex justify-end">
            <button
              onClick={onClose}
              className={`text-4xl transition-transform transform hover:scale-110 p-2 rounded-bl-xl
    ${
      darkMode
        ? "text-white/60 hover:text-white bg-[#0e0e14]"
        : "text-black/60 hover:text-black bg-[#f5f3ff]"
    }
  `}
            >
              &times;
            </button>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <motion.h2
              className={`text-4xl font-bold mb-3 ${
                darkMode
                  ? "bg-gradient-to-r from-white via-white/80 to-purple-400 bg-clip-text text-transparent"
                  : "text-black"
              }`}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {project?.title}
            </motion.h2>
          </div>

          {/* Video (optional) */}
          {project?.video && (
            <motion.div
              className="aspect-video w-full overflow-hidden rounded-lg mb-8 bg-black/40 border border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <video
                src={project.video}
                controls
                className="w-full h-full object-contain"
              />
            </motion.div>
          )}

          {/* Subtitle */}
          {project?.subtitle && (
            <motion.p
              className={`text-lg max-w-2xl mx-auto mb-8 text-center ${
                darkMode ? "text-white/80" : "text-black/70"
              }`}
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {project.subtitle}
            </motion.p>
          )}

          {/* Project Details Sections */}
          <motion.div
            className={`space-y-6 text-base leading-relaxed ${
              darkMode ? "text-white/80" : "text-black/80"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {(() => {
              const lines = project?.description?.split("\n") || [];

              let techStackContent = null;
              const restOfLines = [];

              for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();

                if (line === "## Tech Stack" && i + 1 < lines.length) {
                  techStackContent = lines[i + 1].trim();
                  i++;
                  continue;
                }

                restOfLines.push(lines[i]);
              }

              return (
                <>
                  {/* ✅ Tech Stack under subtitle */}
                  {techStackContent && (
                    <div className="mb-6">
                      <div
                        className={`rounded-md p-4 text-sm font-mono overflow-x-auto ${
                          darkMode
                            ? "bg-white/10 border border-white/20 text-white"
                            : "bg-[#ede9fe] border border-black/10 text-black"
                        }`}
                      >
                        {techStackContent}
                      </div>
                    </div>
                  )}

                  {/* ✅ Render remaining description */}
                  {(() => {
                    const items = [];
                    let listBuffer = [];

                    restOfLines.forEach((rawLine, i) => {
                      const line = rawLine.trim();

                      if (line.startsWith("- ")) {
                        listBuffer.push(
                          <li key={`li-${i}`} className="mb-1">
                            {line.slice(2)}
                          </li>
                        );
                      } else {
                        if (listBuffer.length) {
                          items.push(
                            <ul key={`ul-${i}`} className="list-disc ml-5">
                              {listBuffer}
                            </ul>
                          );
                          listBuffer = [];
                        }

                        if (line.startsWith("## ")) {
                          items.push(
                            <h3
                              key={`h3-${i}`}
                              className={`text-xl font-semibold pt-6 pb-2 border-b ${
                                darkMode
                                  ? "text-white border-white/10"
                                  : "text-black border-black/10"
                              }`}
                            >
                              {line.replace("## ", "")}
                            </h3>
                          );
                        } else if (line !== "") {
                          items.push(
                            <p
                              key={`p-${i}`}
                              className={`whitespace-pre-line mb-4 ${
                                darkMode ? "text-white/80" : "text-black/80"
                              }`}
                            >
                              {line}
                            </p>
                          );
                        }
                      }
                    });

                    if (listBuffer.length) {
                      items.push(
                        <ul key="ul-end" className="list-disc ml-5">
                          {listBuffer}
                        </ul>
                      );
                    }

                    return items;
                  })()}
                </>
              );
            })()}
          </motion.div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("modal-root")
  );
};

export default Modal;
