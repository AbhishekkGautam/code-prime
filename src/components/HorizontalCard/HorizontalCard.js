import React from "react";

import { Link } from "react-router-dom";
import "./Horizontal.css";
import {
  viewsFormatter,
  thumbnailGenerator,
  trimExtraChars,
} from "../../utils";
import { MoreOptionsModal } from "../MoreOptionsModal/MoreOptionsModal";
import { addVideoToHistoryService } from "../../services";
import { useAuth } from "../../context/AuthContext";
import { useVideoContext } from "../../context/VideoContext";
import { ADD_VIDEO_TO_HISTORY } from "../../reducers/actions";

export const HorizontalCard = ({ trendingVideo }) => {
  const {
    state: { token },
  } = useAuth();
  const {
    state: { history },
    dispatch,
  } = useVideoContext();

  const historyHandler = (video, videoId) => {
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
  };
  const {
    _id: videoId,
    title,
    channelName,
    views,
    description,
  } = trendingVideo;
  return (
    <div className="trending-video" key={videoId}>
      <Link
        to={`/watch/${videoId}`}
        className="thumbnail"
        onClick={() => historyHandler(trendingVideo, videoId)}
      >
        <img
          className="horizontal img-responsive"
          src={thumbnailGenerator(videoId)}
          alt={title}
        />
      </Link>

      <div className="video-details">
        <div className="info-container">
          <div className="video-info">
            <h3 className="video-title">{trimExtraChars(title, 50)}</h3>
            <span></span>
            <span>
              {channelName} • {viewsFormatter(views)} views
            </span>
            <p class="video-description hide-on-mobile">{description}</p>
          </div>
        </div>
        <MoreOptionsModal video={trendingVideo} videoId={videoId} />
      </div>
    </div>
  );
};
