import React from "react";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import { motion } from "framer-motion";
import bgVideo from "../assets/videos/Christian Cross Under Starry Sunset Sky With Flowing Clouds 4K Christian Worship Background Loop.mp4";

export default function HeroSection() {
  return (
    <header className="relative h-dvh md:h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        {/* Fade in + Slide up Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-3xl md:text-5xl font-bold text-white max-w-2xl leading-snug"
        >
          Experience the Power of God's Presence
        </motion.h1>

        {/* Button Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        >
          <Link
            to="/sermons"
            className="mt-8 inline-flex items-center gap-3 bg-[#FA971E] hover:bg-[#080F59] hover:text-white text-black font-semibold text-sm md:text-base px-6 py-3 rounded-full shadow-lg transition-all duration-300"
          >
            Explore Sermons
            <motion.span
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <HiArrowRight className="text-lg" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </header>
  );
}
