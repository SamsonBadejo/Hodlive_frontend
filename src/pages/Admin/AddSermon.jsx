// AddSermon.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineMusicNote } from "react-icons/hi";
import { FiYoutube, FiUploadCloud } from "react-icons/fi";
import { MdTitle } from "react-icons/md";
import { TbFileDescription } from "react-icons/tb";
import useAxios from "../../services/axiosConfig.js";
import toast from "react-hot-toast";

export default function AddSermon() {
  const api = useAxios();
  const [form, setForm] = useState({
    title: "",
    description: "",
    youtubeLink: "",
    audio: null,
  });

  const submit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Saving sermon...");
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => v && fd.append(k, v));

      await api.post("/sermons", fd);
      toast.success("Sermon added!", { id: toastId });

      setForm({ title: "", description: "", youtubeLink: "", audio: null });
      e.target.reset();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Sermon not added", {
        id: toastId,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50 px-3 py-30">
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
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-indigo-600 text-white mx-auto mb-2">
            <HiOutlineMusicNote className="text-2xl" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">New Sermon</h2>
          <p className="text-sm text-gray-500">Fill in the sermon details</p>
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
            className="peer w-full rounded-lg border border-gray-300 pl-10 pr-3 pt-4 pb-2 text-sm placeholder-transparent focus:border-indigo-500 focus:ring-indigo-500"
          />
          <label className="absolute left-10 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-600">
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
            className="peer w-full h-24 rounded-lg border border-gray-300 pl-10 pr-3 pt-4 text-sm placeholder-transparent resize-none focus:border-indigo-500 focus:ring-indigo-500"
          />
          <label className="absolute left-10 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-600">
            Description
          </label>
        </div>

        {/* YouTube Link */}
        <div className="relative">
          <FiYoutube className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 text-lg" />
          <input
            type="url"
            placeholder=" "
            value={form.youtubeLink}
            onChange={(e) => setForm({ ...form, youtubeLink: e.target.value })}
            required
            className="peer w-full rounded-lg border border-gray-300 pl-10 pr-3 pt-4 pb-2 text-sm placeholder-transparent focus:border-indigo-500 focus:ring-indigo-500"
          />
          <label className="absolute left-10 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-600">
            YouTube Link
          </label>
        </div>

        {/* Audio Upload */}
        <motion.label
          whileHover={{ scale: 1.02 }}
          className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 py-6 px-3 text-center cursor-pointer hover:border-indigo-500 transition"
        >
          <FiUploadCloud className="text-3xl text-gray-400 mb-2" />
          <span className="text-xs text-gray-500">
            {form.audio ? form.audio.name : "Click to upload sermon audio"}
          </span>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setForm({ ...form, audio: e.target.files[0] })}
            className="hidden"
          />
        </motion.label>

        {/* Submit */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 py-2.5 rounded-lg text-white font-medium shadow-md hover:opacity-90 transition"
        >
          Save Sermon
        </motion.button>
      </motion.form>
    </div>
  );
}
