import React from "react";
import { motion } from "framer-motion";

const Searchbar = ({ query, onQueryChange, sortKey, onSortChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-8"
    >
      {/* Search input */}
      <motion.input
        type="text"
        placeholder="Search sermons..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        whileFocus={{ scale: 1.03, boxShadow: "0px 0px 8px rgba(250, 151, 30, 0.5)" }}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
        className="flex-1 placeholder:text-black/90 border border-gray-300 rounded px-3 py-2 bg-white/90 outline-none focus:ring-2 focus:ring-yellow-400"
      />

      {/* Sort dropdown */}
      <motion.select
        value={sortKey}
        onChange={(e) => onSortChange(e.target.value)}
        whileHover={{ scale: 1.02 }}
        whileFocus={{ scale: 1.03, boxShadow: "0px 0px 8px rgba(250, 151, 30, 0.5)" }}
        transition={{ duration: 0.2 }}
        className="w-full md:w-44 border border-gray-300 rounded px-3 py-2 bg-white"
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="title-asc">Title A-Z</option>
        <option value="title-desc">Title Z-A</option>
        <option value="desc-asc">Description A-Z</option>
        <option value="desc-desc">Description Z-A</option>
      </motion.select>
    </motion.div>
  );
};

export default Searchbar;
