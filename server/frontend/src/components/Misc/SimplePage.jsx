import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function SimplePage({ title, subtitle, children }) {
  return (
    <>
      <Header />
      <div className="container py-5">
        <div className="fade-up">
          <h1 className="page-title mb-2">{title}</h1>
          {subtitle ? <p className="page-subtitle">{subtitle}</p> : null}
        </div>
        <div className="card p-4 mt-3 fade-up" style={{ boxShadow: "var(--shadow)" }}>
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
}
