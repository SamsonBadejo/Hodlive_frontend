// utils/youtube.js   (ES module)

export const fetchYouTubeMeta = (url) => {
  const id = new URL(url).searchParams.get("v");
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
};
