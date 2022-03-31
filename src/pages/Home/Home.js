import React, { useState, useEffect } from "react";
import { NavSidebarContainer, VideoListing } from "../../components";
import { useVideoContext } from "../../context/VideoContext";
import { getUniqueValues, getFilteredVideos } from "../../helpers";
import "./Home.css";
export const Home = () => {
  const [uniqueCategories, setUniqueCategories] = useState();
  const { state, dispatch } = useVideoContext();
  const { videos, loading, error, filters } = state;

  useEffect(() => {
    setUniqueCategories(getUniqueValues(videos, "categoryName"));
  }, [videos]);

  const filteredVideos = getFilteredVideos(videos, state);

  return (
    <NavSidebarContainer>
      <div className="category-tags-container">
        {uniqueCategories?.map((uniqueCategory, id) => {
          return (
            <button
              onClick={() =>
                dispatch({
                  type: "FILTER_BY_CATEGORY",
                  payload: uniqueCategory,
                })
              }
              className={`category-tag ${
                filters.category === uniqueCategory && "active"
              }`}
              key={id}
            >
              {uniqueCategory}
            </button>
          );
        })}
      </div>
      <div className="videos-list">
        {loading ? (
          <div className="loader-container">Loading...</div>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <VideoListing videos={filteredVideos} />
        )}
      </div>
    </NavSidebarContainer>
  );
};
