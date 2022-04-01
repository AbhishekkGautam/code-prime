import React from "react";
import { Navbar } from "../../components";
import "./VideoDetail.css";
import { useParams, useNavigate } from "react-router";
import { RiShareForwardLine } from "react-icons/ri";
import { getVideoDetailsById } from "../../helpers";
import { useVideoContext } from "../../context/VideoContext";
import { useAuth } from "../../context/AuthContext";
import { viewsFormatter, timeAgoFormatter } from "../../utils";
import { toggleLike } from "../../services";

export const VideoDetail = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const {
    state: { videos, likedVideos },
    dispatch,
  } = useVideoContext();

  const {
    state: { token },
  } = useAuth();

  const videoInfo = getVideoDetailsById(videos, videoId);

  const { _id, title, views, uploadedOn, avatar, channelName, description } =
    videoInfo || {};

  const isVideoAlreadyLiked = likedVideos?.find(
    likedVideo => likedVideo._id === _id
  );

  return (
    <main>
      <Navbar />
      <div className="single-video-wrapper">
        <div className="single-video-container">
          <div className="video-container">
            <div className="iframe-container">
              <iframe
                className="video-iframe"
                src={`https://www.youtube.com/embed/${videoId}?amp;autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-info-container">
              <h3 className="video-title">{title}</h3>
              <div className="stats-and-action-icons">
                <span>
                  {viewsFormatter(views)} views • {timeAgoFormatter(uploadedOn)}
                </span>
                <div className="action-icons-wrapper">
                  <button
                    className="action-icon-btn"
                    onClick={() =>
                      token
                        ? toggleLike(
                            isVideoAlreadyLiked,
                            token,
                            videoInfo,
                            _id,
                            dispatch
                          )
                        : navigate("/login")
                    }
                  >
                    {isVideoAlreadyLiked ? (
                      <>
                        <i className="material-icons liked-icon">thumb_up</i>
                        <span className="liked-icon">Liked</span>
                      </>
                    ) : (
                      <>
                        <i className="material-icons-outlined">thumb_up</i>
                        <span>Like</span>
                      </>
                    )}
                  </button>
                  <button className="action-icon-btn">
                    <RiShareForwardLine className="material-icons-outlined" />
                    <span>Share</span>
                  </button>
                  <button className="action-icon-btn">
                    <i className="material-icons-outlined">watch_later</i>
                    <span>Watch later</span>
                  </button>
                  <button className="action-icon-btn">
                    <i className="material-icons-outlined">playlist_add</i>
                    <span>Save to playlist</span>
                  </button>
                </div>
              </div>
            </div>
            <hr />
            <div className="creator-profile-container">
              <div className="channel-info">
                <img className="avatar" src={avatar} alt={channelName} />
                <span className="creator-name">{channelName}</span>
              </div>
              <a
                href={`https://youtube.com/${channelName}`}
                target="_blank"
                className="btn btn-primary visit-channel-btn"
                rel="noreferrer"
              >
                VISIT CHANNEL
              </a>
            </div>
            <div className="single-video-description">
              <span>{description}</span>
            </div>
          </div>
          <div className="note-container">
            <p className="text-normal">Take Notes...✍️ </p>
            <hr />
          </div>
        </div>
      </div>
    </main>
  );
};
