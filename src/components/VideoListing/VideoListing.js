import React from "react";
import "./VideoListing.css";
import { Link } from "react-router-dom";
import {
  viewsFormatter,
  timeAgoFormatter,
  thumbnailGenerator,
  trimExtraChars,
} from "../../utils";
import { MoreOptionsModal } from "../MoreOptionsModal/MoreOptionsModal";
import { addVideoToHistoryService } from "../../services";
import { useAuth } from "../../context/AuthContext";
import { useVideoContext } from "../../context/VideoContext";
import { ADD_VIDEO_TO_HISTORY } from "../../reducers/actions";
import { deleteVideoFromHistoryService } from "../../services/history/historyService";

export const VideoListing = ({ videos, playlistId }) => {
  const {
    state: { token, isLoggedIn },
  } = useAuth();
  const {
    state: { history },
    dispatch,
  } = useVideoContext();

  const historyHandler = (video, videoId) => {
    if (token !== "" && isLoggedIn) {
      let alreadyInHistory = history?.find(video => video._id === videoId);
      if (alreadyInHistory) {
        const filteredHistory = history.filter(video => video._id !== videoId);
        dispatch({
          type: ADD_VIDEO_TO_HISTORY,
          payload: [...filteredHistory, { ...video }],
        });
      } else {
        return addVideoToHistoryService(video, token, dispatch);
      }
    }
  };

  return (
    <div className="videos-container">
      {videos &&
        videos.map(video => {
          const {
            _id: videoId,
            title,
            channelName,
            views,
            uploadedOn,
            avatar,
          } = video;
          return (
            <div className="video" key={videoId}>
              <Link
                to={`/watch/${videoId}`}
                className="thumbnail"
                onClick={() => historyHandler(video, videoId)}
              >
                <img
                  className="img-responsive"
                  src={thumbnailGenerator(videoId)}
                  alt={title}
                />
              </Link>
              <div className="video-details">
                <div className="info-container">
                  <img className="avatar" src={avatar} alt={channelName} />
                  <div className="video-info">
                    <h3 className="video-title">{trimExtraChars(title, 50)}</h3>
                    <span>{channelName}</span>
                    <span>
                      {viewsFormatter(views)} views •{" "}
                      {timeAgoFormatter(uploadedOn)}
                    </span>
                  </div>
                </div>
                <MoreOptionsModal
                  video={video}
                  videos={videos}
                  videoId={videoId}
                  playlistId={playlistId}
                  componentPath="/history"
                  deleteOptionName="Remove from History"
                  deleteIconHandler={() =>
                    deleteVideoFromHistoryService(videoId, token, dispatch)
                  }
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};
