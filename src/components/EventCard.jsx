import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { TbHandClick } from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "./Loading";

/* ---------- flyer card ---------- */
const EventCard = ({ e }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -40 }}
    whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="rounded-2xl overflow-hidden shadow-lg bg-white"
  >
    <img src={e.flyerUrl} alt={e.title} className="w-full h-64 object-cover" />
    <div className="p-4 text-[#080F59]">
      <h3 className="text-lg font-semibold mb-1">{e.title}</h3>
      <p className="text-sm text-gray-700 line-clamp-3 mb-2">{e.description}</p>
      <p className="text-xs text-gray-500">
        {new Date(e.date).toLocaleDateString()} • {e.location}
      </p>
    </div>
  </motion.div>
);

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpcoming, setShowUpcoming] = useState(false);
  const [page, setPage] = useState(0);
  const [showHint, setShowHint] = useState(true); // 👈 to show guide only once
  const eventsPerPage = 4;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/events");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const today = new Date();
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const filteredEvents = showUpcoming
    ? sortedEvents.filter((e) => new Date(e.date) >= today)
    : sortedEvents;

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const currentEvents = filteredEvents.slice(
    page * eventsPerPage,
    (page + 1) * eventsPerPage
  );

  if (loading) {
    return <Loading title="Events Loading...." />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="px-6 py-10"
    >
      {/* Top Controls */}
      <div className="flex justify-between items-center mb-6 relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setShowUpcoming((prev) => !prev);
            setPage(0);
          }}
          className="flex items-center gap-2 cursor-pointer px-5 py-2 bg-[#FA971E] text-white font-medium rounded-full shadow hover:bg-[#e38c1d] transition"
        >
          {showUpcoming ? "Show All Events" : "Show Upcoming Events"}
          <TbHandClick className="hand_icon text-xl" />
        </motion.button>

        {/* Arrows */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setPage((p) => Math.max(0, p - 1));
              setShowHint(false);
            }}
            disabled={page === 0}
            className="p-2 rounded-full cursor-pointer bg-gray-200 hover:bg-gray-300 disabled:opacity-40 relative"
          >
            <FaArrowLeft />
            {/* 👇 animated hint */}
            {showHint && page === 0 && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-black/80 text-white px-2 py-1 rounded shadow"
              >
                Use arrows to navigate
              </motion.span>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setPage((p) => Math.min(totalPages - 1, p + 1));
              setShowHint(false);
            }}
            disabled={page >= totalPages - 1}
            className="p-2 rounded-full cursor-pointer bg-gray-200 hover:bg-gray-300 disabled:opacity-40"
          >
            <FaArrowRight />
          </motion.button>
        </div>
      </div>

      {/* Event Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="wait">
          {currentEvents.length > 0 ? (
            currentEvents.map((e) => <EventCard key={e._id} e={e} />)
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full text-center text-gray-500"
            >
              No events found.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
