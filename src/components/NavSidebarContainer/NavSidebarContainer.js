import React from "react";
import "./NavSidebarContainer.css";
import { Navbar } from "../Navbar/Navbar";
import { Sidebar } from "../Sidebar/Sidebar";

export const NavSidebarContainer = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="main-container">
        <Sidebar />
        {children}
      </main>
    </>
  );
};
