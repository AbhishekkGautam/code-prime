import React from "react";
import "./Trending.css";
import { NavSidebarContainer } from "../../components";
import { TrendingList } from "./TrendingList";

export const Trending = () => {
  return (
    <NavSidebarContainer>
      <div className="trending-videos-list">
        <p className="trending-top-title">
          <span>Trending</span>
          <i className="material-icons">local_fire_department</i>
        </p>
        <TrendingList />
      </div>
    </NavSidebarContainer>
  );
};
