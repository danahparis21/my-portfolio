import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useScrollDirection } from "../hooks/useScrollDirection";
import emailjs from "@emailjs/browser";

import { useTheme } from "../context/ThemeContext";

const Contacts = () => {
  const { darkMode } = useTheme();

  const formRef = useRef();
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const scrollDirection = useScrollDirection();
  const sectionRef = useRef();
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  const [loading, setLoading] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("micadanah21@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const sendEmail = (e) => {
    e.preventDefault();

    const form = formRef.current;
    if (!form) {
      console.error("Form reference is missing");
      return;
    }

    const emailValue = form.email.value.trim();

    // Prevent duplicate sends
    if (loading) return;
    setLoading(true);

    // Basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      alert("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    // 🛡️ Honeypot check
    if (form.honeypot.value) {
      console.warn("Spam detected from honeypot.");
      setLoading(false);
      return;
    }

    // Send form
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setSent(true);
          setLoading(false);
          setTimeout(() => setSent(false), 3000);
          form.reset();
        },
        (error) => {
          console.error("FAILED...", error.text);
          alert("Oops! Something went wrong. Please try again later.");
          setLoading(false);
        }
      );
  };

  return (
    <section
      ref={sectionRef}
      id="contacts"
      className="relative w-full bg-transparent text-white px-6 pt-24 pb-20"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-5 mix-blend-overlay pointer-events-none -z-30" />
      <div className="absolute inset-0 bg-holo bg-[length:300%_300%] opacity-20 blur-xl mix-blend-soft-light pointer-events-none -z-20" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={`p-8 rounded-xl transition-all duration-300 relative w-full max-w-6xl mx-auto
    shadow-[0_6px_20px_-6px_rgba(168,85,247,0.3)]
    hover:shadow-[0_18px_30px_-10px_rgba(168,85,247,0.75)]
    hover:-translate-y-2
    ${darkMode ? "bg-[#070918]" : "bg-white"}
  `}
      >
        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: scrollDirection === "up" ? -30 : 30 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: scrollDirection === "up" ? -30 : 30 }
            }
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2
              className={`
   text-2xl sm:text-3xl md:text-4xl font-medium leading-snug pb-1 mb-3 transition-colors duration-300
    ${
      darkMode
        ? "bg-gradient-to-r from-white via-white/80 to-white/60 bg-clip-text text-transparent drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
        : "text-black"
    }
  `}
            >
              Contact Me
            </h2>

            <p
              className={`italic text-sm sm:text-base pb-6 sm:pb-8  text-medium  transition-colors duration-300 ${
                darkMode ? "text-white/60" : "text-neutral-600"
              }`}
            >
              Fill out the form & we will get back to you as soon as possible.
            </p>
          </motion.div>

          <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
            {/* Honeypot Field – Hidden from users */}
            <input
              type="text"
              name="honeypot"
              className="hidden"
              autoComplete="off"
              tabIndex="-1"
            />

            {/* Name */}
            <div>
              <label
                className={`block text-sm mb-1 ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                Name
              </label>
              <input
                type="text"
                name="from_name"
                required
                className={`
        w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#35174a] 
        transition-colors duration-300
        ${
          darkMode
            ? "bg-[#15161d] border-white/10 text-white placeholder-white/50"
            : "bg-[#f5f3ff] border-black/10 text-black placeholder-black/40"
        }
      `}
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div>
              <label
                className={`block text-sm mb-1 ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className={`
        w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#35174a] 
        transition-colors duration-300
        ${
          darkMode
            ? "bg-[#15161d] border-white/10 text-white placeholder-white/50"
            : "bg-[#f5f3ff] border-black/10 text-black placeholder-black/40"
        }
      `}
                placeholder="you@example.com"
              />
            </div>

            {/* Message */}
            <div>
              <label
                className={`block text-sm mb-1 ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                Message
              </label>
              <textarea
                name="message"
                rows="5"
                required
                className={`
        w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#35174a] 
        transition-colors duration-300
        ${
          darkMode
            ? "bg-[#15161d] border-white/10 text-white placeholder-white/50"
            : "bg-[#f5f3ff] border-black/10 text-black placeholder-black/40"
        }
      `}
                placeholder="Type your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`flex items-center justify-center gap-2 bg-[#35174a] hover:bg-[#4a1d67] text-white py-2 px-6 rounded-md transition 
    ${loading ? "opacity-60 cursor-not-allowed" : ""}
  `}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Sending...
                </>
              ) : sent ? (
                "Message Sent!"
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contacts;
