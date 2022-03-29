export const getTrendingVideos = videos =>
  [...videos].sort((video1, video2) => video2.views - video1.views);
