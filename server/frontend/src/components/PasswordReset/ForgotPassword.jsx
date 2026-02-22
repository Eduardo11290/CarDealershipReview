import React, { useState } from "react";
import { Link } from "react-router-dom";

import Header from "../Header/Header";

const API = (process.env.REACT_APP_API_URL || "http://localhost:8000").replace(
  /\/$/,
  ""
);

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    if (!email.trim()) {
      setStatus("Please enter your email.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`${API}/djangoapp/password-reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: email.trim() }),
      });

      if (res.ok) {
        setStatus(
          "If an account exists for that email, we sent a reset link. Check your inbox."
        );
      } else {
        setStatus("Could not process request. Please try again.");
      }
    } catch (err) {
      setStatus("Server not reachable. Please try again.");
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
                <h2 className="h4 mb-3 text-center">Forgot your password?</h2>
                <p className="text-center mb-4">
                  Enter your email and we&apos;ll send you a reset link.
                </p>

                <form onSubmit={handleSubmit}>
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

                  {status && (
                    <div className="alert alert-info text-center">{status}</div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-dark w-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send reset link"}
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