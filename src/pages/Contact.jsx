import React from "react";
import ContactForm from "../components/ContactForm";
import FaqSection from "../components/FaqSection";

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <div>
        <ContactForm />
        <FaqSection />
      </div>
    </div>
  );
};

export default Contact;
