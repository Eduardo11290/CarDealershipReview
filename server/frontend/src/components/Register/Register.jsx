import React, { useState } from "react";
import Header from "../Header/Header";
import { Link, useNavigate } from "react-router-dom";

const API =
  (process.env.REACT_APP_API_URL || "http://localhost:8000").replace(/\/$/, "");

export default function Register() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!firstName || !lastName || !userName || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API}/djangoapp/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          // MATCHES Django views.py registration()
          userName,
          password,
          firstName,
          lastName,
          email,
        }),
      });

      const data = await response.json().catch(() => ({}));

      // Django returns:
      // success: { userName: "...", status: "Authenticated" }
      // fail:    { userName: "...", error: "Already Registered" }
      if (!response.ok) {
        setError(`Registration failed (HTTP ${response.status}).`);
        setIsSubmitting(false);
        return;
      }

      if (data?.status === "Authenticated") {
        navigate("/login");
        return;
      }

      if (data?.error) {
        setError(data.error);
        setIsSubmitting(false);
        return;
      }

      setError("Registration failed.");
      setIsSubmitting(false);
    } catch (err) {
      setError("Server not reachable.");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-7 col-lg-5">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <h2 className="h4 mb-4 text-center">Create Account</h2>

                <form onSubmit={handleRegister}>
                  <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input
                      className="form-control"
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input
                      className="form-control"
                      placeholder="Last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                      className="form-control"
                      placeholder="Username"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  {error && (
                    <div className="alert alert-danger text-center">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-dark w-100 mb-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Registering..." : "Register"}
                  </button>
                </form>

                <p className="text-center mb-0">
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
