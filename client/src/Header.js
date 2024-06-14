import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { FaBars } from "react-icons/fa";
import logo from "./logo.png";

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  function handleLogout() {
    fetch(`${process.env.REACT_APP_API_URL}/api/auth/logout`, {
      credentials: "include",
      method: "POST",
    })
      .then((res) => {
        if (res.ok) {
          setUserInfo(null);
          navigate("/"); // Redirect to home page after logout
        } else {
          console.error("Logout request failed.");
        }
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  }

  const username = userInfo?.username;

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className={`header ${isNavOpen ? "nav-open" : ""}`}>
      <div className="wrap-container">
        <div className="header-container">
          <Link to="/" className="logo">
            <img src={logo} alt="logo" />
          </Link>
          <div className="hamburger" onClick={toggleNav}>
            <FaBars />
          </div>
        </div>
        <nav className={`nav-links ${isNavOpen ? "open" : ""}`}>
          {username ? (
            <>
              <span>Hello {username}!</span>
              <Link to="/create" onClick={toggleNav}>
                New Post
              </Link>
              <a
                onClick={() => {
                  handleLogout();
                  toggleNav();
                }}
              >
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login" onClick={toggleNav}>
                Login
              </Link>
              <Link to="/register" onClick={toggleNav}>
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
