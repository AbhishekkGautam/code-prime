import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";
export const Navbar = () => {
  const {
    state: { isLoggedIn },
    logoutHandler,
  } = useAuth();

  const { pathname } = useLocation();

  return (
    <nav className="navbar nav-ecommerce">
      <div className="navbar-section">
        <button className="nav-menu-btn hide-on-desktop">
          <span className="material-icons">menu</span>
        </button>
        <Link className="navbar-brand" to="/">
          code <span className="brand-span">prime</span>
        </Link>
      </div>
      <div className="navbar-section">
        {pathname === "/login" || pathname === "/signup" ? null : (
          <form className="nav-form">
            <input
              type="search"
              placeholder="search"
              className="search-input"
              required
            />
            <button className="search-btn">
              <span className="material-icons">search</span>
            </button>
          </form>
        )}
      </div>
      <div className="navbar-section">
        {pathname === "/login" || pathname === "/signup" ? null : (
          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="nav-link search-icon-mobile">
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

        {pathname === "/login" || pathname === "/signup" ? null : isLoggedIn ? (
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
  );
};
