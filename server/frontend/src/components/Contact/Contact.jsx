import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Contact() {
  return (
    <>
      <Header />

      <div className="container py-4">
        <div className="card mx-auto" style={{ width: "80%", marginTop: "5%" }}>
          <div className="banner" name="contact-header">
            <h1>Contact Us</h1>
            <p>We’d love to hear from you. Send us a message and we’ll get back to you.</p>
          </div>

          <div className="p-4">
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input id="name" className="form-control" placeholder="Your name" />
              </div>

              <div className="col-md-6">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input id="email" type="email" className="form-control" placeholder="you@example.com" />
              </div>

              <div className="col-12">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea id="message" className="form-control" rows={5} placeholder="How can we help?" />
              </div>

              <div className="col-12 d-flex justify-content-end">
                <button type="button" className="btn btn-dark">
                  Send
                </button>
              </div>
            </div>

            <div className="mt-4 d-flex align-items-center gap-3">
              <img src="/media/contactus.png" alt="Contact" style={{ width: 64, height: 64 }} />
              <div>
                <div className="fw-semibold">Best Cars Dealership</div>
                <div className="text-muted">Support: support@example.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
