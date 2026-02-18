import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Press() {
  return (
    <>
      <Header />

      <div className="container py-5">
        <div className="fade-up">
          <h1 className="page-title mb-2">Press</h1>
          <p className="page-subtitle">
            Product description, story, and media contact — everything in one place.
          </p>
        </div>

        <div className="row g-4 mt-2">
          {/* About */}
          <div className="col-12 col-lg-8 fade-up">
            <div className="card p-4 h-100" style={{ boxShadow: "var(--shadow)" }}>
              <h5 className="fw-semibold mb-3">About the project</h5>
              <div className="text-muted">
                <p>
                  Best Cars Dealership is a reviews platform designed to help people
                  choose dealerships with confidence. The goal is simple: make the car
                  buying experience more transparent and user-friendly.
                </p>

                <h6 className="fw-semibold mt-4">What we offer</h6>
                <ul className="mb-0">
                  <li>Dealership discovery and review browsing</li>
                  <li>User-submitted reviews and ratings</li>
                  <li>Tools page (finance calculator) to help planning</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Media contact */}
          <div className="col-12 col-lg-4 fade-up">
            <div className="card p-4 h-100" style={{ boxShadow: "var(--shadow)" }}>
              <h5 className="fw-semibold mb-3">Media contact</h5>
              <div className="text-muted small">
                <div className="mb-2">
                  Email: <span className="fw-semibold">press_bestcars@gmail.com</span>
                </div>
                <div className="mb-3">
                  Location: <span className="fw-semibold">Timisoara, RO</span>
                </div>

                <a
                  className="btn btn-outline-primary w-100"
                  href="mailto:press@bestcars.example?subject=Press%20Inquiry"
                >
                  Send email
                </a>

                <div className="text-muted mt-3">
                  For screenshots/logos, add a “media kit” folder later and link it here.
                </div>
              </div>
            </div>
          </div>

          {/* Press highlights */}
          <div className="col-12 fade-up">
            <div className="card p-4" style={{ boxShadow: "var(--shadow)" }}>
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
                <div>
                  <h5 className="fw-semibold mb-1">Press highlights</h5>
                  <div className="text-muted">
                    When you get mentions, list them here (title, outlet, date).
                  </div>
                </div>
              </div>

              <hr className="border-opacity-25 my-4" />

              <div className="row g-3">
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="p-3 rounded-3 border" style={{ borderColor: "var(--border)" }}>
                    <div className="fw-semibold">Feature placeholder</div>
                    <div className="text-muted small">
                      Outlet name • Month YYYY
                    </div>
                    <div className="text-muted small mt-2">
                      Add a short excerpt + a link.
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-4">
                  <div className="p-3 rounded-3 border" style={{ borderColor: "var(--border)" }}>
                    <div className="fw-semibold">Interview placeholder</div>
                    <div className="text-muted small">
                      Outlet name • Month YYYY
                    </div>
                    <div className="text-muted small mt-2">
                      Add the summary and link.
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-4">
                  <div className="p-3 rounded-3 border" style={{ borderColor: "var(--border)" }}>
                    <div className="fw-semibold">Announcement placeholder</div>
                    <div className="text-muted small">
                      Outlet name • Month YYYY
                    </div>
                    <div className="text-muted small mt-2">
                      Add release notes and link.
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-muted small mt-4">
                Tip: You can also embed a simple “Press release” section here when you ship big updates.
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
