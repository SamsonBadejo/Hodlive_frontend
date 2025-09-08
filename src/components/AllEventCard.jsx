import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { TbHandClick } from "react-icons/tb";
import { motion } from "framer-motion";
import Loading from "./Loading";

/* ---------- flyer card with motion ---------- */
const AllEventCard = ({ e, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, backgroundColor: "#f8fafc" }}
    animate={{
      opacity: 1,
      y: 0,
      backgroundColor: ["#f8fafc", "#fff7ed", "#ffffff"], // soft color transition
    }}
    transition={{
      duration: 0.6,
      delay: index * 0.1,
      backgroundColor: {
        duration: 1.2,
        repeat: Infinity,
        repeatType: "reverse",
      },
    }}
    whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.15)" }}
    className="rounded-2xl overflow-hidden shadow-lg bg-white transition-all duration-300"
  >
    <motion.img
      src={e.flyerUrl}
      alt={e.title}
      className="w-full h-64 object-cover"
      initial={{ scale: 1.1 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.1 }}
    />
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
  const eventsPerPage = 8;

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
    <div className="px-6 py-10">
      {/* Button */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => {
            setShowUpcoming((prev) => !prev);
            setPage(0);
          }}
          className="flex items-center gap-2 cursor-pointer px-5 py-2 bg-[#FA971E] text-white font-medium rounded-full shadow hover:bg-[#e38c1d] transition"
        >
          {showUpcoming ? "Show All Events" : "Show Upcoming Events"}
          <TbHandClick className="hand_icon text-xl" />
        </button>

        {/* Arrows */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="p-2 rounded-full cursor-pointer bg-gray-200 hover:bg-gray-300 disabled:opacity-40"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="p-2 rounded-full cursor-pointer bg-gray-200 hover:bg-gray-300 disabled:opacity-40"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Event Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {currentEvents.map((e, i) => (
          <AllEventCard key={e._id} e={e} index={i} />
        ))}
      </motion.div>
    </div>
  );
}
