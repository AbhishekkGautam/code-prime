import React from "react";
import { NavSidebarContainer, VideoListing } from "../../components";
import { useAuth } from "../../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import "./PlaylistDetail.css";
import { usePlaylist } from "../../context/PlaylistContext";
import { getPlaylistDetailsById } from "../../helpers";

export const PlaylistDetail = () => {
  const {
    state: { token, isLoggedIn },
  } = useAuth();

  const {
    state: { playlists },
  } = usePlaylist();

  const { playlistId } = useParams();

  const playlistInfo = getPlaylistDetailsById(playlists, playlistId);

  const { title, videos } = playlistInfo || {};

  return (
    <NavSidebarContainer>
      <div className="playlist-videos-list">
        {token && isLoggedIn ? (
          <>
            <div className="playlist-details-top-section">
              <p className="playlist-details-top-title">
                {title} ({videos.length})
              </p>
            </div>
            {videos.length === 0 ? (
              <div className="user-message-container">
                <p>No videos in this playlist yet.</p>
              </div>
            ) : (
              <VideoListing videos={videos} playlistId={playlistId} />
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
      </div>
    </NavSidebarContainer>
  );
};
