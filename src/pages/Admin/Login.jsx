import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../services/auth";
import { AuthCtx } from "../../context/AuthContext";
import HeroImg from "../../assets/hero_img.jpg";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FiMail, FiLock } from "react-icons/fi";
import { FaChurch } from "react-icons/fa";

export default function Login() {
  const nav = useNavigate();
  const { signIn } = useContext(AuthCtx);
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Signing in...");

    try {
      const { data } = await loginAdmin(form);
      signIn(data.token);
      toast.success("Login successful!", { id: toastId });
      nav("/admin/add-sermon", { replace: true });
    } catch (error) {
      toast.error("Wrong Email or Password", { id: toastId });
      setErr(error?.response?.data?.message || "Invalid credentials");
    }
  };

  /* ---------- Animations ---------- */
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      {/* Background Image */}
      <img
        src={HeroImg}
        alt="Church Background"
        className="absolute inset-0 w-full h-full object-cover -z-50"
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 -z-40"></div>

      {/* Login Card */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 space-y-6"
      >
        {/* Logo + Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="flex flex-col items-center"
        >
          <div className="bg-blue-950 text-white p-4 rounded-full mb-4 shadow-md">
            <FaChurch size={32} />
          </div>
          <h2 className="text-3xl font-bold text-blue-950">Admin Login</h2>
          <p className="text-sm text-gray-600">Welcome back, servant of God ✝️</p>
        </motion.div>

        {/* Email Field */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="relative"
        >
          <FiMail className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            autoComplete="username"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full pl-10 pr-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700"
          />
        </motion.div>

        {/* Password Field */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="relative"
        >
          <FiLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="w-full pl-10 pr-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700"
          />
        </motion.div>

        {err && (
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="text-red-600 text-sm"
          >
            {err}
          </motion.p>
        )}

        {/* Button */}
        <motion.button
          type="submit"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-blue-950 text-white py-3 rounded-md font-medium hover:bg-blue-900 transition"
        >
          Login
        </motion.button>
      </motion.form>
    </div>
  );
}
