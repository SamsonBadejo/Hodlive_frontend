import React, { useEffect, useState, useMemo } from "react";
import {
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaEnvelope,
  FaPhoneAlt,
  FaTimes,
  FaUser,
  FaCalendarAlt,
} from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../services/api";
import toast from "react-hot-toast";

const PAGE_SIZE = 6;

const MessagesCard = () => {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [dateSort, setDateSort] = useState("recent");
  const [customDate, setCustomDate] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/contact", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setMessages(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    })();
  }, []);

  const handleDelete = async (id, name) => {
    const toastId = toast.loading(`Deleting "${name}"...`);
    try {
      await api.delete(`/contact/${id}`);
      setMessages((prev) => prev.filter((m) => m._id !== id));
      toast.success(`"${name}" deleted successfully`, { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete the message.", { id: toastId });
    }
  };

  const filtered = useMemo(() => {
    let data = [...messages];

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter((m) =>
        [m.name, m.email, m.phone, m.message]
          .filter(Boolean)
          .some((f) => f.toLowerCase().includes(q))
      );
    }

    if (customDate) {
      data = data.filter(
        (m) => new Date(m.createdAt).toISOString().slice(0, 10) === customDate
      );
    }

    data.sort((a, b) =>
      dateSort === "recent"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

    return data;
  }, [messages, search, dateSort, customDate]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const truncate = (str, len = 100) =>
    str.length > len ? str.slice(0, len).trimEnd() + "…" : str;

  return (
    <section className="w-full h-screen flex justify-center px-4 pt-30">
      <div className="w-full max-w-4xl ml-auto lg:mr-30">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-6 justify-center">
          <div className="relative">
            <FaSearch className="absolute top-3 left-3 text-gray-500 text-xs" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-8 pr-2 py-2 border rounded-lg text-xs bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <select
            value={dateSort}
            onChange={(e) => setDateSort(e.target.value)}
            className="p-2 border rounded-lg text-xs bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="recent">Recent → Old</option>
            <option value="oldest">Old → Recent</option>
          </select>

          <input
            type="date"
            value={customDate}
            onChange={(e) => {
              setCustomDate(e.target.value);
              setPage(1);
            }}
            className="p-2 border rounded-lg text-xs bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Cards */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.08 },
            },
          }}
        >
          <AnimatePresence>
            {paginated.map((m) => (
              <motion.article
                key={m._id}
                layout
                variants={{
                  hidden: { opacity: 0, y: 40, scale: 0.95 },
                  show: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { type: "spring", stiffness: 120, damping: 18 },
                  },
                }}
                exit={{
                  opacity: 0,
                  y: 20,
                  scale: 0.9,
                  transition: { duration: 0.25 },
                }}
                onClick={() => setSelected(m)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer p-5 rounded-xl bg-gradient-to-br from-indigo-50 via-white to-pink-50 shadow-md hover:shadow-xl transition-transform border relative"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600">
                    <GoDotFill className="text-indigo-500" />
                    <span className="truncate max-w-[10rem]" title={m.name}>
                      {m.name}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setToDelete(m);
                      setShowDeleteModal(true);
                    }}
                    className="p-2 rounded-full hover:bg-red-100 text-red-600 hover:text-red-800 transition"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>

                <p className="text-sm text-gray-700 mt-3 break-words whitespace-pre-wrap">
                  {truncate(m.message, 25)}
                </p>

                <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt className="text-indigo-500" />
                    {new Date(m.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {paginated.length === 0 && (
          <div className="w-full p-6 text-center text-gray-400 border rounded-lg mt-4">
            No messages found.
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center items-center mt-8 gap-6"
          >
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1 px-4 py-2 text-xs rounded-lg border shadow-sm disabled:opacity-40 bg-indigo-50 hover:bg-indigo-100 text-indigo-600"
            >
              <FaChevronLeft size={10} /> Prev
            </button>
            <span className="text-xs text-gray-500">
              Page {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-1 px-4 py-2 text-xs rounded-lg border shadow-sm disabled:opacity-40 bg-indigo-50 hover:bg-indigo-100 text-indigo-600"
            >
              Next <FaChevronRight size={10} />
            </button>
          </motion.div>
        )}

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteModal && toDelete && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <motion.div
                initial={{ y: 60, scale: 0.9, opacity: 0 }}
                animate={{
                  y: 0,
                  scale: 1,
                  opacity: 1,
                  transition: { type: "spring", stiffness: 140, damping: 18 },
                }}
                exit={{ y: 60, scale: 0.9, opacity: 0, transition: { duration: 0.25 } }}
                className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 text-center"
              >
                <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                <p className="mb-6">
                  Do you want to delete{" "}
                  <span className="font-bold">"{toDelete.name}"</span>?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => {
                      handleDelete(toDelete._id, toDelete.name);
                      setShowDeleteModal(false);
                    }}
                    className="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-4 py-2 rounded font-semibold"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Message Detail Modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ y: 60, scale: 0.9, opacity: 0 }}
                animate={{
                  y: 0,
                  scale: 1,
                  opacity: 1,
                  transition: { type: "spring", stiffness: 140, damping: 18 },
                }}
                exit={{
                  y: 60,
                  scale: 0.9,
                  opacity: 0,
                  transition: { duration: 0.25 },
                }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg md:rounded-xl bg-gradient-to-br from-white via-indigo-50 to-pink-50 p-6 overflow-y-auto md:h-auto md:max-h-[90vh] md:mx-4 md:my-16 shadow-2xl"
              >
                <button
                  className="absolute top-3 right-3 text-xl cursor-pointer p-2 text-gray-500 hover:text-red-800"
                  onClick={() => setSelected(null)}
                >
                  <FaTimes />
                </button>

                <h3 className="text-lg font-semibold flex items-center gap-2 text-indigo-700 mb-3 break-words">
                  <FaUser /> {selected.name}
                </h3>

                <p className="text-sm text-gray-700 break-all flex items-center gap-2">
                  <FaEnvelope className="text-indigo-500" /> {selected.email}
                </p>
                <p className="text-sm text-gray-700 break-all flex items-center gap-2 mt-2">
                  <FaPhoneAlt className="text-indigo-500" /> {selected.phone}
                </p>

                <p className="text-gray-800 whitespace-pre-wrap mt-4 break-words">
                  {selected.message}
                </p>

                <p className="text-xs text-gray-500 mt-6 flex items-center gap-1">
                  <FaCalendarAlt className="text-indigo-500" />
                  {new Date(selected.createdAt).toLocaleString()}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MessagesCard;
