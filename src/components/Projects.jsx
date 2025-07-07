import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";

import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay"; // optional, autoplay works without it
import { Parallax } from "../components/Parallax";
import Modal from "../components/Modal"; // adjust path as needed

const projects = [
  {
    title: "Andok’s Food Ordering System",
    shortDescription: "A full-featured desktop app for ordering and delivery with real-time tracking, built for Andok’s.",
    description: `
A full-featured desktop food ordering and delivery system built using JavaFX, tailored for Andok’s, a local restaurant business. This system supports admin, rider, and customer roles with dashboards, real-time order tracking, email notifications, analytics, and more.

Key Features:
- Role-based login (Admin, Rider, Customer)
- Real-time order tracking & notifications
- Cash, Card, or GCash payment options
- Admin analytics dashboard + PDF reports
- MySQL backend + secure SHA-256 hashing
- Audit trail, events, triggers, stored procedures

Tech Stack:
JavaFX · JavaMail · iText PDF · JDBC · MySQL · SHA-256

Developed by Danah Paris (BSIT – BatStateU, ARASOF Nasugbu)
    `,
    image: "/images/andoks.jpg",
    github: "https://github.com/danahparis21/FoodDeliverySystem",
    video: "/videos/andoks-demo.mp4" // optional if you have it
  },
  { title: "Project Two", description: "Consectetur adipiscing elit." },
  { title: "Project Three", description: "Sed do eiusmod tempor." },
  { title: "Project Four", description: "Incididunt ut labore et dolore." },
  {
    title: "Project Five",
    description: "Another one to make it loop both ways.",
  },
];



const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);

const openModal = (project) => {
  setSelectedProject(project);
  setIsModalOpen(true);
};

const closeModal = () => {
  setIsModalOpen(false);
  setSelectedProject(null);
};

  return (
    <section className="relative w-full min-h-[90vh] overflow-hidden z-10 text-white px-6 pt-6 pb-12">
      {/* Gradient Bridge from TechStack */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-t from-transparent to-[#070918] pointer-events-none z-0" />

      {/* Background layers */}
      <div className="absolute inset-0 bg-[#070918] -z-40" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-5 mix-blend-overlay pointer-events-none -z-30" />
      <div className="absolute inset-0 bg-holo bg-[length:300%_300%] opacity-20 blur-xl mix-blend-soft-light pointer-events-none -z-20" />

      {/* Header */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center space-y-10">
        <div>
          <p className="uppercase tracking-widest text-sm text-white/60 mb-2">
            things I’ve built
          </p>
          <h2 className="text-4xl md:text-5xl font-medium leading-snug pb-2 animate-fadeInUp bg-gradient-to-r from-white via-white/80 to-white/60 bg-clip-text text-transparent drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
            My Projects
          </h2>
        </div>

        {/* 💡 Swiper Carousel */}
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          loop={true}
          //   autoplay={{
          //     delay: 3500,
          //     disableOnInteraction: false,
          //   }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 120,
            modifier: 2.5,
            slideShadows: false,
          }}
          modules={[EffectCoverflow, Autoplay]}
          className="w-full max-w-5xl py-8"
        >
          {projects.map((project, index) => (
            <SwiperSlide
              key={index}
              className="!w-[320px] md:!w-[400px] px-2 !h-[520px]"
            >
              <Parallax className="bg-white/5 border border-white/10 rounded-xl backdrop-blur-md p-6 hover:border-white/20 transition flex flex-col justify-between h-[480px] md:h-[480px]">
                {/* Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="rounded-lg mb-4 object-cover h-52 w-full"
                />

                {/* Title */}
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>

                {/* Description */}
                <p className="text-white/70 text-sm mb-4">
                  {project.shortDescription}
                </p>

                {/* Buttons */}
                <div className="mt-auto flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 text-sm bg-white/10 hover:bg-white/20 border border-white/10 rounded-md transition"
                  >
                    GitHub
                  </a>
                  <a
                    onClick={() => openModal(project)}
                    className="cursor-pointer px-3 py-1 text-sm bg-white/10 hover:bg-white/20 border border-white/10 rounded-md transition"
                  >
                    Read More
                  </a>
                </div>
              </Parallax>
            </SwiperSlide>
          ))}
        </Swiper>
        <Modal isOpen={isModalOpen} onClose={closeModal} project={selectedProject} />

      </div>
    </section>
  );
};

export default Projects;
