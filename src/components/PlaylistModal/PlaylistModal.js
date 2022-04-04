import React, { useState } from "react";
import { createPlaylistService, toggleCheckbox } from "../../services";
import "./PlaylistModal.css";
import { useAuth } from "../../context/AuthContext";
import { usePlaylist } from "../../context/PlaylistContext";

export const PlaylistModal = ({ show, close, video, videoId }) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");

  const {
    state: { token },
  } = useAuth();
  const {
    state: { playlists },
    dispatch,
  } = usePlaylist();

  const modalCloseHandler = () => {
    close();
    setShowForm(false);
  };

  const reversedPlaylist = [...playlists].reverse();

  return (
    <>
      {show && (
        <div className="playlist-modal" onClick={modalCloseHandler}>
          <div
            className="playlist-modal-content"
            onClick={e => e.stopPropagation()}
          >
            <div className="playlist-modal-header">
              <p className="playlist-modal-title">Save to...</p>
              <i
                className="material-icons-outlined"
                onClick={modalCloseHandler}
              >
                close
              </i>
            </div>
            <div className="playlist-modal-body">
              {reversedPlaylist.length > 0 ? (
                reversedPlaylist.map(playlist => {
                  const isVideoAlreadyInPlaylist = playlist.videos?.find(
                    video => video._id === videoId
                  );

                  return (
                    <div className="playlist-checkbox" key={playlist._id}>
                      <label className="label">
                        {playlist.title}
                        <input
                          type="checkbox"
                          className="custom-input"
                          name="playlist_checkbox"
                          checked={isVideoAlreadyInPlaylist || false}
                          onChange={() =>
                            toggleCheckbox(
                              isVideoAlreadyInPlaylist,
                              playlist._id,
                              videoId,
                              video,
                              token,
                              dispatch
                            )
                          }
                        />
                        <span className="custom-checkmark"></span>
                      </label>
                    </div>
                  );
                })
              ) : (
                <p className="user-feedback">No playlist created.</p>
              )}
            </div>
            <div className="playlist-modal-footer">
              <button
                className={
                  showForm ? "create-playlist-btn hide" : "create-playlist-btn"
                }
                onClick={() => setShowForm(true)}
              >
                <span className="material-icons-outlined">add</span>
                Create new playlist
              </button>
              <div
                className={
                  showForm ? "playlist-modal-form show" : "playlist-modal-form"
                }
              >
                <label htmlFor="title" className="modal-form-label">
                  Name
                </label>
                <input
                  className="playlist-name-input"
                  type="text"
                  name="title"
                  placeholder="Enter playlist name"
                  value={title || ""}
                  onChange={e => setTitle(e.target.value)}
                />
                <div className="btn-container">
                  <button
                    className="form-btn"
                    onClick={() => {
                      createPlaylistService(title, token, dispatch);
                      setTitle("");
                    }}
                  >
                    CREATE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
