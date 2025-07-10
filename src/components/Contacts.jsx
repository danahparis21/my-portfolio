import { useRef, useState } from 'react'; // Add this import
import { motion, useInView } from "framer-motion";
import { useScrollDirection } from "../hooks/useScrollDirection";
import emailjs from '@emailjs/browser'; // Make sure this is imported

const Contacts = () => {
  const formRef = useRef();
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const scrollDirection = useScrollDirection();
  const sectionRef = useRef();
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  const handleCopy = () => {
    navigator.clipboard.writeText("micadanah21@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    // Add error handling for EmailJS initialization
    if (!emailjs || !formRef.current) {
      console.error("EmailJS not properly initialized or form ref missing");
      return;
    }

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setSent(true);
          setTimeout(() => setSent(false), 3000);
          formRef.current.reset();
        },
        (error) => {
          console.error("FAILED...", error.text);
        }
      );
  };

  return (
    <section
      ref={sectionRef}
      id="contacts"
      className="relative w-full bg-[#070918] text-white px-6 pt-24 pb-20"
    >
      {/* Gradient Bridge */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-t from-transparent to-[#070918] pointer-events-none z-0" />

      {/* Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-5 mix-blend-overlay pointer-events-none -z-30" />
      <div className="absolute inset-0 bg-holo bg-[length:300%_300%] opacity-20 blur-xl mix-blend-soft-light pointer-events-none -z-20" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#070918] p-8 rounded-xl transition-all duration-300 relative w-full max-w-6xl mx-auto
             shadow-[0_6px_20px_-6px_rgba(168,85,247,0.3)]
             hover:shadow-[0_18px_30px_-10px_rgba(168,85,247,0.75)]
             hover:-translate-y-2"
      >
        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Heading with motion */}
          <motion.div
            initial={{ opacity: 0, y: scrollDirection === "up" ? -30 : 30 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: scrollDirection === "up" ? -30 : 30 }
            }
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-medium leading-snug pb-2 bg-gradient-to-r from-white via-white/80 to-white/60 bg-clip-text text-transparent drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] mb-8">
              Contacts
            </h2>
            <p className="text-white/60 italic text-medium">
              Fill out the form & we will get back to you as soon as possible.
            </p>
          </motion.div>

          <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                name="from_name"
                required
                className="w-full bg-[#15161d] p-3 rounded-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#35174a]"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full bg-[#15161d] p-3 rounded-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#35174a]"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Message</label>
              <textarea
                name="message"
                rows="5"
                required
                className="w-full bg-[#15161d] p-3 rounded-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#35174a]"
                placeholder="Type your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-[#35174a] hover:bg-[#4a1d67] text-white py-2 px-6 rounded-md transition"
            >
              {sent ? "Message Sent!" : "Send Message"}
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contacts;