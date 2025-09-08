import React from "react";
import { motion } from "framer-motion";

export default function Loading({ title }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6">
      <motion.h2
        className="text-3xl font-bold   text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>

      <div className="flex gap-4 flex-wrap justify-center">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="bg-gray-300 dark:bg-gray-700 rounded-lg w-40 h-28 relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: "linear",
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
