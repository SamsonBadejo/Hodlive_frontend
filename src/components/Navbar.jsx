import { useEffect, useRef, useState } from "react";
import LOGO from "../assets/Rccg_logo.png";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/sermons", label: "Sermons" },
  { path: "/tithes", label: "Tithes/Donate" },
  { path: "/events", label: "Events" },
  { path: "/gallery", label: "Gallery" },
  { path: "/admin/login", label: "Login" },
];

const Navbar = () => {
  const [openMenuBar, setOpenMenuBar] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => setOpenMenuBar(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuBar(false);
      }
    };
    if (openMenuBar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenuBar]);

  return (
    <header
      className={`fixed top-0 z-50 w-full px-6 py-3 shadow-md transition-all
        ${
          scrolled ? "bg-white/80 backdrop-blur-md" : "bg-white/90 lg:bg-white"
        }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={LOGO} alt="Logo" className="w-[70px]" />
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex gap-6 text-md font-medium">
          {links.map(({ path, label }) => (
            <Link
              key={label}
              to={path}
              className="relative inline-block hover:text-blue-700
                before:absolute before:bottom-0 before:left-0 before:h-[2px]
                before:w-0 before:bg-blue-700 before:transition-all duration-300
                hover:before:w-full"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Contact Button (Desktop) */}
        <div className="hidden md:block">
          <Link
            to="/contact"
            className="rounded-xl bg-blue-950 px-4 py-2 text-md text-white hover:bg-blue-800 transition"
          >
            Contact
          </Link>
        </div>

        {/* Mobile toggle button */}
        <div
          className="md:hidden flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-200/20"
          onClick={() => setOpenMenuBar((prev) => !prev)}
        >
          {openMenuBar ? (
            <IoCloseSharp className="text-2xl text-red-600" />
          ) : (
            <GiHamburgerMenu className="text-2xl" />
          )}
        </div>
      </div>

      {/* Mobile Menu (Framer Motion) */}
      <AnimatePresence>
        {openMenuBar && (
          <motion.div
            ref={menuRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed top-0 right-0 w-3/4 h-screen bg-white shadow-2xl z-40 p-8 flex flex-col"
          >
            {/* Close button inside */}
            <div className="flex justify-between items-center mb-10">
              <img src={LOGO} alt="Logo" className="w-[60px]" />
              <IoCloseSharp
                size={30}
                className="cursor-pointer text-red-600"
                onClick={() => setOpenMenuBar(false)}
              />
            </div>

            {/* Menu Links */}
            <motion.nav
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 },
                },
              }}
              className="flex flex-col gap-6 text-lg font-medium"
            >
              {links.map(({ path, label }) => (
                <motion.div
                  key={label}
                  variants={{
                    hidden: { x: 50, opacity: 0 },
                    show: { x: 0, opacity: 1 },
                  }}
                >
                  <Link
                    to={path}
                    onClick={handleLinkClick}
                    className="hover:text-blue-700 transition"
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={{
                  hidden: { y: 30, opacity: 0 },
                  show: { y: 0, opacity: 1 },
                }}
                className="mt-6"
              >
                <Link
                  to="/contact"
                  onClick={handleLinkClick}
                  className="inline-block rounded-xl bg-blue-950 px-5 py-2 text-white hover:bg-blue-800 transition"
                >
                  Contact
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
