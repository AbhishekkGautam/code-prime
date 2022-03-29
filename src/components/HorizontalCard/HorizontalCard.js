import React from "react";
import "./Horizontal.css";
import {
  viewsFormatter,
  thumbnailGenerator,
  trimExtraChars,
} from "../../utils";
import { MoreOptionsModal } from "../MoreOptionsModal/MoreOptionsModal";

export const HorizontalCard = ({ trendingVideo }) => {
  const {
    _id: videoId,
    title,
    channelName,
    views,
    description,
  } = trendingVideo;
  return (
    <div className="trending-video" key={videoId}>
      <div className="thumbnail">
        <img
          className="img-responsive"
          src={thumbnailGenerator(videoId)}
          alt={title}
        />
      </div>
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
        <MoreOptionsModal />
      </div>
    </div>
  );
};
