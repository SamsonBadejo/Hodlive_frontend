import React from "react";
import HeroImg from "../assets/hero_img.jpg";
import HeroImg2 from "../assets/Pastor Attah.jpg";
import Title from "../components/title";

const AboutConvener = () => {
  return (
    <div>
      <img
        src={HeroImg}
        className="absolute inset-0 object-cover w-full h-full -z-100 "
        alt="background-image"
      />
      <div className="absolute bg-gray-900/70 inset-0 object-cover w-full h-full -z-99"></div>{" "}
      {/* Main Content */}
      <div className="relative mt-25 z-20 max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Pastor Image Section */}
        <div className="flex justify-center">
          <img
            src={HeroImg2}
            alt="Pastor Attah Ogbolu"
            className="w-[280px] h-[280px] object-cover rounded-full border-4 border-yellow-500 shadow-xl"
          />
        </div>

        {/* Bio Text Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-[#FA971E] uppercase mb-2">
            Pastor Attah Ogbole
          </h2>
          <p>
            Pastor Attah Ogbole is a dedicated servant of God and shepherd of
            RCCG House of David. With a passion for God’s word and people, he
            leads with wisdom, humility, and compassion.
          </p>
          <p>
            Under his leadership, the church has grown spiritually and
            structurally. Pastor Attah is known for his inspiring sermons,
            vibrant worship, and a strong emphasis on family and youth
            empowerment.
          </p>
          <p>
            His vision is to raise a generation of God-fearing leaders,
            committed to excellence, holiness, and community impact.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutConvener;
