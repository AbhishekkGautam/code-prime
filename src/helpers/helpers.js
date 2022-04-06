export const getTrendingVideos = videos =>
  [...videos].sort((video1, video2) => video2.views - video1.views);

export const getUniqueValues = (data, type) => {
  let unique = data.map(item => item[type]);
  return ["All", ...new Set(unique)];
};

export const getFilteredVideos = (videos, state) => {
  let videosCopy = [...videos];
  if (state.filters.category !== "All") {
    videosCopy = videosCopy.filter(
      video => video.categoryName === state.filters.category
    );
  }
  if (state.filters.search !== "") {
    videosCopy = videosCopy.filter(video =>
      video.title.toLowerCase().includes(state.filters.search.toLowerCase())
    );
  }

  return videosCopy;
};

export const getVideoDetailsById = (videos, videoId) =>
  videos?.find(video => video._id === videoId);

export const getPlaylistDetailsById = (playlists, playlistId) =>
  playlists?.find(playlist => playlist._id === playlistId);
