import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Home() {
  const stats = useMemo(
    () => [
      { value: "1,200+", label: "Reviews posted" },
      { value: "350+", label: "Dealerships listed" },
      { value: "24/7", label: "Access & updates" },
      { value: "100%", label: "Community-driven" },
    ],
    []
  );

  const features = useMemo(
    () => [
      {
        title: "Compare dealerships",
        desc: "See ratings, review highlights, and common themes before you visit.",
        icon: "🧭",
      },
      {
        title: "Real customer stories",
        desc: "Read honest feedback about pricing, communication, waiting time, and transparency.",
        icon: "💬",
      },
      {
        title: "Explore car models",
        desc: "Browse models and learn what people say about availability and test drives.",
        icon: "🚗",
      },
      {
        title: "Share your experience",
        desc: "Help others by posting your review—quick form, clear categories, and fair moderation.",
        icon: "✍️",
      },
      {
        title: "Quality & trust",
        desc: "We focus on meaningful reviews and reduce spam so ratings stay useful.",
        icon: "🛡️",
      },
      {
        title: "Fast search",
        desc: "Find dealers by name and location, then filter by rating or review count.",
        icon: "⚡",
      },
    ],
    []
  );

  const steps = useMemo(
    () => [
      {
        step: "01",
        title: "Browse dealers",
        desc: "Start with the best-rated dealerships or search your city.",
      },
      {
        step: "02",
        title: "Read real reviews",
        desc: "Look for patterns: pricing clarity, professionalism, post-sale support.",
      },
      {
        step: "03",
        title: "Visit with confidence",
        desc: "Arrive prepared and ask the right questions based on what others experienced.",
      },
      {
        step: "04",
        title: "Post your review",
        desc: "Share what happened—help the next person avoid surprises.",
      },
    ],
    []
  );

  const testimonials = useMemo(
    () => [
      {
        name: "Alex",
        title: "First-time buyer",
        quote:
          "The reviews helped me spot the dealerships that were transparent about pricing. Saved me a lot of time.",
      },
      {
        name: "Mara",
        title: "Upgrading my car",
        quote:
          "I liked the short, structured reviews. Easy to compare experiences without reading novels.",
      },
      {
        name: "Radu",
        title: "Weekend shopper",
        quote:
          "The platform feels clean and simple. I found a dealer with great feedback and had a smooth visit.",
      },
    ],
    []
  );

  const faqs = useMemo(
    () => [
      {
        q: "Are reviews verified?",
        a: "We encourage detailed, experience-based reviews and remove obvious spam. As we evolve, we’ll add stronger verification options.",
      },
      {
        q: "Can dealerships remove bad reviews?",
        a: "No. Reviews stay as long as they follow the rules (no hate, no doxxing, no fake content). Fairness matters.",
      },
      {
        q: "Is this free to use?",
        a: "Yes. Browsing and reading reviews is free. Posting a review may require an account depending on your current setup.",
      },
      {
        q: "What should I include in a good review?",
        a: "Be specific: communication, pricing transparency, waiting time, paperwork, post-sale support, and what you’d do differently.",
      },
    ],
    []
  );

  return (
    <>
      <Header />

      {/* HERO (keep the screenshot vibe) */}
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

          {/* quick trust chips */}
          <div className="d-flex justify-content-center gap-2 flex-wrap mt-4">
            <span className="badge rounded-pill text-bg-dark border" style={{ borderColor: "var(--border)" }}>
              Transparent reviews
            </span>
            <span className="badge rounded-pill text-bg-dark border" style={{ borderColor: "var(--border)" }}>
              Community driven
            </span>
            <span className="badge rounded-pill text-bg-dark border" style={{ borderColor: "var(--border)" }}>
              Simple & fast
            </span>
          </div>
        </div>
      </section>

      {/* STATS / SOCIAL PROOF */}
      <section className="py-4">
        <div className="container">
          <div className="row g-3">
            {stats.map((s) => (
              <div className="col-6 col-md-3 fade-up" key={s.label}>
                <div className="card p-3 h-100 hover-lift" style={{ boxShadow: "var(--shadow)" }}>
                  <div className="fw-bold fs-3">{s.value}</div>
                  <div className="text-muted">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW (your existing section, upgraded layout a bit) */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6 fade-up">
              <img
                src="/media/car_dealership.jpg"
                alt="Dealership"
                className="img-fluid rounded"
                style={{ boxShadow: "var(--shadow)" }}
              />
            </div>

            <div className="col-lg-6 fade-up">
              <h2 className="fw-bold mb-3">Who we are</h2>
              <p className="text-muted">
                We’re building a community-driven platform to make car shopping simpler and more transparent.
                Compare dealerships, read honest reviews, and make confident decisions.
              </p>
              <p className="text-muted">
                We focus on the details that matter: pricing clarity, communication, waiting time, and what happens
                after the sale.
              </p>
              <p className="text-muted mb-4">
                Our goal: less guessing, fewer surprises, better outcomes.
              </p>

              <div className="d-flex gap-3 flex-wrap">
                <Link to="/dealers" className="btn btn-premium">
                  Start browsing
                </Link>
                <Link to="/reviews" className="btn btn-outline-premium">
                  Read reviews
                </Link>
              </div>
            </div>
          </div>

          {/* Your 3 cards, kept + slightly expanded */}
          <div className="row g-4 mt-4">
            <div className="col-md-4 fade-up">
              <div className="card p-4 hover-lift h-100" style={{ boxShadow: "var(--shadow)" }}>
                <h5 className="fw-semibold">Explore dealerships</h5>
                <p className="text-muted mb-0">
                  Find dealers, view details, and see what others experienced before you visit.
                </p>
              </div>
            </div>
            <div className="col-md-4 fade-up">
              <div className="card p-4 hover-lift h-100" style={{ boxShadow: "var(--shadow)" }}>
                <h5 className="fw-semibold">Read real reviews</h5>
                <p className="text-muted mb-0">
                  No fluff—just genuine feedback from real customers, structured and easy to compare.
                </p>
              </div>
            </div>
            <div className="col-md-4 fade-up">
              <div className="card p-4 hover-lift h-100" style={{ boxShadow: "var(--shadow)" }}>
                <h5 className="fw-semibold">Share your experience</h5>
                <p className="text-muted mb-0">
                  Post your review after a visit and help others make better decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-4 fade-up">
            <h2 className="fw-bold mb-2">Built for confident car shopping</h2>
            <p className="text-muted mb-0">
              Everything you need to choose a dealership with fewer surprises.
            </p>
          </div>

          <div className="row g-4">
            {features.map((f) => (
              <div className="col-sm-6 col-lg-4 fade-up" key={f.title}>
                <div className="card p-4 hover-lift h-100" style={{ boxShadow: "var(--shadow)" }}>
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <div className="fs-3" aria-hidden="true">
                      {f.icon}
                    </div>
                    <h5 className="fw-semibold mb-0">{f.title}</h5>
                  </div>
                  <p className="text-muted mb-0">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4 align-items-start">
            <div className="col-lg-5 fade-up">
              <h2 className="fw-bold mb-2">How it works</h2>
              <p className="text-muted mb-4">
                A simple flow that feels familiar—like the best review platforms, but focused on dealerships.
              </p>

              <div className="d-flex gap-3 flex-wrap">
                <Link to="/dealers" className="btn btn-premium">
                  Browse now
                </Link>
                <Link to="/register" className="btn btn-outline-premium">
                  Create account
                </Link>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="row g-3">
                {steps.map((s) => (
                  <div className="col-md-6 fade-up" key={s.step}>
                    <div className="card p-4 hover-lift h-100" style={{ boxShadow: "var(--shadow)" }}>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="fw-bold">{s.title}</div>
                        <span className="badge rounded-pill text-bg-dark border" style={{ borderColor: "var(--border)" }}>
                          {s.step}
                        </span>
                      </div>
                      <p className="text-muted mb-0">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-4 fade-up">
            <h2 className="fw-bold mb-2">What people say</h2>
            <p className="text-muted mb-0">Quick stories from shoppers like you.</p>
          </div>

          <div className="row g-4">
            {testimonials.map((t) => (
              <div className="col-md-4 fade-up" key={t.name}>
                <div className="card p-4 hover-lift h-100" style={{ boxShadow: "var(--shadow)" }}>
                  <p className="mb-3">“{t.quote}”</p>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <div className="fw-semibold">{t.name}</div>
                      <div className="text-muted small">{t.title}</div>
                    </div>
                    <div className="text-muted">★ ★ ★ ★ ★</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4 align-items-start">
            <div className="col-lg-5 fade-up">
              <h2 className="fw-bold mb-2">FAQ</h2>
              <p className="text-muted mb-0">
                Answers to common questions. If you want, we can add a Contact CTA here too.
              </p>
            </div>

            <div className="col-lg-7">
              <div className="row g-3">
                {faqs.map((f) => (
                  <div className="col-12 fade-up" key={f.q}>
                    <div className="card p-4 hover-lift" style={{ boxShadow: "var(--shadow)" }}>
                      <div className="fw-semibold mb-2">{f.q}</div>
                      <div className="text-muted">{f.a}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-5">
        <div className="container fade-up">
          <div className="card p-4 p-md-5 hover-lift" style={{ boxShadow: "var(--shadow)" }}>
            <div className="row g-4 align-items-center">
              <div className="col-lg-8">
                <h2 className="fw-bold mb-2">Ready to find your next dealership?</h2>
                <p className="text-muted mb-0">
                  Browse trusted reviews, compare experiences, and go in prepared. Your next visit can be smoother.
                </p>
              </div>
              <div className="col-lg-4 d-flex gap-2 justify-content-lg-end flex-wrap">
                <Link to="/dealers" className="btn btn-premium btn-lg">
                  Browse Dealerships
                </Link>
                <Link to="/postreview" className="btn btn-outline-premium btn-lg">
                  Post a review
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
