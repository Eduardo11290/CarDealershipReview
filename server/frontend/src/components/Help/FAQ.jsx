import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const FAQS = [
  { q: "Do I need an account to post a review?", a: "Depending on your current setup, you may need to log in to post. Reading reviews is always available." },
  { q: "Can dealerships remove negative reviews?", a: "No. Reviews are only removed if they break the rules (spam, hate, harassment, personal data, or clearly fake content)." },
  { q: "How do you prevent fake reviews?", a: "We encourage specific, experience-based reviews and review reports for spam. Next steps can include stronger verification options." },
  { q: "Can I edit or delete my review?", a: "If you add a profile page later, you can support edit/delete. For now, contact support if you need a change." },
  { q: "What makes a review helpful?", a: "Details: pricing transparency, communication, waiting time, paperwork, post-sale support, and what you would do differently." },
];

export default function FAQ() {
  return (
    <>
      <Header />

      <div className="container py-5">
        <div className="fade-up">
          <h1 className="page-title mb-2">FAQ</h1>
          <p className="page-subtitle">Quick answers about reviews, moderation, and how the platform works.</p>
        </div>

        <div className="row g-4 mt-2">
          {FAQS.map((item) => (
            <div className="col-12 col-lg-6 fade-up" key={item.q}>
              <div className="card p-4 h-100 hover-lift" style={{ boxShadow: "var(--shadow)" }}>
                <div className="fw-semibold mb-2">{item.q}</div>
                <div className="text-muted">{item.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
