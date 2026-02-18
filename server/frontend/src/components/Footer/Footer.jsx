import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer mt-5">
      <div className="container py-5">
        <div className="row g-4">
          {/* Brand */}
          <div className="col-12 col-md-4">
            <div className="fw-bold fs-5">Best Cars Dealership</div>
            <div className="text-muted">Reviews • Transparency • Better car shopping</div>
            <div className="small text-muted mt-3">
               • Built with React + Django
            </div>
          </div>

          {/* Company */}
          <div className="col-6 col-md-2">
            <div className="fw-semibold mb-2">Company</div>
            <div className="d-flex flex-column gap-1">
              <Link to="/about" className="text-decoration-none">About</Link>
              <Link to="/contact" className="text-decoration-none">Contact</Link>
              <Link to="/careers" className="text-decoration-none">Careers</Link>
              <Link to="/press" className="text-decoration-none">Press</Link>
            </div>
          </div>

          {/* Help */}
          <div className="col-6 col-md-2">
            <div className="fw-semibold mb-2">Help</div>
            <div className="d-flex flex-column gap-1">
              <Link to="/faq" className="text-decoration-none">FAQ</Link>
              <Link to="/how-reviews-work" className="text-decoration-none">How reviews work</Link>
              <Link to="/tools" className="text-decoration-none">Tools</Link>
            </div>
          </div>

          {/* Legal */}
          <div className="col-6 col-md-2">
            <div className="fw-semibold mb-2">Legal</div>
            <div className="d-flex flex-column gap-1">
              <Link to="/privacy" className="text-decoration-none">Privacy</Link>
              <Link to="/terms" className="text-decoration-none">Terms</Link>
              <Link to="/cookies" className="text-decoration-none">Cookies</Link>
            </div>
          </div>

          {/* Contact + Social */}
          <div className="col-6 col-md-2">
            <div className="fw-semibold mb-2">Contact</div>
            <div className="text-muted small">
              support_bestcars@gmail.com
              <br />
              Timisoara, RO
            </div>

            <div className="fw-semibold mb-2 mt-3">Social</div>
            <div className="d-flex flex-column gap-1">
              {/* Replace with your real URLs */}
              <a className="text-decoration-none" href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a className="text-decoration-none" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="text-decoration-none" href="https://github.com/" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </div>
        </div>

        <hr className="border-opacity-25 my-4" />

        <div className="d-flex flex-column flex-md-row justify-content-between gap-2 small text-muted">
          <div>
            Disclaimer: Reviews reflect individual opinions and experiences. Always verify details with the dealership.
          </div>
          <div>
            {" "}
            {new Date().toLocaleDateString("ro-RO", { day: "2-digit", month: "long", year: "numeric" })}
          </div>
        </div>
      </div>
    </footer>
  );
}
