import React from "react";
import "./VideoListing.css";
import { useVideo } from "../../context/VideoContext";
import {
  viewsFormatter,
  timeAgoFormatter,
  thumbnailGenerator,
  trimExtraChars,
} from "../../utils";
import { MoreOptionsModal } from "./MoreOptionsModal";

export const VideoListing = () => {
  const {
    state: { videos, loading, error },
  } = useVideo();

  return (
    <div className="videos-container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        videos &&
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
              <div className="thumbnail">
                <img
                  className="img-responsive"
                  src={thumbnailGenerator(videoId)}
                  alt={title}
                />
              </div>
              <div className="video-details">
                <div className="info-container">
                  <img className="avatar" src={avatar} alt={channelName} />
                  <div className="video-info">
                    <h3 className="video-title">{trimExtraChars(title)}</h3>
                    <span>{channelName}</span>
                    <span>
                      {viewsFormatter(views)} views •{" "}
                      {timeAgoFormatter(uploadedOn)}
                    </span>
                  </div>
                </div>
                <MoreOptionsModal />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
