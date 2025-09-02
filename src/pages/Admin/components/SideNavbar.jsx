// SideNavbar.jsx
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IoIosSettings } from "react-icons/io";
import { FaUsers, FaRecordVinyl } from "react-icons/fa";
import { BsCreditCard2Front } from "react-icons/bs";
import { BiChurch } from "react-icons/bi";
import { FiMenu, FiLogOut } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { to: "add-sermon", icon: IoIosSettings, tip: "Add Sermon" },
  { to: "add-event", icon: FaUsers, tip: "Add Event" },
  { to: "messages", icon: BsCreditCard2Front, tip: "Messages" },
  { to: "all-sermons", icon: FaRecordVinyl, tip: "All Sermons" },
  { to: "all-events", icon: BiChurch, tip: "All Events" },
];

export default function SideNavbar({ onLogout }) {
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggle = () => setOpen((o) => !o);

  return (
    <>
      {/* Toggle Button (Mobile) */}
      {!isDesktop && (
        <button
          onClick={toggle}
          className="fixed bottom-4 left-4 z-50 rounded-xl bg-indigo-600 p-3 text-white shadow-lg"
        >
          <FiMenu className="h-6 w-6" />
        </button>
      )}

      {/* Backdrop Overlay */}
      <AnimatePresence>
        {open && !isDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={toggle}
            className="fixed inset-0 z-40 bg-black"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: open || isDesktop ? 0 : -250 }}
        transition={{ type: "spring", stiffness: 100, damping: 18 }}
        className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col justify-between 
                   bg-white/90 backdrop-blur-md shadow-2xl border-r border-gray-200"
      >
        {/* Brand */}
        <div className="flex h-16 items-center justify-center border-b bg-indigo-600">
          <span className="text-lg font-bold text-white tracking-wide">Dashboard</span>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 space-y-3 overflow-y-auto px-3 py-6">
          {navItems.map(({ to, icon: Icon, tip }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => !isDesktop && setOpen(false)}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium
                transition-all duration-300 ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700 shadow-sm"
                    : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
                }`
              }
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="text-lg"
              >
                <Icon />
              </motion.div>
              <span>{tip}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={onLogout}
          className="flex items-center gap-3 border-t px-4 py-4 text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all"
        >
          <FiLogOut className="text-lg" />
          Logout
        </motion.button>
      </motion.aside>
    </>
  );
}
