import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer mt-5">
      <div className="container py-4 d-flex flex-column flex-md-row justify-content-between gap-3">
        <div>
          <div className="fw-bold">Best Cars Dealership</div>
          <div className="text-muted">Reviews • Transparency • Better car shopping</div>
        </div>

        <div className="d-flex gap-3 flex-wrap">
          <Link to="/" className="text-decoration-none">
            Home
          </Link>
          <Link to="/dealers" className="text-decoration-none">
            Dealerships
          </Link>
          <Link to="/about" className="text-decoration-none">
            About
          </Link>
          <Link to="/contact" className="text-decoration-none">
            Contact
          </Link>
        </div>

        <div className="text-muted">
          © {new Date().toLocaleDateString("ro-RO", { day: "2-digit", month: "long", year: "numeric" })}
        </div>

      </div>
    </footer>
  );
}
