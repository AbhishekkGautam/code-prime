import React from "react";
import "./MobileSidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const MobileSidebar = ({ showSidebar, toggleSidebar }) => {
  const {
    state: { isLoggedIn },
    logoutHandler,
  } = useAuth();
  const navigate = useNavigate();

  return (
    <div className={showSidebar ? "sidebar-bg visible" : "sidebar-bg"}>
      <div className={showSidebar ? "sidebar reveal" : "sidebar"}>
        <ul className="sidebar-links">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "link-item active" : "link-item"
              }
              onClick={toggleSidebar}
            >
              <i className="material-icons icon">home</i>
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/trending"
              className={({ isActive }) =>
                isActive ? "link-item active" : "link-item"
              }
              onClick={toggleSidebar}
            >
              <i className="material-icons icon">local_fire_department</i>
              <span>Trending</span>
            </NavLink>
          </li>
          <hr className="divider" />
          <li>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                isActive ? "link-item active" : "link-item"
              }
              onClick={toggleSidebar}
            >
              <i className="material-icons icon">history</i>
              <span>History</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/liked-videos"
              className={({ isActive }) =>
                isActive ? "link-item active" : "link-item"
              }
              onClick={toggleSidebar}
            >
              <i className="material-icons-outlined icon">thumb_up</i>
              <span>Liked Videos</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/watch-later"
              className={({ isActive }) =>
                isActive ? "link-item active" : "link-item"
              }
              onClick={toggleSidebar}
            >
              <i className="material-icons-outlined icon">watch_later</i>
              <span>Watch Later</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/playlist"
              className={({ isActive }) =>
                isActive ? "link-item active" : "link-item"
              }
              onClick={toggleSidebar}
            >
              <i className="material-icons icon">playlist_play</i>
              <span>Playlist</span>
            </NavLink>
          </li>
        </ul>
        {isLoggedIn && (
          <button onClick={logoutHandler} className="btn login-sidebar-btn">
            Log out
          </button>
        )}
        {!isLoggedIn && (
          <button
            onClick={() => {
              navigate("/login");
              toggleSidebar();
            }}
            className="btn login-sidebar-btn"
          >
            Log in
          </button>
        )}
      </div>
    </div>
  );
};
