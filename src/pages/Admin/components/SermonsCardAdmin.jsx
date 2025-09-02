import { useState } from "react";
import HeroImg from "../../../assets/hero_img.jpg";
import { fetchYouTubeMeta } from "../../../utils/youtube";
import { useMemo } from "react";

const SermonsCardAdmin = ({
  title,
  description,
  youtubeLink,
  createdAt,
  onDelete,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const date = new Date(createdAt);
  const isValidDate = !isNaN(date);
  const year = isValidDate ? date.getFullYear() : "----";
  const dayMonth = isValidDate
    ? date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
      })
    : "-- --";

  // memo‑ise so it recalculates only when the link changes
  const youtubeThumb = useMemo(
    () => (youtubeLink ? fetchYouTubeMeta(youtubeLink) : "/fallback.jpg"),
    [youtubeLink]
  );

  // Extract YouTube video ID
  const videoId = youtubeLink?.split("v=")[1]?.split("&")[0];
  const embedLink = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div>
      <img
        src={HeroImg}
        className="absolute inset-0 object-cover w-full h-400 md:h-400 lg:h-200 -z-50 "
        alt=""
      />
      <div className="absolute bg-gray-900/15 inset-0 object-cover w-full h-400 md:h-400 lg:h-200  -z-49"></div>

      {/* SERMONS */}

      <article className="flex bg-white transition hover:shadow-xl">
        <div className="rotate-180 p-2" style={{ writingMode: "vertical-lr" }}>
          <time className="flex items-center justify-between gap-4 text-xs font-bold text-gray-900 uppercase">
            <span>{year}</span>
            <span className="w-px flex-1 bg-gray-900/10"></span>
            <span>{dayMonth}</span>
          </time>
        </div>

        <div className="w-50 lg:w-100 sm:block sm:basis-75 lg:basis-75 md:basis-50">
          <img
            alt={title}
            src={youtubeThumb}
            className=" aspect-video h-full w-full object-contain lg:object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
            <a href={youtubeLink} target="_blank" rel="noopener noreferrer">
              <h3 className="font-bold text-gray-900 uppercase">{title}</h3>
            </a>

            <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
              {description}
            </p>
          </div>

          <div className="sm:flex sm:items-end sm:justify-end flex-col gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="block bg-[#FA971E] px-5 py-3 cursor-pointer text-center text-xs font-bold text-gray-900 uppercase transition hover:bg-[#fa971ebd]"
            >
              Watch on YouTube
            </button>

            {onDelete && (
              <button
                onClick={() => setShowDeleteModal(true)}
                className="mt-2 block bg-red-600 px-8 py-3 cursor-pointer text-center text-xs font-bold text-white uppercase transition hover:bg-red-800"
              >
                Delete Sermon
              </button>
            )}
          </div>
        </div>
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 text-center">
              <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
              <p className="mb-6">
                Do you want to delete{" "}
                <span className="font-bold">"{title}"</span>?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    onDelete();
                    setShowDeleteModal(false);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
            <div className="bg-white rounded-lg overflow-hidden w-full max-w-2xl relative">
              <div className="flex justify-end p-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-600 cursor-pointer hover:text-red-600 text-2xl font-bold"
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
    </div>
  );
};

export default SermonsCardAdmin;
