import React from "react";
import { NavSidebarContainer, VideoListing } from "../../components";
import { useVideoContext } from "../../context/VideoContext";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import "./History.css";
import { clearHistoryService } from "../../services";
export const History = () => {
  const { state, dispatch } = useVideoContext();
  const { history, loading, error } = state;
  const {
    state: { token, isLoggedIn },
  } = useAuth();

  return (
    <NavSidebarContainer>
      <div className="history-videos-list">
        {token && isLoggedIn ? (
          <>
            <div className="history-top-section">
              <p className="history-top-title">History</p>
              <button
                className="btn btn-sm clear-history-btn"
                onClick={() => clearHistoryService(token, dispatch)}
              >
                Clear History
              </button>
            </div>
            {loading ? (
              <div className="loader-container">Loading...</div>
            ) : error ? (
              error.status === 500 && (
                <div className="user-message-container">
                  <p>Unable to load data</p>
                </div>
              )
            ) : history?.length === 0 ? (
              <div className="user-message-container">
                <p>No history available.</p>
              </div>
            ) : (
              <VideoListing videos={history} />
            )}
          </>
        ) : (
          <div className="user-message-container">
            <h3>You're logged out.</h3>
            <p>Log in to view your history.</p>
            <Link className="btn btn-primary" to="/login">
              Login
            </Link>
          </div>
        )}
      </div>
    </NavSidebarContainer>
  );
};
