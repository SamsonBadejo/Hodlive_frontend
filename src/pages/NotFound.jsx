import React from "react";
import { Link } from "react-router-dom";
import HeroImg from "../assets/hero_img.jpg";
import ErrorMsg from "../assets/Girl facing error 404.png";

const NotFound = () => {
  return (
    <div className="py-10">
      <div>
        <img
          src={HeroImg}
          className="absolute inset-0 object-cover w-full h-full -z-50 "
          alt=""
        />
        <div className="absolute bg-gray-900/15 inset-0 object-cover w-full h- -z-49"></div>

        <div className="container lg:justify-around  bg-white py-15 mt-30  mx-auto lg:flex lg:items-center lg:gap-12">
          <div className="w-full lg:w-1/2">
            <p className="text-sm font-medium text-blue-500 ">404 error</p>
            <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
              Page not found!
            </h1>
            <p className="mt-4 text-gray-500 ">
              Sorry, the page you are looking for doesn't exist.
            </p>

            <div className="flex items-center  mt-6 gap-x-3">
              <Link
                to="/"
                className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
              >
                Take me home
              </Link>
            </div>
          </div>

          <div className="relative w-full mt-12 lg:w-80 lg:mt-0">
            <img
              className="w-full max-w-lg lg:mx-auto"
              src={ErrorMsg}
              alt="errormsg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
