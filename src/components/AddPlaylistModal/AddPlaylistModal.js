import React, { useState } from "react";
import { createPlaylistService } from "../../services";
import "./AddPlaylistModal.css";
import { useAuth } from "../../context/AuthContext";
import { usePlaylist } from "../../context/PlaylistContext";

export const AddPlaylistModal = ({ show, close }) => {
  const [title, setTitle] = useState("");

  const {
    state: { token },
  } = useAuth();
  const { dispatch } = usePlaylist();

  const modalCloseHandler = () => {
    close();
  };

  return (
    <>
      {show && (
        <div className="playlist-modal" onClick={modalCloseHandler}>
          <div
            className="playlist-modal-content"
            onClick={e => e.stopPropagation()}
          >
            <div className="playlist-modal-header">
              <p className="playlist-modal-title">Create new playlist</p>
              <i
                className="material-icons-outlined"
                onClick={modalCloseHandler}
              >
                close
              </i>
            </div>
            <div className="playlist-modal-footer">
              <div className="playlist-modal-form show">
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
                      modalCloseHandler();
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
