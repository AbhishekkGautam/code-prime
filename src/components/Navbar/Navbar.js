import React, { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import "./Navbar.css";
import { useAuth } from "../../context/AuthContext";
import { MobileSidebar } from "../MobileSidebar/MobileSidebar";
import { useVideoContext } from "../../context/VideoContext";
export const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    state: { isLoggedIn },
    logoutHandler,
  } = useAuth();

  const { dispatch } = useVideoContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { videoId } = useParams();

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const toggleSearchModal = () => {
    setShowSearchModal(!showSearchModal);
  };

  const searchBtnHandler = () => {
    if (pathname === "/") {
      dispatch({ type: "FILTER_BY_SEARCH", payload: searchQuery });
      dispatch({ type: "FILTER_BY_CATEGORY", payload: "All" });
    } else {
      dispatch({ type: "FILTER_BY_SEARCH", payload: searchQuery });
      dispatch({ type: "FILTER_BY_CATEGORY", payload: "All" });
      navigate("/");
    }
  };

  return (
    <>
      <nav className="navbar nav-ecommerce">
        <div className="navbar-section">
          {pathname === `/watch/${videoId}` ? (
            <button
              className="nav-menu-btn menu-btn-single-video"
              onClick={toggleSidebar}
            >
              {showSidebar ? (
                <span className="material-icons">close</span>
              ) : (
                <span className="material-icons">menu</span>
              )}
            </button>
          ) : null}
          <button
            className="nav-menu-btn hide-on-desktop"
            onClick={toggleSidebar}
          >
            {showSidebar ? (
              <span className="material-icons">close</span>
            ) : (
              <span className="material-icons">menu</span>
            )}
          </button>
          <Link className="navbar-brand" to="/">
            code <span className="brand-span">prime</span>
          </Link>
        </div>
        <div className="navbar-section">
          {pathname === "/login" || pathname === "/signup" ? null : (
            <form className="nav-form" onSubmit={e => e.preventDefault()}>
              <input
                type="search"
                placeholder="search"
                className="search-input"
                value={searchQuery || ""}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <button className="search-btn" onClick={searchBtnHandler}>
                <span className="material-icons">search</span>
              </button>
            </form>
          )}
        </div>
        <div className="navbar-section">
          {pathname === "/login" || pathname === "/signup" ? null : (
            <ul className="navbar-nav">
              <li className="nav-item">
                <button
                  className="nav-link search-icon-mobile"
                  onClick={toggleSearchModal}
                >
                  <span className="material-icons-outlined">search</span>
                </button>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  <IoPersonCircleSharp className="person-icon" />
                </Link>
              </li>
            </ul>
          )}

          {pathname === "/login" ||
          pathname === "/signup" ? null : isLoggedIn ? (
            <button
              onClick={logoutHandler}
              className="btn login-btn btn-sm ml-1 hide-on-mobile"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="btn login-btn btn-sm ml-1 hide-on-mobile"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
      <div
        className={showSearchModal ? "search-modal-bg" : "search-modal-bg hide"}
      >
        <div
          className={
            showSearchModal
              ? "slide-modal search-modal slide-modal-show"
              : "search-modal slide-modal"
          }
        >
          <div className="search-modal-top">
            <p className="search-modal-title">
              Search videos related to coding.
            </p>
            <IoClose onClick={toggleSearchModal} />
          </div>
          <div className="">
            <form
              className="search-mobile nav-form"
              onSubmit={e => e.preventDefault()}
            >
              <input
                type="search"
                placeholder="search..."
                className="search-input"
                value={searchQuery || ""}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <button
                className="search-btn"
                onClick={() => {
                  searchBtnHandler();
                  toggleSearchModal();
                }}
              >
                <span className="material-icons">search</span>
              </button>
            </form>
          </div>
        </div>
      </div>
      <MobileSidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
    </>
  );
};
