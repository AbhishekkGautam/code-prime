import React from "react";
import { NavSidebarContainer, VideoListing } from "../../components";
import "./Home.css";
export const Home = () => {
  return (
    <NavSidebarContainer>
      <div className="">
        <div class="category-tags-container">
          <button class="category-tag active">all</button>
          <button class="category-tag">HTML</button>
          <button class="category-tag">CSS</button>
          <button class="category-tag">Javascript</button>
          <button class="category-tag">ReactJS</button>
          <button class="category-tag">NodeJS</button>
          <button class="category-tag">MongoDB</button>
          <button class="category-tag">Firebase</button>
          <button class="category-tag">Data Structure</button>
          <button class="category-tag">DevOps</button>
        </div>
        <div className="videos-list">
          <VideoListing />
        </div>
      </div>
    </NavSidebarContainer>
  );
};
