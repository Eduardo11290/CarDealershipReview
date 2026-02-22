import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Header from "../Header/Header";

const API = (process.env.REACT_APP_API_URL || "http://localhost:8000").replace(
  /\/$/,
  ""
);

export default function ResetPassword() {
  const navigate = useNavigate();
  const { uidb64, token } = useParams();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!password || !password2) {
      setError("Please fill in both password fields.");
      return;
    }
    if (password !== password2) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(
        `${API}/djangoapp/password-reset-confirm/${uidb64}/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ password, password2 }),
        }
      );

      const json = await res.json().catch(() => ({}));

      if (res.ok && json.ok) {
        navigate("/login");
        return;
      }

      setError(json.message || "Invalid or expired link.");
    } catch (err) {
      setError("Server not reachable. Please try again.");
    } finally {
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
                <h2 className="h4 mb-4 text-center">Reset password</h2>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">New password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="New password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Confirm password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm password"
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                      required
                    />
                  </div>

                  {error && (
                    <div className="alert alert-danger text-center">{error}</div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-dark w-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Change password"}
                  </button>
                </form>

                <p className="text-center mt-3 mb-0">
                  <Link to="/login">Back to login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}