import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AddPlaylistModal,
  NavSidebarContainer,
  PlaylistCards,
} from "../../components";
import { useAuth } from "../../context/AuthContext";
import "./Playlist.css";
import { usePlaylist } from "../../context/PlaylistContext";

export const Playlist = () => {
  const [showAddPlaylistModal, setShowAddPlaylistModal] = useState(false);

  const {
    state: { token, isLoggedIn },
  } = useAuth();

  const {
    state: { loading, error, playlists },
  } = usePlaylist();

  return (
    <NavSidebarContainer>
      <div className="history-videos-list">
        {token && isLoggedIn ? (
          <>
            <div className="history-top-section">
              <p className="history-top-title">Playlists</p>
              <button
                className="btn btn-sm clear-history-btn"
                onClick={() => setShowAddPlaylistModal(true)}
              >
                Create Playlist
              </button>
            </div>
            {loading ? (
              <div className="loader-container">Loading...</div>
            ) : error ? (
              <p>{error.status}</p>
            ) : playlists.length === 0 ? (
              <div className="user-message-container">
                <p>No playlists added yet.</p>
              </div>
            ) : (
              <PlaylistCards playlists={playlists} />
            )}
          </>
        ) : (
          <div className="user-message-container">
            <h3>You're logged out.</h3>
            <p>Log in to view your playlists.</p>
            <Link className="btn btn-primary" to="/login">
              Login
            </Link>
          </div>
        )}
        <AddPlaylistModal
          show={showAddPlaylistModal}
          close={() => setShowAddPlaylistModal(false)}
        />
      </div>
    </NavSidebarContainer>
  );
};
