import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ isOpen, onClose, project }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-[#0e0e14] text-white rounded-xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-white/60 hover:text-white text-2xl"
            >
              &times;
            </button>

            {/* Project Info */}
            <h2 className="text-2xl font-semibold mb-2">{project?.title}</h2>
            <div className="text-white/70 whitespace-pre-line text-sm leading-relaxed mb-4">
              {project?.description}
            </div>

            {/* Video (optional) */}
            {project?.video && (
              <div className="aspect-video w-full overflow-hidden rounded-md">
                <video
                  src={project.video}
                  controls
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
