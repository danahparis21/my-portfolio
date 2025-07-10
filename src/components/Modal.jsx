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
        {/* 🌌 Ambient Gradient Spots */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-gradient-to-br from-purple-600 to-transparent opacity-30 rounded-full blur-3xl" />
          <div className="absolute top-[-80px] right-[-80px] w-[250px] h-[250px] bg-gradient-to-bl from-purple-500 to-transparent opacity-25 rounded-full blur-3xl" />
          <div className="absolute bottom-[-100px] left-[-80px] w-[250px] h-[250px] bg-gradient-to-tr from-purple-500 to-transparent opacity-25 rounded-full blur-3xl" />
          <div className="absolute bottom-[-120px] right-[-100px] w-[300px] h-[300px] bg-gradient-to-tl from-purple-700 to-transparent opacity-30 rounded-full blur-3xl" />
        </div>

        {/* 🧾 Modal Content */}
        <motion.div
          className="relative z-10 bg-[#0e0e14] text-white rounded-xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide border border-white/10 shadow-xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
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

                // Extract Tech Stack section and skip it from rendering in restOfLines
                if (line === "## Tech Stack" && i + 1 < lines.length) {
                  techStackContent = lines[i + 1].trim();
                  i++; // skip next line (actual content)
                  continue;
                }

                restOfLines.push(lines[i]);
              }

              return (
                <>
                  {/* ✅ Tech Stack under subtitle */}
                  {techStackContent && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-white pt-4 pb-2 border-b border-white/10">
                        Tech Stack
                      </h3>
                      <div className="bg-white/10 border border-white/20 rounded-md p-4 text-sm text-white font-mono overflow-x-auto">
                        {techStackContent}
                      </div>
                    </div>
                  )}

                  {/* ✅ Render remaining description */}
                  {restOfLines.map((line, index) => {
                    const trimmed = line.trim();

                    if (trimmed.startsWith("## ")) {
                      return (
                        <h3
                          key={index}
                          className="text-xl font-semibold text-white pt-6 pb-2 border-b border-white/10"
                        >
                          {trimmed.replace("## ", "")}
                        </h3>
                      );
                    }

                    if (trimmed === "") return null;

                    return (
                      <p key={index} className="whitespace-pre-line">
                        {line}
                      </p>
                    );
                  })}
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
