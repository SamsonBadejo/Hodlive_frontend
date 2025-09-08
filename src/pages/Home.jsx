import React from "react";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import ServiceTime from "../components/ServiceTime";
import IconLink from "../components/IconLink";
import ContactForm from "../components/ContactForm";
import Title from "../components/Title";
import AboutMinistry from "../components/AboutMinistry";
import Event from "../pages/Event";
import EventList from "../components/EventCard";
import EventSwiper from "../components/EventSwiper";

const Home = () => {
  return (
    <div className="">
      <HeroSection />

      <Title titles="SERVICE TIME" />
      <ServiceTime />

      <Title titles="EVENTS" />
      <div className="bg-[#030629]  sm:block md:hidden lg:hidden">
        <EventSwiper />
      </div>

      <div className="bg-[#030629] hidden sm:hidden md:block lg-block">
        <EventList />
      </div>

      <Title titles="MINISTRY" />
      <AboutMinistry />

      <Title titles="CONTACT-US" />
      <ContactForm />
    </div>
  );
};

export default Home;
