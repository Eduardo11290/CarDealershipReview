import React from "react";
import "../assets/style.css";
import "../assets/bootstrap.min.css";

const API = (process.env.REACT_APP_API_URL || "").replace(/\/$/, "");

const Header = () => {
  const logout = async (e) => {
    e.preventDefault();

    const logout_url = `${API}/djangoapp/logout`;

    const res = await fetch(logout_url, {
      method: "GET",
      credentials: "include",
    });

    const json = await res.json();
    if (json) {
      const username = sessionStorage.getItem("username");
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("firstname");
      sessionStorage.removeItem("lastname");
      alert("Logging out " + username + "...");
      window.location.href = "/";
    } else {
      alert("The user could not be logged out.");
    }
  };

  let home_page_items = <div></div>;
  const curr_user = sessionStorage.getItem("username");

  if (curr_user) {
    home_page_items = (
      <div className="input_panel">
        <span className="username">{curr_user}</span>
        <a className="nav_item" href="/" onClick={logout}>
          Logout
        </a>
      </div>
    );
  } else {
    home_page_items = (
      <div className="input_panel">
        <a className="nav_item" href="/login">
          Login
        </a>
        <a className="nav_item" href="/register">
          Register
        </a>
      </div>
    );
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "darkturquoise", height: "1in" }}>
        <div className="container-fluid">
          <h2 style={{ paddingRight: "5%" }}>Dealerships</h2>

          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" style={{ fontSize: "larger" }} aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" style={{ fontSize: "larger" }} href="/about">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" style={{ fontSize: "larger" }} href="/contact">
                  Contact Us
                </a>
              </li>
            </ul>

            <span className="navbar-text">
              <div className="loginlink" id="loginlogout">
                {home_page_items}
              </div>
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
