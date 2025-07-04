import React from 'react';
import GlowCircles from './GlowCircles';

const techIcons = [
  { icon: "devicon-java-plain", label: "Java" },
  { icon: "devicon-python-plain", label: "Python" },
  { icon: "devicon-cplusplus-plain", label: "C++" },
  { icon: "devicon-react-original", label: "ReactJS" },
  { icon: "devicon-javascript-plain", label: "JavaScript" },
  { icon: "devicon-mysql-plain", label: "MySQL" },
  { icon: "devicon-php-plain", label: "PHP" },
  { icon: "devicon-html5-plain", label: "HTML5" },
  { icon: "devicon-css3-plain", label: "CSS3" },
  { icon: "devicon-tailwindcss-plain", label: "Tailwind CSS" },
];

const TechStack = () => {
  return (
    <section className="relative w-full min-h-[70vh] overflow-hidden z-10 text-white px-6 pt-6 pb-12">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#070918] -z-40" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-5 mix-blend-overlay pointer-events-none -z-30" />
      <div className="absolute inset-0 bg-holo bg-[length:300%_300%] opacity-20 blur-xl mix-blend-soft-light pointer-events-none -z-20" />

      {/* Glowing circles */}
      <GlowCircles />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center space-y-10">
        {/* Section Title */}
        <div>
          <p className="uppercase tracking-widest text-sm text-white/60 mb-2">my tools & languages</p>
          <h2 className="text-4xl md:text-5xl font-bold animate-fadeInUp">Tech Stack</h2>
        </div>

        {/* Icon Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 mt-8">
          {techIcons.map(({ icon, label }, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-6xl p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg hover:scale-105 transition-all duration-300"
            >
              <i className={icon}></i>
              <p className="mt-3 text-sm text-white/60 uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
