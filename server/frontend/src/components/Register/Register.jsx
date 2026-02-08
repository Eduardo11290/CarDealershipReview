import React, { useState } from "react";
import "./Register.css";
import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import close_icon from "../assets/close.png";

const API = (process.env.REACT_APP_API_URL || "").replace(/\/$/, "");

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");

  const gohome = () => {
    window.location.href = "/";
  };

  const register = async (e) => {
    e.preventDefault();

    const register_url = `${API}/djangoapp/register`;

    const res = await fetch(register_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        userName,
        password,
        email,
        firstName,
        lastName,
      }),
    });

    const json = await res.json();

    if (json.status === 200) {
      alert("Registered successfully. Please login.");
      window.location.href = "/login";
      return;
    }

    alert("Registration failed.");
  };

  return (
    <div className="register_container">
      <div className="register_header">
        <h2>Register</h2>
        <img src={close_icon} alt="close" onClick={gohome} style={{ cursor: "pointer" }} />
      </div>

      <form onSubmit={register}>
        <div className="input">
          <img src={user_icon} alt="user" />
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="input">
          <img src={email_icon} alt="email" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input">
          <img src={user_icon} alt="first" />
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="input">
          <img src={user_icon} alt="last" />
          <input
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
          />
        </div>

        <div className="input">
          <img src={password_icon} alt="pass" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
