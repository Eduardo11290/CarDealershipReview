import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function About() {
  return (
    <>
      <Header />

      <div className="container py-4">
        <div className="card mx-auto about-card">
          <div className="banner" name="about-header">
            <h1>About Us</h1>
            <p>
              Welcome to Best Cars Dealership — a review-first platform built to make car shopping
              clearer, safer, and faster. We bring together dealership listings, real reviews, and
              transparent details so you can make confident decisions.
            </p>
          </div>

          {/* Scroll area */}
          <div className="p-4 about-scroll">
            {/* Quick stats */}
            <div className="row g-3 mb-4">
              <div className="col-12 col-md-4">
                <div className="card h-100 p-3">
                  <div className="fw-bold">Our Mission</div>
                  <div className="text-muted mt-1">
                    Help drivers compare dealerships honestly — with reviews that actually matter.
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="card h-100 p-3">
                  <div className="fw-bold">What We Track</div>
                  <div className="text-muted mt-1">
                    Pricing fairness, customer support, service quality, and overall trust signals.
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="card h-100 p-3">
                  <div className="fw-bold">Why It Works</div>
                  <div className="text-muted mt-1">
                    We combine dealership info with real feedback to surface patterns—not just stars.
                  </div>
                </div>
              </div>
            </div>

            {/* Values (your existing cards, but nicer layout) */}
            <div className="row g-3 mb-4">
              <div className="col-12 col-lg-4">
                <div className="card h-100">
                  <img className="card-img-top" src="/media/cars.jpeg" alt="Cars" />
                  <div className="card-body">
                    <h5 className="title">Quality</h5>
                    <p className="mb-0">
                      We focus on quality listings, clean data, and real customer experiences — not hype.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-4">
                <div className="card h-100">
                  <img className="card-img-top" src="/media/car_dealership.jpg" alt="Dealership" />
                  <div className="card-body">
                    <h5 className="title">Trust</h5>
                    <p className="mb-0">
                      Transparent reviews and dealership details you can rely on, with consistent formatting.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-4">
                <div className="card h-100">
                  <img className="card-img-top" src="/media/person.png" alt="Community" />
                  <div className="card-body">
                    <h5 className="title">Community</h5>
                    <p className="mb-0">
                      A community-driven platform that helps people shop smarter and avoid bad experiences.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* How it works */}
            <div className="card p-3 mb-4">
              <h4 className="mb-2">How it works</h4>
              <ol className="text-muted mb-0">
                <li className="mb-2">Browse dealerships and filter by location and rating.</li>
                <li className="mb-2">Read reviews to understand service quality and transparency.</li>
                <li className="mb-2">Compare dealerships and choose the one that matches your priorities.</li>
                <li>Leave your review to help others.</li>
              </ol>
            </div>

            {/* Gallery */}
            <div className="card p-3 mb-4">
              <h4 className="mb-3">Gallery</h4>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <img className="img-fluid rounded" src="/media/cars.jpeg" alt="Gallery 1" />
                </div>
                <div className="col-12 col-md-6">
                  <img className="img-fluid rounded" src="/media/car_dealership.jpg" alt="Gallery 2" />
                </div>
              </div>
              <div className="text-muted mt-3">
                Want to partner with us or feature your dealership? Contact our team from the Contact page.
              </div>
            </div>

            <div className="card p-3 mb-4">
              <h4 className="mb-2">Our story</h4>
              <p className="text-muted mb-2">
                Best Cars Dealership started from a simple problem: too many buyers wasted hours comparing dealerships
                without reliable information. We built a review-first experience that keeps the important details visible:
                location, service quality, transparency, and real customer feedback.
              </p>
              <p className="text-muted mb-0">
                Like the best automotive platforms, we focus on clarity and trust: consistent listings, clear navigation,
                and a clean design that works in both light and dark mode.
              </p>
            </div>

            <div className="card p-3 mb-4">
              <h4 className="mb-3">Milestones</h4>
              <div className="row g-3">
                <div className="col-12 col-md-4">
                  <div className="p-3 rounded" style={{ border: "1px solid var(--border)" }}>
                    <div className="fw-semibold">Phase 1</div>
                    <div className="text-muted">Dealership directory + basic filtering.</div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="p-3 rounded" style={{ border: "1px solid var(--border)" }}>
                    <div className="fw-semibold">Phase 2</div>
                    <div className="text-muted">Reviews, ratings, and better dealer details.</div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="p-3 rounded" style={{ border: "1px solid var(--border)" }}>
                    <div className="fw-semibold">Phase 3</div>
                    <div className="text-muted">Trust signals, moderation, and transparency tools.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="card p-3">
              <h4 className="mb-2">FAQ</h4>
              <div className="text-muted">
                <div className="fw-semibold">Do you remove negative reviews?</div>
                <div className="mb-3">
                  No. We keep honest feedback. We only remove spam or abusive content.
                </div>

                <div className="fw-semibold">Can dealerships respond?</div>
                <div className="mb-0">
                  Yes — transparency includes the right to clarify and improve.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
