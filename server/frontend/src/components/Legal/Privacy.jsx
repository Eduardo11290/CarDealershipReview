import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Privacy() {
  return (
    <>
      <Header />

      <div className="container py-5">
        <div className="fade-up">
          <h1 className="page-title mb-2">Privacy Policy</h1>
          <p className="page-subtitle">Template page. Replace with a real policy before production.</p>
        </div>

        <div className="card p-4 mt-3" style={{ boxShadow: "var(--shadow)" }}>
          <h5 className="fw-semibold">What we collect</h5>
          <ul className="text-muted">
            <li>Account details (name/email) when you register</li>
            <li>Review content you submit</li>
            <li>Basic technical logs (errors, performance)</li>
          </ul>

          <h5 className="fw-semibold mt-4">How we use it</h5>
          <ul className="text-muted">
            <li>To provide login and posting functionality</li>
            <li>To display reviews and dealership information</li>
            <li>To prevent abuse and improve the platform</li>
          </ul>

          <h5 className="fw-semibold mt-4">Your choices</h5>
          <p className="text-muted mb-0">You can request corrections or deletion by contacting support.</p>
        </div>
      </div>

      <Footer />
    </>
  );
}
