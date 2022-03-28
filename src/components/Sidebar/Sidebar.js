import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div class="side-bar">
      <div class="side-nav">
        <Link to="/" class="side-nav-link active">
          <i class="material-icons">home</i>
          <span>Home</span>
        </Link>
        <Link to="/trending" class="side-nav-link">
          <i class="material-icons">local_fire_department</i>
          <span>Trending</span>
        </Link>
        <hr />
        <Link to="/history" class="side-nav-link">
          <i class="material-icons">history</i>
          <span>History</span>
        </Link>
        <Link to="/liked-videos" class="side-nav-link">
          <i class="material-icons-outlined">thumb_up</i>
          <span>Liked Videos</span>
        </Link>
        <Link to="/watch-later" class="side-nav-link">
          <i class="material-icons-outlined">watch_later</i>
          <span>Watch Later</span>
        </Link>
        <Link to="/library" class="side-nav-link">
          <i class="material-icons">playlist_play</i>
          <span>Playlist</span>
        </Link>
      </div>
    </div>
  );
};
