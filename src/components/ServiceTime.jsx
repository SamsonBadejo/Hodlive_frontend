import React, { useState, useEffect, useRef } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "scrollreveal";

import ServiceImage1 from "../assets/gallery/youth-sunday4.jpg";
import ServiceImage2 from "../assets/gallery/youth-sunday5.jpg";

const serviceData = [
  {
    title: "Main Church Service",
    description:
      "Join us every Sunday at 9:00 AM for our main worship service. Experience powerful worship, inspiring sermons, and community fellowship.",
    image: ServiceImage1,
  },
  {
    title: "Youth Fellowship",
    description:
      "Youth meet every Saturday by 4:00 PM for worship, discussion, and impactful teachings geared towards spiritual and personal growth.",
    image: ServiceImage2,
  },
  // ... rest of your services
];

const ServiceTime = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef(null);

  const next = () => setIndex((prev) => (prev + 1) % serviceData.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + serviceData.length) % serviceData.length);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [index, paused]);

  // ScrollReveal effect
  useEffect(() => {
    if (sectionRef.current) {
      ScrollReveal().reveal(sectionRef.current, {
        duration: 1200,
        distance: "60px",
        origin: "bottom",
        easing: "ease-in-out",
        reset: true, // true if you want it to reveal every scroll
        opacity: 0,
      });
    }
  }, []);

  const { title, description, image } = serviceData[index];

  return (
    <section
      ref={sectionRef}
      className="py-16 px-4 bg-gradient-to-br from-blue-50 to-white"
    >
      <div
        className="relative max-w-5xl mx-auto overflow-hidden rounded-3xl shadow-2xl lg:flex"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Image with animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index + "-image"}
            className="relative w-full lg:w-1/2 h-72 sm:h-96 lg:h-auto"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={image}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover rounded-t-3xl lg:rounded-none lg:rounded-l-3xl"
            />
            <div className="absolute inset-0 bg-black/30 lg:hidden rounded-t-3xl"></div>
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <motion.div
          key={index + "-content"}
          className="relative bg-white p-8 sm:p-10 lg:p-14 flex flex-col justify-center w-full lg:w-1/2 rounded-b-3xl lg:rounded-none lg:rounded-r-3xl"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h3
            className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-2"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Service Highlight
          </motion.h3>

          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {title}
          </motion.h2>

          <motion.p
            className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {description}
          </motion.p>

          {/* Controls */}
          <motion.div
            className="flex gap-4 mt-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <button
              onClick={prev}
              className="p-3 bg-blue-700 hover:bg-blue-900 text-white rounded-full shadow-lg transition-transform hover:scale-110"
              aria-label="Previous"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={next}
              className="p-3 bg-blue-700 hover:bg-blue-900 text-white rounded-full shadow-lg transition-transform hover:scale-110"
              aria-label="Next"
            >
              <FaChevronRight />
            </button>
          </motion.div>

          {/* Indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {serviceData.map((_, i) => (
              <span
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === index ? "bg-blue-700 scale-110" : "bg-gray-300"
                }`}
              ></span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceTime;
