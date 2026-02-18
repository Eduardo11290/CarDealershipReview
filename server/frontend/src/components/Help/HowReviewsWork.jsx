import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function HowReviewsWork() {
  return (
    <>
      <Header />

      <div className="container py-5">
        <div className="fade-up">
          <h1 className="page-title mb-2">How reviews work</h1>
          <p className="page-subtitle">Transparency first. Here’s how we keep reviews useful and fair.</p>
        </div>

        <div className="row g-4 mt-2">
          <div className="col-12 col-lg-6 fade-up">
            <div className="card p-4 h-100" style={{ boxShadow: "var(--shadow)" }}>
              <h5 className="fw-semibold">What we encourage</h5>
              <ul className="text-muted mb-0">
                <li>Specific details (pricing clarity, communication, waiting time, paperwork)</li>
                <li>Balanced feedback (what went well + what didn’t)</li>
                <li>Real-world context (date, model, trade-in, finance, delivery timeline)</li>
              </ul>
            </div>
          </div>

          <div className="col-12 col-lg-6 fade-up">
            <div className="card p-4 h-100" style={{ boxShadow: "var(--shadow)" }}>
              <h5 className="fw-semibold">What we remove</h5>
              <ul className="text-muted mb-0">
                <li>Spam, ads, or duplicate posts</li>
                <li>Hate, harassment, threats, or slurs</li>
                <li>Personal data (phone numbers, addresses, IDs)</li>
                <li>Clearly fake content (made-up events, copy-paste patterns)</li>
              </ul>
            </div>
          </div>

          <div className="col-12 fade-up">
            <div className="card p-4" style={{ boxShadow: "var(--shadow)" }}>
              <h5 className="fw-semibold">Our next improvements (roadmap)</h5>
              <div className="text-muted">
                As the project grows, you can add stronger verification signals such as:
                <ul className="mt-2 mb-0">
                  <li>Verified interaction badge (invoice / appointment proof, manual or automated)</li>
                  <li>Dealer responses (right-to-reply) with moderation</li>
                  <li>“Helpful” votes and review sorting by relevance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
