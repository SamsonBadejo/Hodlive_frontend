import React from "react";
import { Link } from "react-router-dom";
import LOGO from "../assets/Rccg_logo.png";
import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerParent = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2, // stagger animation
    },
  },
};

const Footer = () => {
  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-white"
    >
      <div className="container px-6 py-5 mx-auto">
        {/* Top border animation */}
        <motion.hr
          variants={containerVariants}
          className="my-4 border-[#FA971E] md:my-5"
        />

        {/* Grid sections */}
        <motion.div
          variants={staggerParent}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {/* Quick Links */}
          <motion.div variants={containerVariants}>
            <p className="font-semibold text-[#030629]">Quick Links</p>
            <div className="flex flex-col items-start mt-5 space-y-2">
              <Link to="/" className="text-gray-900 hover:underline">
                Home
              </Link>
              <Link to="/about" className="text-gray-900 hover:underline">
                About Us
              </Link>
              {/* <Link to="/ministries" className="text-gray-900 hover:underline">
                Ministries
              </Link> */}
              <Link to="/sermons" className="text-gray-900 hover:underline">
                Sermons
              </Link>
            </div>
          </motion.div>

          {/* Give & Support */}
          <motion.div variants={containerVariants}>
            <p className="font-semibold text-[#030629]">Give & Support</p>
            <div className="flex flex-col items-start mt-5 space-y-2">
              <Link to="/tithes" className="text-gray-900 hover:underline">
                Pay Tithes
              </Link>
              <Link to="/tithes" className="text-gray-900 hover:underline">
                Donate
              </Link>
            </div>
          </motion.div>

          {/* Media */}
          <motion.div variants={containerVariants}>
            <p className="font-semibold text-[#030629]">Media</p>
            <div className="flex flex-col items-start mt-5 space-y-2">
              <Link to="/gallery" className="text-gray-900 hover:underline">
                Gallery
              </Link>
              <a href="/sermons" className="text-gray-900 hover:underline">
                YouTube Sermons
              </a>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div variants={containerVariants}>
            <p className="font-semibold text-[#030629]">Contact</p>
            <div className="flex flex-col items-start mt-5 space-y-2">
              <Link to="/contact" className="text-gray-900 hover:underline">
                Contact Page
              </Link>
              <span className="text-gray-900">Phone: +234 800 123 4567</span>
              <span className="text-gray-900">
                Email: houseofdavid@rccg.org
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom border */}
        <motion.hr
          variants={containerVariants}
          className="my-4 border-[#FA971E] md:my-5"
        />

        {/* Logo & Copyright */}
        <motion.div
          variants={containerVariants}
          className="flex flex-col items-center justify-between sm:flex-row"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Link to="/" className="flex items-center gap-2">
              <img className="w-10 h-8" src={LOGO} alt="RCCG Logo" />
              <span className="text-sm font-bold text-[#030629]">
                RCCG House of David
              </span>
            </Link>
          </motion.div>

          <p className="mt-4 text-sm text-gray-500 sm:m-0">
            © {new Date().getFullYear()} RCCG House of David. All rights
            reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
