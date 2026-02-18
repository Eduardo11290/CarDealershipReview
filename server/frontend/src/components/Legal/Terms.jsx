import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Terms() {
  return (
    <>
      <Header />

      <div className="container py-5">
        <div className="fade-up">
          <h1 className="page-title mb-2">Terms of Service</h1>
          <p className="page-subtitle">Template page. Replace with real legal terms before production.</p>
        </div>

        <div className="card p-4 mt-3" style={{ boxShadow: "var(--shadow)" }}>
          <h5 className="fw-semibold">Using the site</h5>
          <ul className="text-muted">
            <li>Be respectful. No harassment, hate, or personal data.</li>
            <li>Post honest experiences. No fake reviews or spam.</li>
            <li>We may remove content that breaks the rules.</li>
          </ul>

          <h5 className="fw-semibold mt-4">Disclaimer</h5>
          <p className="text-muted">Reviews are opinions from users. Always verify details with the dealership.</p>

          <h5 className="fw-semibold mt-4">Contact</h5>
          <p className="text-muted mb-0">Questions? Email support@bestcars.example</p>
        </div>
      </div>

      <Footer />
    </>
  );
}
