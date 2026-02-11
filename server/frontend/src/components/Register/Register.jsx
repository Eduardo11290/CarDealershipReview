import React from "react";
import Header from "../Header/Header";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <>
      <Header />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-7 col-lg-5">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <h2 className="h4 mb-4 text-center">Create Account</h2>

                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input className="form-control" placeholder="First name" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input className="form-control" placeholder="Last name" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input className="form-control" placeholder="Username" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" placeholder="you@example.com" />
                </div>

                <div className="mb-4">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" placeholder="Password" />
                </div>

                <button className="btn btn-dark w-100 mb-3">
                  Register
                </button>

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
