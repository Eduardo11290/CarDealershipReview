import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Careers() {
  return (
    <>
      <Header />

      <div className="container py-5">
        <div className="fade-up">
          <h1 className="page-title mb-2">Careers</h1>
          <p className="page-subtitle">
            Join us to build a more transparent car-buying experience.
          </p>
        </div>

        <div className="row g-4 mt-2">
          {/* Why work with us */}
          <div className="col-12 col-lg-7 fade-up">
            <div className="card p-4 h-100" style={{ boxShadow: "var(--shadow)" }}>
              <h5 className="fw-semibold mb-3">Why work with us</h5>
              <div className="text-muted">
                <p>
                  We’re building a reviews-first platform focused on trust,
                  clarity, and user experience. We care about clean UI, fast pages,
                  and meaningful features.
                </p>
                <ul className="mb-0">
                  <li>Real product problems (reviews, moderation, trust)</li>
                  <li>Modern stack (React + Django)</li>
                  <li>Clear ownership and visible impact</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quick facts */}
          <div className="col-12 col-lg-5 fade-up">
            <div className="card p-4 h-100" style={{ boxShadow: "var(--shadow)" }}>
              <h5 className="fw-semibold mb-3">Quick facts</h5>
              <div className="text-muted small">
                <div className="d-flex justify-content-between py-2 border-bottom border-opacity-25">
                  <span>Location</span>
                  <span className="fw-semibold">Remote / Timisoara</span>
                </div>
                <div className="d-flex justify-content-between py-2 border-bottom border-opacity-25">
                  <span>Type</span>
                  <span className="fw-semibold">Project / Portfolio</span>
                </div>
                <div className="d-flex justify-content-between py-2 border-bottom border-opacity-25">
                  <span>Focus</span>
                  <span className="fw-semibold">Web platform</span>
                </div>
                <div className="d-flex justify-content-between py-2">
                  <span>Email</span>
                  <span className="fw-semibold">careers_bestcars@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Open roles */}
          <div className="col-12 fade-up">
            <div className="card p-4" style={{ boxShadow: "var(--shadow)" }}>
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
                <div>
                  <h5 className="fw-semibold mb-1">Open roles</h5>
                  <div className="text-muted">
                    No official openings right now — but we’re always open to collaborating.
                  </div>
                </div>

                <a
                  className="btn btn-primary"
                  href="mailto:careers@bestcars.example?subject=Careers%20-%20Collaboration"
                >
                  Email us
                </a>
              </div>

              <hr className="border-opacity-25 my-4" />

              {/* “Role cards” even if empty - makes page feel real */}
              <div className="row g-3">
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="p-3 rounded-3 border" style={{ borderColor: "var(--border)" }}>
                    <div className="fw-semibold">Frontend (React)</div>
                    <div className="text-muted small">
                      UI polish, routing, components, accessibility, performance.
                    </div>
                    <div className="mt-2 text-muted small">
                      Status: <span className="fw-semibold">Closed</span>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-4">
                  <div className="p-3 rounded-3 border" style={{ borderColor: "var(--border)" }}>
                    <div className="fw-semibold">Backend (Django)</div>
                    <div className="text-muted small">
                      APIs, auth, moderation tools, database cleanup.
                    </div>
                    <div className="mt-2 text-muted small">
                      Status: <span className="fw-semibold">Closed</span>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-4">
                  <div className="p-3 rounded-3 border" style={{ borderColor: "var(--border)" }}>
                    <div className="fw-semibold">QA / Testing</div>
                    <div className="text-muted small">
                      Test plans, automation, bug triage, regression checks.
                    </div>
                    <div className="mt-2 text-muted small">
                      Status: <span className="fw-semibold">Closed</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-muted small mt-4">
                Tip: When you’re ready, you can turn these cards into real job posts and link to a form.
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
