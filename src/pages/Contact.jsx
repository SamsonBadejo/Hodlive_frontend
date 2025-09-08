import React from "react";
import ContactForm from "../components/ContactForm";
import FAQSection from "../components/FAQSection";

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <div className="py-20">
        <ContactForm />
        <FAQSection />
      </div>
    </div>
  );
};

export default Contact;
