import React, { useState, useMemo } from "react";
import { fetchYouTubeMeta } from "../utils/youtube";

/* ---------- Skeleton Loader ---------- */
const Skeleton = () => (
  <div className="animate-pulse w-full h-full bg-gray-200 rounded"></div>
);

const SermonsCard = ({ title, description, youtubeLink, createdAt }) => {
  const [showModal, setShowModal] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const date = new Date(createdAt);
  const isValidDate = !isNaN(date);
  const year = isValidDate ? date.getFullYear() : "----";
  const dayMonth = isValidDate
    ? date.toLocaleDateString("en-US", { month: "short", day: "2-digit" })
    : "-- --";

  // memo-ise so it recalculates only when the link changes
  const youtubeThumb = useMemo(
    () => (youtubeLink ? fetchYouTubeMeta(youtubeLink) : "/fallback.jpg"),
    [youtubeLink]
  );

  // Extract YouTube video ID
  const videoId = youtubeLink?.split("v=")[1]?.split("&")[0];
  const embedLink = `https://www.youtube.com/embed/${videoId}`;

  return (
    <article className="flex bg-white rounded-lg overflow-hidden shadow-sm transition">
      {/* Date section */}
      <div className="rotate-180 p-2" style={{ writingMode: "vertical-lr" }}>
        <time className="flex items-center justify-between gap-4 text-xs font-bold text-gray-900 uppercase">
          <span>{year}</span>
          <span className="w-px flex-1 bg-gray-900/10"></span>
          <span>{dayMonth}</span>
        </time>
      </div>

      {/* Thumbnail */}
      <div className="w-50 lg:w-100 sm:block sm:basis-75 lg:basis-75 md:basis-50 relative">
        {!imgLoaded && <Skeleton />}
        <img
          alt={title}
          src={youtubeThumb}
          className={`aspect-video h-full w-full object-cover rounded ${
            imgLoaded ? "block" : "hidden"
          }`}
          onLoad={() => setImgLoaded(true)}
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between">
        <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
          <a href={youtubeLink} target="_blank" rel="noopener noreferrer">
            <h3 className="font-bold text-gray-900 uppercase">{title}</h3>
          </a>
          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
            {description}
          </p>
        </div>

        <div className="sm:flex sm:items-end sm:justify-end">
          <button
            onClick={() => setShowModal(true)}
            className="block bg-[#FA971E] px-5 py-3 cursor-pointer text-center text-xs font-bold text-gray-900 uppercase rounded hover:bg-[#fcb34e]"
          >
            Watch on YouTube
          </button>
        </div>
      </div>

      {/* Modal (no animations) */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg overflow-hidden w-full max-w-2xl relative shadow-xl">
            <div className="flex justify-end p-2">
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 cursor-pointer text-2xl font-bold hover:text-red-600"
              >
                &times;
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                src={embedLink}
                title="YouTube Video"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default SermonsCard;
