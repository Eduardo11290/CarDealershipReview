import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <section className="hero-wrap py-5">
        <div className="hero-glow" />
        <div className="container text-center fade-up">
          <h1 className="display-5 fw-bold mb-3">Best Cars Dealership</h1>
          <p className="lead mb-4 text-muted">
            A premium place to discover dealerships, explore cars, and share real customer experiences.
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/dealers" className="btn btn-premium btn-lg">
              Browse Dealerships
            </Link>
            <Link to="/about" className="btn btn-outline-premium btn-lg">
              Who we are
            </Link>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-md-6 fade-up">
              <img
                src="/media/car_dealership.jpg"
                alt="Dealership"
                className="img-fluid rounded"
                style={{ boxShadow: "var(--shadow)" }}
              />
            </div>
            <div className="col-md-6 fade-up">
              <h2 className="fw-bold mb-3">Who we are</h2>
              <p className="text-muted">
                We’re building a community-driven platform to make car shopping simpler and more transparent.
                Compare dealerships, read honest reviews, and make confident decisions.
              </p>
              <p className="text-muted mb-0">
                Our goal: less guessing, fewer surprises, better outcomes.
              </p>
            </div>
          </div>

          <div className="row g-4 mt-4">
            <div className="col-md-4 fade-up">
              <div className="card p-4 hover-lift h-100">
                <h5 className="fw-semibold">Explore dealerships</h5>
                <p className="text-muted mb-0">Find dealers, view details, and see what others experienced.</p>
              </div>
            </div>
            <div className="col-md-4 fade-up">
              <div className="card p-4 hover-lift h-100">
                <h5 className="fw-semibold">Read real reviews</h5>
                <p className="text-muted mb-0">No fluff—just genuine feedback from real customers.</p>
              </div>
            </div>
            <div className="col-md-4 fade-up">
              <div className="card p-4 hover-lift h-100">
                <h5 className="fw-semibold">Share your experience</h5>
                <p className="text-muted mb-0">Help others by posting your own review after a visit.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
