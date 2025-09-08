import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { PiHandSwipeLeftBold } from "react-icons/pi";
import "swiper/css";
import "swiper/css/effect-cards";
import Loading from "./Loading";

/* ---------- Flyer Card ---------- */
const EventCard = ({ e }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    viewport={{ once: true }}
    className="relative w-full h-[420px] rounded-2xl overflow-hidden shadow-xl"
  >
    <img
      src={e.flyerUrl}
      alt={e.title}
      className="absolute inset-0 w-full h-full object-cover brightness-105 contrast-110"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-[#080F59]/95 via-[#080F59]/60 to-transparent" />

    <div className="absolute bottom-0 w-full px-4 py-4 text-[#FA971E]">
      <h3 className="text-lg font-extrabold drop-shadow-sm">{e.title}</h3>
      <p className="text-sm font-medium text-white leading-snug drop-shadow-sm line-clamp-3">
        {e.description}
      </p>
      <p className="text-xs font-semibold text-white mt-1 drop-shadow-sm">
        {new Date(e.date).toLocaleDateString()} • {e.location}
      </p>
    </div>

    <div className="absolute inset-0 rounded-2xl ring-2 ring-[#FA971E]/60 pointer-events-none" />
  </motion.div>
);

/* ---------- Swiper Component ---------- */
export default function EventSwiper() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showHint, setShowHint] = useState(true);
  const [userSwiped, setUserSwiped] = useState(false);

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

useEffect(() => {
  const fetchEvents = async () => {
    try {
      const res = await fetch(`${baseURL}/events`);
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


  useEffect(() => {
    if (!userSwiped) {
      // hide after 6s, then reappear after 10s if still no swipe
      const hideTimer = setTimeout(() => setShowHint(false), 6000);
      const reappearTimer = setTimeout(() => setShowHint(true), 10000);
      return () => {
        clearTimeout(hideTimer);
        clearTimeout(reappearTimer);
      };
    }
  }, [userSwiped, showHint]);

  if (loading) {
    return <Loading title="Events Loading...." />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-full px-4 py-8 box-border"
    >
      <div className="max-w-full sm:max-w-[90vw] mx-auto relative">
        <Swiper
          modules={[EffectCards]}
          effect="cards"
          grabCursor
          className="w-full"
          style={{ maxWidth: "100%", overflow: "hidden" }}
          onSlideChange={() => {
            setUserSwiped(true);
            setShowHint(false); // hide once user interacts
          }}
        >
          {events.map((e) => (
            <SwiperSlide
              key={e._id}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div className="w-full max-w-[95vw] sm:max-w-[360px]">
                <EventCard e={e} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Swipe Hint Overlay */}
        <AnimatePresence>
          {showHint && !userSwiped && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex items-center gap-3 text-white bg-[#080F59]/90 border border-[#FA971E] px-6 py-3 rounded-full shadow-2xl z-20"
            >
              <PiHandSwipeLeftBold className=" text-[#FA971E] animate-bounce" />
              <span className="text-base font-semibold tracking-wide">
                Swipe to view more flyers
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
