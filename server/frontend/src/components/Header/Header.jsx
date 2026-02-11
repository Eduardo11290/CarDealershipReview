import React, { useCallback, useContext, useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../theme/ThemeProvider";

const API = (process.env.REACT_APP_API_URL || "").replace(/\/$/, "");

function linkClass({ isActive }) {
  return `nav-link ${isActive ? "active fw-semibold" : ""}`;
}

export default function Header() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const currUser = sessionStorage.getItem("username");

  const logoutUrl = useMemo(() => `${API}/djangoapp/logout`, []);

  const logout = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        const res = await fetch(logoutUrl, {
          method: "GET",
          credentials: "include",
        });

        const json = await res.json();

        if (json) {
          const username = sessionStorage.getItem("username");

          sessionStorage.removeItem("username");
          sessionStorage.removeItem("firstname");
          sessionStorage.removeItem("lastname");

          // eslint-disable-next-line no-alert
          alert(`Logging out ${username || ""}...`);

          navigate("/", { replace: true });
        } else {
          // eslint-disable-next-line no-alert
          alert("The user could not be logged out.");
        }
      } catch (err) {
        // eslint-disable-next-line no-alert
        alert("Logout failed. Try again.");
      }
    },
    [logoutUrl, navigate]
  );

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        {/* Brand */}
        <NavLink className="navbar-brand fw-bold" to="/">
          Best Cars Dealership
        </NavLink>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Nav Content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Left Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={linkClass} to="/">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className={linkClass} to="/dealers">
                Dealerships
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className={linkClass} to="/about">
                About Us
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className={linkClass} to="/contact">
                Contact Us
              </NavLink>
            </li>
          </ul>

          {/* Right Side */}
          <div className="d-flex gap-2 align-items-center">
            {/* Theme Toggle */}
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {theme === "dark" ? "☀" : "☾"}
            </button>

            {currUser ? (
              <>
                <span className="fw-semibold">{currUser}</span>
                <a
                  href="/"
                  onClick={logout}
                  className="btn btn-outline-premium btn-sm"
                >
                  Logout
                </a>
              </>
            ) : (
              <>
                <NavLink
                  className="btn btn-outline-premium btn-sm"
                  to="/login"
                >
                  Login
                </NavLink>

                <NavLink
                  className="btn btn-premium btn-sm"
                  to="/register"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
