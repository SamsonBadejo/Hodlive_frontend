// AddEvent.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { MdTitle, MdLocationOn, MdDateRange } from "react-icons/md";
import { TbFileDescription } from "react-icons/tb";
import { FiUploadCloud } from "react-icons/fi";
import useAxios from "../../services/axiosConfig.js";
import toast from "react-hot-toast";

export default function AddEvent() {
  const api = useAxios();
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    flyer: null,
  });

  const [flyerPreview, setFlyerPreview] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Saving event...");
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => v && fd.append(k, v));

      await api.post("/events", fd);
      toast.success("Event added!", { id: toastId });

      setForm({ title: "", description: "", date: "", location: "", flyer: null });
      setFlyerPreview(null);
      e.target.reset();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Event not added", {
        id: toastId,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-50 via-white to-indigo-50 px-3 py-30">
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 space-y-5 border border-gray-100"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-pink-600 text-white mx-auto mb-2">
            <MdDateRange className="text-2xl" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">New Event</h2>
          <p className="text-sm text-gray-500">Fill in the event details</p>
        </motion.div>

        {/* Title */}
        <div className="relative">
          <MdTitle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder=" "
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="peer w-full rounded-lg border border-gray-300 pl-10 pr-3 pt-4 pb-2 text-sm placeholder-transparent focus:border-pink-500 focus:ring-pink-500"
          />
          <label className="absolute left-10 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-pink-600">
            Title
          </label>
        </div>

        {/* Description */}
        <div className="relative">
          <TbFileDescription className="absolute left-3 top-3 text-gray-400 text-lg" />
          <textarea
            placeholder=" "
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            className="peer w-full h-24 rounded-lg border border-gray-300 pl-10 pr-3 pt-4 text-sm placeholder-transparent resize-none focus:border-pink-500 focus:ring-pink-500"
          />
          <label className="absolute left-10 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-pink-600">
            Description
          </label>
        </div>

        {/* Date */}
        <div className="relative">
          <MdDateRange className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
            className="peer w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2 text-sm focus:border-pink-500 focus:ring-pink-500"
          />
        </div>

        {/* Location */}
        <div className="relative">
          <MdLocationOn className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder=" "
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
            className="peer w-full rounded-lg border border-gray-300 pl-10 pr-3 pt-4 pb-2 text-sm placeholder-transparent focus:border-pink-500 focus:ring-pink-500"
          />
          <label className="absolute left-10 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-pink-600">
            Location
          </label>
        </div>

        {/* Flyer Upload + Preview */}
        <motion.label
          whileHover={{ scale: 1.02 }}
          className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 py-6 px-3 text-center cursor-pointer hover:border-pink-500 transition relative"
        >
          <FiUploadCloud className="text-3xl text-gray-400 mb-2" />
          <span className="text-xs text-gray-500">
            {form.flyer ? form.flyer.name : "Click to upload event flyer"}
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setForm({ ...form, flyer: file });
                setFlyerPreview(URL.createObjectURL(file));
              }
            }}
            className="hidden"
          />
        </motion.label>

        {flyerPreview && (
          <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
            <img
              src={flyerPreview}
              alt="Flyer Preview"
              className="w-full h-40 object-cover"
            />
          </div>
        )}

        {/* Submit */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          type="submit"
          className="w-full bg-gradient-to-r from-pink-600 to-indigo-600 py-2.5 rounded-lg text-white font-medium shadow-md hover:opacity-90 transition"
        >
          Save Event
        </motion.button>
      </motion.form>
    </div>
  );
}
