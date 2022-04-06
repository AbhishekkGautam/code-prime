import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./MoreOptionsModal.css";
import { PlaylistModal } from "../PlaylistModal/PlaylistModal";
import {
  addVideoToWatchLaterService,
  deleteVideoFromPlaylistService,
} from "../../services";
import { useAuth } from "../../context/AuthContext";
import { usePlaylist } from "../../context/PlaylistContext";
import { useVideoContext } from "../../context/VideoContext";
import { deleteVideoFromWatchLaterService } from "../../services";

export const MoreOptionsModal = ({
  video,
  videos,
  videoId,
  playlistId,
  componentPath,
  deleteOptionName,
  deleteIconHandler,
}) => {
  const ref = useRef();
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const {
    state: { token },
  } = useAuth();

  const { dispatch } = usePlaylist();
  const {
    dispatch: watchLaterDispatch,
    state: { watchLater },
  } = useVideoContext();

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (showOptionsModal && ref.current && !ref.current.contains(e.target)) {
        setShowOptionsModal(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showOptionsModal]);

  const videoExistInVideosList = videos?.find(video => video._id === videoId);
  const videoExistInWatchLater = watchLater?.find(
    video => video._id === videoId
  );

  const saveToWatchLater = () => {
    addVideoToWatchLaterService(video, token, watchLaterDispatch);
    setShowOptionsModal(false);
  };

  const toggleAddPlaylistModal = () => {
    setShowPlaylistModal(true);
    setShowOptionsModal(false);
  };

  return (
    <div className="more-options" ref={ref}>
      <i
        className="material-icons material-icons-outlined"
        onClick={() => setShowOptionsModal(!showOptionsModal)}
      >
        more_vert
      </i>
      {showOptionsModal && (
        <div
          className={showOptionsModal ? "option-modal show" : "option-modal"}
        >
          {videoExistInVideosList && pathname === componentPath ? (
            <button className="option-modal-btn" onClick={deleteIconHandler}>
              <i className="material-icons-outlined">block</i>
              <span>{deleteOptionName}</span>
            </button>
          ) : null}

          {token && pathname === `/playlist/${playlistId}` ? (
            <button
              className="option-modal-btn"
              onClick={() =>
                deleteVideoFromPlaylistService(
                  playlistId,
                  videoId,
                  token,
                  dispatch
                )
              }
            >
              <i className="material-icons-outlined">block</i>
              <span>Remove from Playlist</span>
            </button>
          ) : null}
          {token && videoExistInWatchLater ? (
            <button
              className="option-modal-btn"
              onClick={() => {
                deleteVideoFromWatchLaterService(
                  videoId,
                  token,
                  watchLaterDispatch
                );
                setShowOptionsModal(false);
              }}
            >
              <i className="material-icons-outlined">block</i>
              <span>Remove from Watch later</span>
            </button>
          ) : (
            <button
              className="option-modal-btn"
              onClick={() => (token ? saveToWatchLater() : navigate("/login"))}
            >
              <i className="material-icons-outlined">watch_later</i>
              <span>Save to Watch later</span>
            </button>
          )}
          {pathname !== `/playlist/${playlistId}` ? (
            <button
              className="option-modal-btn"
              onClick={() => {
                token ? toggleAddPlaylistModal() : navigate("/login");
              }}
            >
              <i className="material-icons-outlined">playlist_add</i>
              <span>Save to playlist</span>
            </button>
          ) : null}
          {/* <button className="option-modal-btn">
            <RiShareForwardLine className="material-icons-outlined" />
            <span>Share</span>
          </button> */}
        </div>
      )}
      <PlaylistModal
        video={video}
        videoId={videoId}
        show={showPlaylistModal}
        close={() => setShowPlaylistModal(false)}
      />
    </div>
  );
};
