import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxios from "../services/axiosConfig";
import { useState } from "react";
import toast from "react-hot-toast";

const ContactForm = () => {
  const api = useAxios();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Message Sending...");

    try {
      await api.post("/contact", form); // ← just send the object
      toast.success("Message Sent!", { id: toastId });
      setForm({ name: "", email: "", phone: "", message: "" });
      e.target.reset();
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#030629]">
      <div className="container flex flex-col flex-1 px-6 pt-10 pb-20 mx-auto">
        <div className="flex-1 lg:flex lg:items-center lg:-mx-6">
          {/* Left Text Section */}
          <div className="text-white lg:w-1/2 lg:mx-6 flex flex-col">
            <h1 className="text-3xl font-semibold text-[#FA971E] capitalize lg:text-4xl">
              We'd Love to Hear From You
            </h1>

            <p className="max-w-xl mt-6">
              Whether you’re new to our ministry, have a prayer request, or just
              want to ask a question, we’re here to help. Our team at RCCG House
              of David is always ready to connect with you.
            </p>

            <a
              href="https://www.google.com/maps/place/The+Redeemed+Christian+Church+Of+God,+House+of+David"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 mt-10 text-sm font-medium w-30 tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#FA971E] rounded-md hover:bg-[#fa971ea2] focus:outline-none focus:ring focus:ring-[#FA971E] focus:ring-opacity-50"
            >
              Visit Us
            </a>

            {/* Embedded Google Map */}
            <div className="mt-16 w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
              <iframe
                className="w-full h-full border-0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.5305096264697!2d3.38338237499345!3d6.580774693412754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b928f026b5da7%3A0x7a98a9148e6051ae!2sThe%20Redeemed%20Christian%20Church%20Of%20God%2C%20House%20of%20David!5e0!3m2!1sen!2sng!4v1750703526382!5m2!1sen!2sng"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Church Location"
              ></iframe>
            </div>

            {/* Social Media Links */}
            <div className="mt-6 md:mt-8">
              <h3 className="text-gray-300">Follow Us</h3>
              <div className="flex mt-4 gap-5 text-xl">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 hover:scale-110 transition-all ease-in-out duration-300"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 hover:scale-110 transition-all ease-in-out duration-300"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-500 hover:scale-110 transition-all ease-in-out duration-300"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-600 hover:scale-110 transition-all ease-in-out duration-300"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>

          {/* Right Form Section */}
          <div className="mt-8 lg:w-1/2 lg:mx-6">
            <div className="w-full px-8 py-10 mx-auto overflow-hidden bg-[#080f5946] shadow-2xl rounded-xl lg:max-w-xl">
              <h1 className="text-xl font-medium text-[#FA971E]">
                Contact Our Church
              </h1>
              <p className="mt-2 text-white">
                Fill out the form below and our team will get back to you as
                soon as possible.
              </p>
              <form onSubmit={submit} className="mt-6">
                {/* Full Name */}
                <div className="flex-1">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm  text-white"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Harrison Wells"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="block w-full px-5 py-3 mt-2  border rounded-md bg-gray-200 text-black border-[#FA971E]  focus:ring focus:ring-[#FA971E] focus:ring-opacity-40 focus:border-[#FA971E] focus:outline-none "
                  />
                </div>

                {/* Email */}
                <div className="flex-1 mt-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm  text-white"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="Harrisonwells@example.com"
                    className="block w-full px-5 py-3 mt-2  border rounded-md bg-gray-200 text-black border-[#FA971E]  focus:ring focus:ring-[#FA971E] focus:ring-opacity-40 focus:border-[#FA971E] focus:outline-none"
                  />
                </div>

                {/* Phone */}
                <div className="flex-1 mt-6">
                  <label className="block mb-2 text-sm  text-white">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+234 800 123 4567"
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="block w-full px-5 py-3 mt-2  border rounded-md bg-gray-200 text-black border-[#FA971E]  focus:ring focus:ring-[#FA971E] focus:ring-opacity-40 focus:border-[#fa971ec9] focus:outline-none"
                  />
                </div>

                {/* Message */}
                <div className="w-full mt-6">
                  <label className="block mb-2 text-sm  text-white">
                    Message
                  </label>
                  <textarea
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="block w-full h-32 px-5 py-3 mt-2  placeholder-gray-400  border  rounded-md md:h-40 bg-gray-200 text-black border-[#FA971E]  focus:ring-[#FA971E] focus:ring-opacity-40 focus:border-[#FA971E] focus:outline-none focus:ring"
                    placeholder="How can we assist you?"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button className="w-full px-6 py-3 mt-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-900 rounded-md hover:bg-blue-950 focus:outline-none focus:ring focus:ring-[#FA971E] focus:ring-opacity-50">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
