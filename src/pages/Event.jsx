import React from "react";
import EventSwiper from "../components/EventSwiper";
import EventList from "../components/EventCard";
import AllEventCard from "../components/AllEventCard";

const Event = () => {
  return (
    <div>
      <div className="bg-[#080F59] py-18">
        <div className="sm:block lg:hidden  md:block">
          <EventList />
        </div>
        <div className="hidden lg:block sm:hidden md:block">
          <AllEventCard />
        </div>
      </div>
    </div>
  );
};

export default Event;
