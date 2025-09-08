import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaTrash } from "react-icons/fa";
import { TbHandClick } from "react-icons/tb";
import Loading from "../../../components/Loading";
import toast from "react-hot-toast";
import api from "../../../services/api"; // axios instance you already have

/* ---------- flyer card ---------- */
const AdminEvents = ({ e, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="rounded-2xl px-30 overflow-hidden shadow-lg bg-white transition-all duration-300 hover:shadow-2xl relative">
      <img src={e.flyerUrl} alt={e.title} className="w-full h-64 object-cover" />
      <div className="p-4 text-[#080F59]">
        <h3 className="text-lg font-semibold mb-1">{e.title}</h3>
        <p className="text-sm text-gray-700 line-clamp-3 mb-2">{e.description}</p>
        <p className="text-xs text-gray-500">
          {new Date(e.date).toLocaleDateString()} • {e.location}
        </p>
      </div>

      {/* Delete Icon Button */}
      {onDelete && (
        <button
          onClick={() => setShowDeleteModal(true)}
          className="absolute cursor-pointer top-3 right-3 bg-red-600 p-2 rounded-full hover:bg-red-800 transition text-white"
        >
          <FaTrash />
        </button>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 text-center">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-6">
              Do you want to delete{" "}
              <span className="font-bold">"{e.title}"</span>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  onDelete();
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
          </div>
        </div>
      )}
    </div>
  );
};

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpcoming, setShowUpcoming] = useState(false);
  const [page, setPage] = useState(0);
  const eventsPerPage = 4;

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

  const handleDelete = async (id, title) => {
    const toastId = toast.loading(`Deleting "${title}"...`);

    try {
      await api.delete(`/events/${id}`);
      setEvents((prev) => prev.filter((s) => s._id !== id));
      toast.success(`"${title}" deleted successfully`, { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete the event.", { id: toastId });
    }
  };

  if (loading) {
    return <Loading title="Events Loading...." />;
  }

  return (
    <div className="px-10 py-20 pt-10 ">
      {/* Filter + Arrows */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => {
            setShowUpcoming((prev) => !prev);
            setPage(0);
          }}
          className="flex items-center gap-2 cursor-pointer px-5 py-2 bg-[#FA971E] text-white font-medium rounded-full shadow hover:bg-[#e38c1d] transition"
        >
          {showUpcoming ? "Show All Events" : "Show Upcoming Events"}
          {/* <TbHandClick className="hand_icon text-xl" /> */}
        </button>

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentEvents.map((e) => (
          <AdminEvents
            key={e._id}
            e={e}
            onDelete={() => handleDelete(e._id, e.title)}
          />
        ))}
      </div>
    </div>
  );
}
