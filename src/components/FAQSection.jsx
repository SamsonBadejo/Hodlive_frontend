import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";
import HeroImg from "../assets/hero_img.jpg";

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  // Keep refs for smooth scrolling
  const faqRefs = useRef([]);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const scrollToFaq = (index) => {
    setOpenIndex(index); // Open it
    faqRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest", // smoother scroll than "center"
    });
  };

  const faqItems = [
    {
      id: "services",
      question: "What time are Sunday services?",
      answer:
        "Our Sunday service starts at 9:00 AM. We welcome you to join us in worship, praise, and the Word.",
    },
    {
      id: "giving",
      question: "How can I give my tithe or offering?",
      answer:
        "You can give during our services or online via our secure giving platform on the website under the 'Tithes' or 'Donate' section.",
    },
    {
      id: "location",
      question: "Where is RCCG House of David located?",
      answer:
        "69/71 Ogudu Rd, Ojota, Lagos. Visit our Contact page to view the map and directions.",
    },
    {
      id: "youth",
      question: "Do you have programs for youth and teens?",
      answer:
        "Yes! We host Youth Fellowship every Saturday at 4:00 PM and a Teens Church every Sunday at 9:00 AM.",
    },
    {
      id: "contact",
      question: "How can I reach the church for support or prayer?",
      answer:
        "You can fill out the contact form on our Contact page or call our ministry line at +234 800 123 4567.",
    },
  ];

  return (
    <section
      className="relative bg-cover bg-center min-h-screen flex items-center"
      style={{ backgroundImage: `url(${HeroImg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/90 to-gray-800/80 z-0"></div>
      <div className="relative z-10 container px-6 py-16 mx-auto">
        {/* Heading */}
        <motion.h1
          className="text-3xl font-bold text-center text-white lg:text-4xl"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Frequently Asked Questions
        </motion.h1>
        <p className="mt-4 text-center text-blue-200">
          Find answers to common questions about our church, services, and
          programs.
        </p>

        <div className="mt-12 lg:flex lg:gap-12">
          {/* Sidebar Topics */}
          <motion.div
            className="lg:w-1/4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="text-xl font-semibold text-white">FAQ Topics</h2>
            <div className="mt-4 space-y-3">
              {faqItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                    openIndex === index
                      ? "bg-blue-600 text-white"
                      : "text-blue-300 hover:text-white hover:bg-blue-600/20"
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToFaq(index)}
                >
                  {item.question.split("?")[0]}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* FAQ List */}
          <motion.div
            className="flex-1 mt-10 lg:mt-0 space-y-6"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {faqItems.map((item, index) => (
              <motion.div
                key={item.id}
                ref={(el) => (faqRefs.current[index] = el)}
                className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <button
                  className="flex items-center justify-between w-full px-6 py-4 text-left cursor-pointer focus:outline-none"
                  onClick={() => toggleQuestion(index)}
                  aria-expanded={openIndex === index} // ✅ accessibility
                >
                  <h2 className="text-lg font-medium text-white">
                    {item.question}
                  </h2>
                  <motion.span
                    initial={false}
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-blue-400"
                  >
                    {openIndex === index ? <FaMinus /> : <FaPlus />}
                  </motion.span>
                </button>

                {/* Animated Answer */}
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      key={`answer-${item.id}`} // ✅ unique key
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="px-6 pb-6 text-blue-100 leading-relaxed"
                    >
                      {item.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
