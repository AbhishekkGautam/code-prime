import React from "react";
import { Link } from "react-router-dom";
import { NavSidebarContainer } from "../../components";
import { useAuth } from "../../context/AuthContext";
import { useVideoContext } from "../../context/VideoContext";
import "./WatchLater.css";
import { VideoListing } from "../../components";

export const WatchLater = () => {
  const {
    state: { token, isLoggedIn },
  } = useAuth();

  const { state } = useVideoContext();
  const { watchLater, error, loading } = state;

  return (
    <NavSidebarContainer>
      <div className="history-videos-list">
        {token && isLoggedIn ? (
          <>
            <p className="history-top-title">Watch Later</p>

            {loading ? (
              <div className="loader-container">Loading...</div>
            ) : error ? (
              <p>{error.status}</p>
            ) : watchLater?.length === 0 ? (
              <div className="user-message-container">
                <p>No videos added yet.</p>
              </div>
            ) : (
              <VideoListing videos={watchLater} />
            )}
          </>
        ) : (
          <div className="user-message-container">
            <h3>You're logged out.</h3>
            <p>Log in to view your watch later.</p>
            <Link className="btn btn-primary" to="/login">
              Login
            </Link>
          </div>
        )}
      </div>
    </NavSidebarContainer>
  );
};
