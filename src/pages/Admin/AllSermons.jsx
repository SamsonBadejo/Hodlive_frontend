import { useEffect, useMemo, useState } from "react";
import api from "../../services/api"; // axios instance you already have
import SermonCard from "../Admin/components/SermonsCardAdmin";
import Searchbar from "../../components/Searchbar";
import { fetchYouTubeMeta } from "../../utils/youtube";
import ErrorMessages from "../../components/ErrorMessages";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";

const SermonsList = () => {
  /* ====== NEW state ====== */
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ====== existing UI state ====== */
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const sermonsPerPage = 4;

  /* -------------------- fetch once -------------------- */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/sermons"); // ⇐ backend endpoint
        setSermons(data);
      } catch {
        setError(
          <ErrorMessages
            errorMsg="Failed to Load Sermon"
            errorDes="Something went wrong while fetching the sermon. Please refresh the
            page or try again later."
          />
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ---------------- search + sort ---------------- */
  const filteredSorted = useMemo(() => {
    const q = query.toLowerCase();

    const filtered = sermons.filter(
      ({ title, description }) =>
        title.toLowerCase().includes(q) || description.toLowerCase().includes(q)
    );

    const sorted = [...filtered].sort((a, b) => {
      switch (sortKey) {
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "desc-asc":
          return a.description.localeCompare(b.description);
        case "desc-desc":
          return b.description.localeCompare(a.description);
        default:
          return new Date(b.createdAt) - new Date(a.createdAt); // newest
      }
    });

    return sorted;
  }, [sermons, query, sortKey]);

  /* ---------------- pagination ---------------- */
  const totalPages = Math.ceil(filteredSorted.length / sermonsPerPage);
  const startIndex = (currentPage - 1) * sermonsPerPage;
  const currentSlice = filteredSorted.slice(
    startIndex,
    startIndex + sermonsPerPage
  );

  const maxVisiblePages = 5;
  let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
  let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
  if (endPage - startPage + 1 < maxVisiblePages)
    startPage = Math.max(endPage - maxVisiblePages + 1, 1);

  const goToPage = (p) => p >= 1 && p <= totalPages && setCurrentPage(p);

  const handleDelete = async (id, title) => {
    const toastId = toast.loading(`Deleting "${title}"...`);

    try {
      await api.delete(`/sermons/${id}`);
      setSermons((prev) => prev.filter((s) => s._id !== id));
      toast.success(`"${title}" deleted successfully`, { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete the sermon.", { id: toastId });
    }
  };

  /* ---------------- render ---------------- */
  if (loading) return <Loading title="Sermons Loading...."/>
;
  if (error) return <p className="text-center mt-24 text-red-600">{error}</p>;

  return (
<div className="px-4 py-8 pt-23 md:px-8 max-w-7xl mx-auto w-full">
      <Searchbar
        query={query}
        onQueryChange={(v) => {
          setQuery(v);
          setCurrentPage(1);
        }}
        sortKey={sortKey}
        onSortChange={setSortKey}
      />

      {filteredSorted.length === 0 ? (
        <p className="text-center mt-12 text-white text-2xl ">
          No sermons found...
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6">
            {currentSlice.map((s) => (
              <SermonCard
                key={s._id}
                {...s}
                onDelete={() => handleDelete(s._id, s.title)}
                youtubeThumb={fetchYouTubeMeta(s.youtubeLink)}
              />
            ))}
          </div>

          {/* pagination */}
          <div className="flex justify-center gap-2 mt-10 flex-wrap">
            <button
              onClick={() => goToPage(currentPage - 1)}
              className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
              const n = startPage + i;
              return (
                <button
                  key={n}
                  onClick={() => goToPage(n)}
                  className={`px-3 py-1 text-sm rounded ${
                    currentPage === n
                      ? "bg-[#FA971E] text-white"
                      : "bg-gray-100 hover:bg-gray-300"
                  }`}
                >
                  {n}
                </button>
              );
            })}

            <button
              onClick={() => goToPage(currentPage + 1)}
              className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SermonsList;
