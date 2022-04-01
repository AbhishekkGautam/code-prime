import React from "react";
import { NavSidebarContainer, VideoListing } from "../../components";
import { useVideoContext } from "../../context/VideoContext";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import "./LikedVideos.css";
export const LikedVideos = () => {
  const { state } = useVideoContext();
  const { likedVideos, loading, error } = state;
  const {
    state: { token, isLoggedIn },
  } = useAuth();
  return (
    <NavSidebarContainer>
      <div className="liked-videos-list">
        {token && isLoggedIn ? (
          <>
            <p class="liked-top-title">Liked Videos</p>
            {loading ? (
              <div className="loader-container">Loading...</div>
            ) : error ? (
              <p>{error.status}</p>
            ) : (
              <VideoListing videos={likedVideos} />
            )}
          </>
        ) : (
          <div className="user-message-container">
            <h3>You're logged out.</h3>
            <p>Log in to view your liked videos.</p>
            <Link className="btn btn-primary" to="/login">
              Login
            </Link>
          </div>
        )}
      </div>
    </NavSidebarContainer>
  );
};
