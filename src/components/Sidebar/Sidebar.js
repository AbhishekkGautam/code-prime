import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="side-bar">
      <div className="side-nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "side-nav-link active" : "side-nav-link"
          }
        >
          <i className="material-icons">home</i>
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/trending"
          className={({ isActive }) =>
            isActive ? "side-nav-link active" : "side-nav-link"
          }
        >
          <i className="material-icons">local_fire_department</i>
          <span>Trending</span>
        </NavLink>
        <hr />
        <NavLink
          to="/history"
          className={({ isActive }) =>
            isActive ? "side-nav-link active" : "side-nav-link"
          }
        >
          <i className="material-icons">history</i>
          <span>History</span>
        </NavLink>
        <NavLink
          to="/liked-videos"
          className={({ isActive }) =>
            isActive ? "side-nav-link active" : "side-nav-link"
          }
        >
          <i className="material-icons-outlined">thumb_up</i>
          <span>Liked Videos</span>
        </NavLink>
        <NavLink
          to="/watch-later"
          className={({ isActive }) =>
            isActive ? "side-nav-link active" : "side-nav-link"
          }
        >
          <i className="material-icons-outlined">watch_later</i>
          <span>Watch Later</span>
        </NavLink>
        <NavLink
          to="/library"
          className={({ isActive }) =>
            isActive ? "side-nav-link active" : "side-nav-link"
          }
        >
          <i className="material-icons">playlist_play</i>
          <span>Playlist</span>
        </NavLink>
      </div>
    </div>
  );
};
