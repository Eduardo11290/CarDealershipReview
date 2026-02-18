import React, { useState } from "react";
import "./Login.css";
import Header from "../Header/Header";

const API = (process.env.REACT_APP_API_URL || "http://localhost:8000").replace(/\/$/, "");

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login_url = `${API}/djangoapp/login`;

  const login = async (e) => {
    e.preventDefault();

    const res = await fetch(login_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ userName, password }),
    });

    const json = await res.json();

    if (json.status !== null && json.status === "Authenticated") {
      sessionStorage.setItem("username", userName);
      if (json.first_name) sessionStorage.setItem("firstname", json.first_name);
      if (json.last_name) sessionStorage.setItem("lastname", json.last_name);
      window.location.href = "/";
      return;
    }

    alert("Login failed. Check username/password.");
  };

  return (
    <div>
      <Header />
      <div className="login_panel">
        <h2>Login</h2>
        <form onSubmit={login}>
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>

        <div style={{ marginTop: 10 }}>
          <a href="/register">Create account</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
