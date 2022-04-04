import React from "react";
import "./PlaylistCards.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { thumbnailGenerator } from "../../utils";
import { deletePlaylistService } from "../../services/playlist/playlistService";
import { usePlaylist } from "../../context/PlaylistContext";

export const PlaylistCards = ({ playlists }) => {
  const {
    state: { token },
  } = useAuth();

  const { dispatch } = usePlaylist();

  return (
    <div className="playlists-container">
      {playlists &&
        playlists.map(playlist => {
          const { _id: playlistId, title } = playlist;
          let videoIdOfLatestVideo =
            playlist.videos.length > 0 &&
            playlist.videos[playlist.videos.length - 1]._id;
          return (
            <div className="playlist" key={playlistId}>
              <div className="playlist-thumbnail">
                <Link to={`/playlist/${playlistId}`}>
                  {playlist.videos.length > 0 ? (
                    <img
                      className="img-responsive thumbnail-img"
                      src={thumbnailGenerator(videoIdOfLatestVideo)}
                      alt={title}
                    />
                  ) : (
                    <img
                      className="img-responsive no-thumbnail-img"
                      src="https://i.ytimg.com/img/no_thumbnail.jpg"
                      alt={title}
                    />
                  )}
                </Link>
                <div className="playlist-overlay">
                  <span className="playlist-videos-count">
                    {playlist.videos.length}
                  </span>
                  <i className="material-icons">playlist_play</i>
                </div>
              </div>
              <div className="playlist-footer">
                <p className="playlist-title">{title}</p>
                <i
                  className="material-icons-outlined playlist-delete-btn"
                  onClick={() =>
                    deletePlaylistService(playlistId, token, dispatch)
                  }
                >
                  delete
                </i>
              </div>
            </div>
          );
        })}
    </div>
  );
};
