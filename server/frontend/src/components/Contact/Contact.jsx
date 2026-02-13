import React, { useMemo, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Contact() {
  const people = useMemo(
    () => [
      {
        id: "support",
        name: "Alex Marin",
        role: "Customer Support",
        email: "support@bestcars.example",
        phone: "+40 700 000 101",
        hours: "Mon–Fri, 09:00–18:00",
        location: "Remote",
        avatar: "/media/person.png",
      },
      {
        id: "sales",
        name: "Maria Ionescu",
        role: "Sales Consultant",
        email: "sales@bestcars.example",
        phone: "+40 700 000 102",
        hours: "Mon–Sat, 10:00–19:00",
        location: "Bucharest",
        avatar: "/media/person.png",
      },
      {
        id: "partnerships",
        name: "David Pop",
        role: "Partnerships",
        email: "partners@bestcars.example",
        phone: "+40 700 000 103",
        hours: "Mon–Fri, 09:00–17:00",
        location: "Cluj-Napoca",
        avatar: "/media/person.png",
      },
      {
        id: "press",
        name: "Ioana Radu",
        role: "Press & Media",
        email: "press@bestcars.example",
        phone: "+40 700 000 104",
        hours: "Mon–Fri, 10:00–16:00",
        location: "Remote",
        avatar: "/media/person.png",
      },
      {
        id: "legal",
        name: "Andrei Stan",
        role: "Legal & Compliance",
        email: "legal@bestcars.example",
        phone: "+40 700 000 105",
        hours: "Mon–Fri, 09:00–15:00",
        location: "Bucharest",
        avatar: "/media/person.png",
      },
      {
        id: "product",
        name: "Elena Dumitru",
        role: "Product Manager",
        email: "product@bestcars.example",
        phone: "+40 700 000 106",
        hours: "Mon–Fri, 09:00–18:00",
        location: "Remote",
        avatar: "/media/person.png",
      },
      {
        id: "tech",
        name: "Vlad Petrescu",
        role: "Technical Support",
        email: "tech@bestcars.example",
        phone: "+40 700 000 107",
        hours: "Mon–Fri, 10:00–18:00",
        location: "Iași",
        avatar: "/media/person.png",
      },
      {
        id: "billing",
        name: "Roxana Pavel",
        role: "Billing",
        email: "billing@bestcars.example",
        phone: "+40 700 000 108",
        hours: "Mon–Fri, 09:00–17:00",
        location: "Remote",
        avatar: "/media/person.png",
      },
    ],
    []
  );

  const [selectedId, setSelectedId] = useState(people[0].id);
  const selected = people.find((p) => p.id === selectedId);

  return (
    <>
      <Header />

      <div className="container py-4">
        <div className="card mx-auto contact-card">
          <div className="banner" name="contact-header">
            <h1>Contact Us</h1>
            <p>
              Choose who you want to contact, view their details, and send a message. We usually respond within 1–2 business days.
            </p>
          </div>

          <div className="p-4">
            <div className="row g-4">
              {/* Left: picker + profile */}
              <div className="col-12 col-lg-5">
                <div className="card p-3 mb-3">
                  <label className="form-label">Select a contact</label>
                  <select
                    className="form-select"
                    value={selectedId}
                    onChange={(e) => setSelectedId(e.target.value)}
                  >
                    {people.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — {p.role}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="card p-3">
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={selected.avatar}
                      alt={selected.name}
                      style={{ width: 64, height: 64, borderRadius: 16, objectFit: "cover" }}
                    />
                    <div>
                      <div className="fw-bold">{selected.name}</div>
                      <div className="text-muted">{selected.role}</div>
                    </div>
                  </div>

                  <hr />

                  <div className="text-muted">
                    <div className="mb-2">
                      <span className="fw-semibold">Email:</span> {selected.email}
                    </div>
                    <div className="mb-2">
                      <span className="fw-semibold">Phone:</span> {selected.phone}
                    </div>
                    <div className="mb-2">
                      <span className="fw-semibold">Hours:</span> {selected.hours}
                    </div>
                    <div className="mb-0">
                      <span className="fw-semibold">Location:</span> {selected.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: message form */}
              <div className="col-12 col-lg-7">
                <div className="card p-3">
                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
                    <div className="fw-bold">Send a message</div>
                    <div className="text-muted">To: {selected.name}</div>
                  </div>

                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input id="name" className="form-control" placeholder="Your name" />
                    </div>

                    <div className="col-12 col-md-6">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input id="email" type="email" className="form-control" placeholder="you@example.com" />
                    </div>

                    <div className="col-12">
                      <label htmlFor="subject" className="form-label">
                        Subject
                      </label>
                      <input
                        id="subject"
                        className="form-control"
                        placeholder={`Question for ${selected.role}`}
                        defaultValue={`Hello ${selected.name},`}
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="message" className="form-label">
                        Message
                      </label>
                      <textarea
                        id="message"
                        className="form-control"
                        rows={6}
                        placeholder="How can we help?"
                      />
                    </div>

                    <div className="col-12 d-flex justify-content-end gap-2">
                      <button type="button" className="btn btn-outline-light">
                        Clear
                      </button>
                      <button type="button" className="btn btn-dark">
                        Send
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-3 d-flex align-items-center gap-3">
                  <img src="/media/contactus.png" alt="Contact" style={{ width: 56, height: 56 }} />
                  <div>
                    <div className="fw-semibold">Best Cars Dealership</div>
                    <div className="text-muted">
                      Tip: for dealership issues, choose <b>Customer Support</b> or <b>Technical Support</b>.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Optional: grid view of all contacts */}
            <div className="mt-4">
              <div className="fw-bold mb-2">All contacts</div>
              <div className="row g-3">
                {people.map((p) => (
                  <div key={p.id} className="col-12 col-md-6 col-xl-4">
                    <button
                      type="button"
                      className={`card p-3 w-100 text-start contact-person-btn ${
                        p.id === selectedId ? "contact-person-active" : ""
                      }`}
                      onClick={() => setSelectedId(p.id)}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={p.avatar}
                          alt={p.name}
                          style={{ width: 44, height: 44, borderRadius: 12, objectFit: "cover" }}
                        />
                        <div>
                          <div className="fw-semibold">{p.name}</div>
                          <div className="text-muted">{p.role}</div>
                        </div>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
