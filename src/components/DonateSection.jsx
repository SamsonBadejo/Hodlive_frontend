import { useState } from "react";
import { motion } from "framer-motion";
import ubaLogo from "../assets/UBA_logo.png";
import zenithLogo from "../assets/Zenith_bank.png";
import firstbankLogo from "../assets/Firstbank_logo.png";

const DonateSection = () => {
  const [activeTab, setActiveTab] = useState("tithe");

  const banks = [
    {
      name: "UBA",
      logo: ubaLogo,
      accountName: "RCCG House of David Ogudu",
      accountNumber: "1234567890",
      link: "https://paystack.shop/pay/rccghouseofdavid",
    },
    {
      name: "Zenith Bank",
      logo: zenithLogo,
      accountName: "RCCG House of David Ogudu",
      accountNumber: "2345678901",
      link: "https://paystack.shop/pay/rccghouseofdavid",
    },
    {
      name: "First Bank",
      logo: firstbankLogo,
      accountName: "RCCG House of David Ogudu",
      accountNumber: "3456789012",
      link: "https://paystack.shop/pay/rccghouseofdavid",
    },
  ];

  /* ---------- Motion Variants ---------- */
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.25 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const zoomIn = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const floatCard = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: i * 0.2,
      },
    }),
    whileHover: {
      y: -8,
      scale: 1.03,
      boxShadow: "0px 15px 25px rgba(0,0,0,0.15)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <section className="bg-gradient-to-br from-[#030629] to-[#080F59] text-white py-20 px-6 pt-32">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title */}
        <motion.h2
          variants={zoomIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-4xl font-bold mb-4 text-[#FA971E]"
        >
          Partner with God's Work
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-lg mb-12"
        >
          Your faithful giving enables us to fulfill the great commission,
          support the less privileged, build strong communities, and extend the
          love of Christ. Join us in making an eternal impact.
        </motion.p>

        {/* Toggle Buttons */}
        <motion.div
          variants={zoomIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-10"
        >
          {["tithe", "offering"].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-2 rounded-full text-sm font-semibold border transition-all duration-300 cursor-pointer ${
                activeTab === tab
                  ? "bg-[#FA971E] text-white border-[#FA971E]"
                  : "border-white text-white hover:bg-white hover:text-[#030629]"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "tithe" ? "Tithe" : "Offering"}
            </button>
          ))}
        </motion.div>

        {/* Verse Message */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xl font-medium">
            {activeTab === "tithe"
              ? "“Bring all the tithes into the storehouse, so there will be enough food in my Temple. If you do, I will open the windows of heaven for you.”"
              : "Give generously, and it will be given to you—a good measure, pressed down, shaken together, and running over."}
          </p>
        </motion.div>

        {/* Bank Cards */}

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {banks.map((bank, idx) => (
            <a href={bank.link} target="_blank" rel="noreferrer">
              <motion.div
                key={idx}
                custom={idx}
                variants={floatCard}
                whileHover="whileHover"
                className="bg-white text-black rounded-xl shadow-lg p-6 flex flex-col transition-all duration-300 ease-in-out"
              >
                <div className="flex justify-between items-center">
                  <img src={bank.logo} alt={bank.name} className="h-14 mb-4" />
                  <span className="text-sm text-gray-600">{bank.name}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-center">
                  {bank.accountName}
                </h3>
                <p className="font-bold text-xl mb-2 tracking-wider">
                  {bank.accountNumber}
                </p>
                <a
                  href={bank.link}
                  className="text-[#FA971E] font-semibold hover:underline text-center"
                  target="_blank"
                  rel="noreferrer"
                >
                  Click to pay
                </a>
              </motion.div>
            </a>
          ))}
        </motion.div>

        {/* Info */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 border-t border-white/20 pt-8"
        >
          <p className="italic text-sm text-gray-300">
            YOU CAN TRANSFER TO THE BANKS ABOVE OR CLICK THE{" "}
            <strong className="underline"> "Click to pay"</strong> ABOVE TO PAY
            YOUR TITHES/OFFERING
          </p>
        </motion.div>

        {/* Bible Verse */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 border-t border-white/20 pt-8"
        >
          <p className="italic text-sm text-gray-300">
            "Honor the Lord with your wealth and with the best part of
            everything you produce. Then He will fill your barns with grain, and
            your vats will overflow with good wine." — Proverbs 3:9-10
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DonateSection;
