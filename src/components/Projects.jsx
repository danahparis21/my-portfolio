import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect, useRef } from "react";
import { useInView, motion } from "framer-motion";
import { useScrollDirection } from "../hooks/useScrollDirection";

import { FaGithub } from "react-icons/fa";
import { HiOutlineArrowRight } from "react-icons/hi";

import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";
import { Parallax } from "../components/Parallax";
import Modal from "../components/Modal";
import andoksProject from "../data/andoks";
import login from "../data/login";
import serenityCove from "../data/serenityCove";
import attendanceQr from "../data/attendanceQr";
import myCalendar from "../data/myCalendar";
import { useTheme } from "../context/ThemeContext";

const projects = [andoksProject, login, serenityCove, attendanceQr, myCalendar];

const Projects = () => {
  const { darkMode } = useTheme();

  const sectionRef = useRef();
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const scrollDirection = useScrollDirection();

  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const hoverTimeout = useRef(null);

  const [isTouchOrDragActive, setIsTouchOrDragActive] = useState(false);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const setCoverflowDepth = (depthValue) => {
    if (swiperRef.current && !swiperRef.current.destroyed) {
      swiperRef.current.params.coverflowEffect.depth = depthValue;
      swiperRef.current.params.coverflowEffect.modifier =
        depthValue === 300 ? 3 : 2.5;
      swiperRef.current.update();
      // swiperRef.current.setTranslate();
    }
  };

  const handleMouseEnter = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }

    if (!isTouchOrDragActive) {
      hoverTimeout.current = setTimeout(() => {
        setCoverflowDepth(300);
      }, 100);
    }
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }

    if (!isTouchOrDragActive) {
      setCoverflowDepth(300);
    }
  };

  // Handlers for touch/drag interactions
  const handleTouchStart = () => {
    setIsTouchOrDragActive(true);

    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.stop();
    }

    setCoverflowDepth(300);
  };

  const handleTouchEnd = () => {
    setIsTouchOrDragActive(false);

    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.start();
    }

    setTimeout(() => {
      if (!isTouchOrDragActive) {
        setCoverflowDepth(200);
      }
    }, 300);
  };

  const handleAutoplayStart = () => {
    if (!isTouchOrDragActive) {
      setCoverflowDepth(120);
    }
  };

  useEffect(() => {
    return () => {
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[90vh] overflow-hidden z-10 text-white px-6 pt-6 pb-12"
    >
      <div
        className={`absolute top-0 left-0 w-full h-24 bg-gradient-to-t from-transparent ${
          darkMode ? "to-[#070918]" : "to-white"
        } pointer-events-none z-0 transition-colors duration-700`}
      ></div>

      {/* Shooting Star with Saturated Glow */}
      <div className="absolute top-[5vh] left-1/2 -translate-x-1/2 z-[-10] scale-[2.5] origin-center pointer-events-none animate-shooting">
        {/* Core */}
        <div className="absolute w-8 h-8 rounded-full bg-white blur-[30px] animate-slow-explode" />
        <div
          className="absolute w-6 h-6 rounded-full bg-[#f993fe] blur-[20px] animate-slow-explode"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute w-4 h-4 rounded-full bg-white blur-[5px] animate-slow-explode"
          style={{ animationDelay: "3s" }}
        />

        {/* Tail Glow */}
        <div className="absolute top-[5px] left-[10px] w-[600px] h-[30px] -rotate-[30deg] animate-slow-flash">
          <div className="w-full h-full bg-gradient-to-r from-[#f993fe] via-[#470063] to-transparent blur-[25px] rounded-full" />
        </div>

        {/* Stardust */}
        <div className="absolute top-[25px] left-[120px] w-[350px] h-[3px] -rotate-[30deg]">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-slow-dance"
              style={{
                left: `${i * 45}px`,
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
                backgroundColor: i % 2 ? "#f993fe" : "white",
                animationDelay: `${i * 2}s`,
                filter: "blur(1px)",
              }}
            />
          ))}
        </div>

        {/* Aura */}
        <div className="absolute top-[-25px] left-[-25px] w-[80px] h-[80px] rounded-full bg-[#f993fe]/30 blur-[30px] animate-slow-expand" />
      </div>

      {/* Background layers */}

      {/* Header */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: scrollDirection === "up" ? -30 : 30 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: scrollDirection === "up" ? -30 : 30 }
          }
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8 sm:mb-10"
        >
          <p
            className={`uppercase tracking-widest text-xs sm:text-sm mb-2 transition-colors duration-300 ${
              darkMode ? "text-white/60" : "text-black/50"
            }`}
          >
            things I've built
          </p>

          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-medium leading-snug transition-all duration-300 ${
              darkMode
                ? "bg-gradient-to-r from-white via-white/80 to-white/60 bg-clip-text text-transparent drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                : "text-black"
            }`}
          >
            My Projects
          </h2>
        </motion.div>

        {/* Swiper Carousel */}

        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          loop={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onSliderMove={handleTouchStart}
          onTransitionEnd={handleTouchEnd}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,

            depth: 20,
            modifier: 2.5,
            slideShadows: false,
          }}
          modules={[EffectCoverflow, Autoplay]}
          className="w-full max-w-[95vw] py-8 transition-all duration-700"
        >
          {projects.map((project, index) => (
            <SwiperSlide
              key={index}
              className={`!w-[320px] md:!w-[400px] px-2 !h-[520px] transition-transform duration-500 ${
                index === activeIndex
                  ? "scale-95 z-10"
                  : "scale-[1.08] z-20 opacity-100"
              }`}
            >
              <Parallax
                className={`relative group rounded-xl p-6 transition flex flex-col justify-between h-[480px] md:h-[520px] backdrop-blur-md border
    ${
      darkMode
        ? "bg-white/5 border-white/10 hover:border-white/20 text-white"
        : "bg-gray-200/40 border-black/10 hover:border-black/30 text-black"
    }
  `}
              >
                {index === activeIndex && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                    <div className="absolute inset-0 w-full h-full [transform:skewX(-20deg)_translateX(-100%)] animate-[shimmer_1.2s_ease-out_300ms_forwards]">
                      <div className="w-1/5 h-full bg-[#a8a8a8]/30 blur-[30px]" />
                    </div>
                  </div>
                )}
                {/* 🖼 Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="rounded-lg mb-4 object-cover h-52 w-full z-10 relative"
                />
                {/* Title */}
                <h3 className="text-lg sm:text-xl font-semibold mb-2 z-10 relative">
                  {project.title}
                </h3>

                {/* Short Description */}
                <p
                  className={`text-sm mb-4 z-10 relative transition-colors duration-300 ${
                    darkMode ? "text-white/70" : "text-black/70"
                  }`}
                >
                  {project.shortDescription}
                </p>

                {/* Buttons */}
                <div className="mt-auto flex flex-wrap sm:flex-nowrap gap-2 sm:gap-3 z-10 relative">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-300 border bg-white/10
                      ${
                        darkMode
                          ? "text-white border-white/10 hover:border-purple-500"
                          : "text-black border-black/20 hover:border-purple-500"
                      }
                    `}
                  >
                    <span className="flex items-center gap-2">
                      <FaGithub className="text-lg" /> {/* GitHub Icon */}
                      GitHub
                    </span>
                  </a>
                  <a
                    onClick={() => openModal(project)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-300 border bg-white/10
                      ${
                        darkMode
                          ? "text-white border-white/10 hover:border-purple-500"
                          : "text-black border-black/20 hover:border-purple-500"
                      }
                    `}
                  >
                    <span className="flex items-center gap-2">
                      Read More
                      <HiOutlineArrowRight className="text-lg" />{" "}
                      {/* Read More Icon */}
                    </span>
                  </a>
                </div>
              </Parallax>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        project={selectedProject}
        darkMode={darkMode}
      />
    </section>
  );
};

export default Projects;
