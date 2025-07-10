import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, project }) => {
  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* 🧾 Modal Content */}
        <motion.div
          className="relative z-10 bg-[#0e0e14] text-white rounded-xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide border border-white/10 shadow-xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
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
              className="text-white/60 hover:text-white text-4xl transition-transform transform hover:scale-110 p-2 rounded-bl-xl bg-[#0e0e14]"
            >
              &times;
            </button>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <motion.h2
              className="text-4xl font-bold bg-gradient-to-r from-white via-white/80 to-purple-400 bg-clip-text text-transparent mb-3"
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
              className="text-lg text-white/80 max-w-2xl mx-auto mb-8 text-center"
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {project.subtitle}
            </motion.p>
          )}

          {/* Project Details Sections */}
          <motion.div
            className="text-white/80 space-y-6 text-base leading-relaxed"
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
                      <div className="bg-white/10 border border-white/20 rounded-md p-4 text-sm text-white font-mono overflow-x-auto">
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
                              className="text-xl font-semibold text-white pt-6 pb-2 border-b border-white/10"
                            >
                              {line.replace("## ", "")}
                            </h3>
                          );
                        } else if (line !== "") {
                          items.push(
                            <p
                              key={`p-${i}`}
                              className="whitespace-pre-line mb-4"
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
    </AnimatePresence>,
    document.getElementById("modal-root")
  );
};

export default Modal;
