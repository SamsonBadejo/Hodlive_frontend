import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiZoomIn, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import GalleryData from "../GalleryData.js";

export default function PhotographyGallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const scrollRefs = useRef([]);

  // Animation for each image
  const fadeZoom = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0,
        duration: 0.5,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <div className="min-h-screen bg-black p-8 mt-20">
      {/* Main Title */}
      <motion.h1
        className="text-5xl font-extrabold text-white text-center mb-16 drop-shadow-lg tracking-wide"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Gallery Collection
      </motion.h1>

      {/* Loop through each gallery section */}
      {GalleryData.map((gallery, gIndex) => {
        const scroll = (direction) => {
          const ref = scrollRefs.current[gIndex];
          if (ref) {
            ref.scrollBy({
              left: direction === "left" ? -300 : 300,
              behavior: "smooth",
            });
          }
        };

        return (
          <motion.div
            key={gallery.id}
            className="mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: gIndex * 0.2, duration: 0.6 }}
          >
            {/* Section Title */}
            <h2 className="text-3xl font-semibold text-white mb-6 drop-shadow-md border-l-4 border-white pl-3">
              {gallery.title}
            </h2>

            {/* Carousel Container */}
            <div className="relative">
              {/* Left Arrow */}
              <button
                onClick={() => scroll("left")}
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 p-2 rounded-full text-white hover:bg-white/40"
              >
                <FiChevronLeft size={24} />
              </button>

              {/* Scrollable Row */}
              <div
                ref={(el) => (scrollRefs.current[gIndex] = el)}
                className="flex gap-4 overflow-x-auto scroll-smooth hide-scrollbar py-2"
              >
                {gallery.images.map((img, index) => (
                  <motion.div
                    key={index}
                    className="relative min-w-[250px] h-60 overflow-hidden rounded-xl shadow-lg cursor-pointer group"
                    whileHover={{ scale: 1.03 }}
                    onClick={() => setSelectedImage(img)}
                    custom={index}
                    variants={fadeZoom}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                  >
                    {/* Image */}
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover transition duration-300 group-hover:brightness-75"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 bg-black/40">
                      <FiZoomIn className="text-white text-3xl" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={() => scroll("right")}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 p-2 rounded-full text-white hover:bg-white/40"
              >
                <FiChevronRight size={24} />
              </button>
            </div>
          </motion.div>
        );
      })}

      {/* Full image modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              alt=""
              className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl border-4 border-white"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
