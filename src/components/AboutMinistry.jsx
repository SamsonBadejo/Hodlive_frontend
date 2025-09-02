import React from "react";
import { FiCompass, FiTarget, FiHeart, FiClock } from "react-icons/fi";
import { motion } from "framer-motion";

// Simple fade-up animation
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.25, // delay based on index
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function AboutMinistry() {
  const cards = [
    {
      icon: <FiTarget size={28} />,
      title: "Our Mission",
      text: "To lead people into a growing relationship with Jesus Christ and raise leaders who will disciple nations.",
    },
    {
      icon: <FiCompass size={28} />,
      title: "Our Vision",
      text: "To be a lighthouse of hope and transformation in Ogudu, Lagos – spreading the Gospel across generations and cultures.",
    },
    {
      icon: <FiHeart size={28} />,
      title: "Core Values",
      text: "Love • Holiness • Integrity • Excellence • Service. These values guide every programme and outreach of the House of David family.",
    },
    {
      icon: <FiClock size={28} />,
      title: "Service Times",
      text: "✦ Sunday Celebration – 8:00 AM\n✦ Tuesday Digging Deep – 6:30 PM\n✦ Thursday Faith Clinic – 6:30 PM",
    },
  ];

  return (
    <section className="px-4 py-28 md:px-10 lg:px-20 bg-[#030629] text-white">
      {/* Heading */}
      <motion.div
        className="max-w-3xl mx-auto text-center mb-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeUp}
        custom={0}
      >
        <p className="inline-block px-4 py-1 rounded-full text-xs tracking-widest font-semibold uppercase bg-[#FA971E] text-[#030629] shadow-md">
          About Us
        </p>
        <h2 className="mt-6 text-3xl sm:text-4xl font-extrabold leading-tight">
          RCCG <span className="text-[#FA971E]">House of David</span> – Ogudu
        </h2>
        <p className="mt-4 text-base text-white/80 max-w-xl mx-auto leading-relaxed">
          A vibrant parish of the Redeemed Christian Church of God dedicated to
          worship, the Word, and community impact.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        {cards.map(({ icon, title, text }, i) => (
          <motion.article
            key={title}
            variants={fadeUp}
            custom={i + 1} // start delay after heading
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="flex flex-col bg-[#080F59] rounded-2xl shadow-lg p-6 
                       hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#FA971E] text-[#030629] mb-5 shadow-md">
              {icon}
            </div>
            <h3 className="text-lg font-bold mb-3">{title}</h3>
            <p className="text-sm whitespace-pre-line leading-relaxed text-white/90">
              {text}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
