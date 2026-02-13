import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "../assets/style.css";

const API = (process.env.REACT_APP_API_URL || "http://localhost:8000").replace(/\/$/, "");

function normalizeCarsPayload(data) {
  const arr = data?.CarModels || data?.cars || data?.models || data?.results || [];
  if (!Array.isArray(arr)) return [];

  return arr.map((c, idx) => {
    // Django returns: { CarModel, CarMake }
    const make = c.CarMake || c.make || c.brand || c.manufacturer || "";
    const model = c.CarModel || c.model || c.name || "";
    const year = c.year || c.Year || c.model_year || "";
    const id = c.id ?? c._id ?? `${make}-${model}-${year}-${idx}`;
    const label = [make, model, year].filter(Boolean).join(" ");
    return { id, make, model, year, name: label || model || String(id) };
  });
}

function StarRating({ value, onChange }) {
  const stars = [1, 2, 3, 4, 5];

  const handleClick = (starIndex, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const isLeftHalf = e.clientX - rect.left < rect.width / 2;
    const newValue = isLeftHalf ? starIndex - 0.5 : starIndex;
    onChange(newValue);
  };

  return (
    <div className="d-flex align-items-center gap-2">
      <div className="d-flex gap-1">
        {stars.map((i) => {
          const full = value >= i;
          const half = !full && value >= i - 0.5;

          return (
            <button
              key={i}
              type="button"
              className="star-btn"
              onClick={(e) => handleClick(i, e)}
              aria-label={`${i} stars`}
              title="Click left for half, right for full"
            >
              <span className={`star ${full ? "star-full" : half ? "star-half" : "star-empty"}`}>★</span>
            </button>
          );
        })}
      </div>

      <div className="text-muted" style={{ minWidth: 56 }}>
        {value.toFixed(1)}
      </div>
    </div>
  );
}

export default function PostReview() {
  const { dealerId } = useParams();
  const navigate = useNavigate();

  const isLoggedIn = sessionStorage.getItem("username") != null;
  const username = sessionStorage.getItem("username") || "";

  const [cars, setCars] = useState([]);
  const [carsLoading, setCarsLoading] = useState(false);
  const [carsError, setCarsError] = useState("");

  const [carId, setCarId] = useState("");
  const [rating, setRating] = useState(4.5); // float rating
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");

  const carsUrl = useMemo(() => `${API}/djangoapp/get_cars`, []);

  useEffect(() => {
    if (!isLoggedIn) return;

    (async () => {
      try {
        setCarsLoading(true);
        setCarsError("");

        const res = await fetch(carsUrl, { method: "GET", credentials: "include" });
        const text = await res.text();

        let data;
        try {
          data = JSON.parse(text);
        } catch {
          data = null;
        }

        console.log("get_cars status:", res.status);
        console.log("get_cars raw:", text);

        if (!res.ok || !data) {
          setCarsError(`Could not load cars list (HTTP ${res.status}).`);
          setCars([]);
          return;
        }

        const normalized = normalizeCarsPayload(data);
        setCars(normalized);

        if (normalized.length > 0) {
          setCarId(String(normalized[0].id));
        }
      } catch (e) {
        console.error("Fetch error:", e);
        setCarsError("Network error loading cars.");
      } finally {
        setCarsLoading(false);
      }
    })();
  }, [carsUrl, isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);

  const selectedCar = cars.find((c) => String(c.id) === String(carId));

  async function submitReview(e) {
    e.preventDefault();

    if (!carId) return alert("Please select a car.");
    if (!title.trim()) return alert("Please add a title.");
    if (review.trim().length < 10) return alert("Review should be at least 10 characters.");

    const payload = {
      dealer_id: Number(dealerId),
      username,
      car: selectedCar?.name || "",
      rating: Number(rating), // can be 4.5
      purchased: false, // removed from UI
      title: title.trim(),
      review: review.trim(),
      purchase_date: null,
    };

    console.log("Submitting review payload:", payload);

    const postUrl = `${API}/djangoapp/add_review`;

    try {
      const res = await fetch(postUrl, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      console.log("add_review response:", data);

      if (!res.ok) {
        alert("Failed to submit review. Check console / backend logs.");
        return;
      }

      alert("Review submitted successfully!");
      navigate(`/dealer/${dealerId}`);
    } catch (err) {
      alert("Network error submitting review.");
    }
  }

  return (
    <>
      <Header />

      <div className="container py-4">
        <div className="card mx-auto postreview-card">
          <div className="banner">
            <h1>Leave a review</h1>
            <p>Help others by sharing your experience. Your review improves transparency and dealership quality.</p>
          </div>

          <div className="p-4">
            <div className="row g-4">
              <div className="col-12 col-lg-4">
                <div className="card p-3 h-100">
                  <div className="fw-bold mb-2">Review details</div>

                  <div className="mb-3">
                    <label className="form-label">Dealer ID</label>
                    <input className="form-control" value={dealerId} disabled />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input className="form-control" value={username} disabled />
                  </div>

                  <div className="text-muted">
                    Tip: keep it specific — staff behavior, transparency, wait times, and after-sales support.
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-8">
                <div className="card p-3">
                  <form onSubmit={submitReview}>
                    <div className="row g-3">
                      <div className="col-12 col-md-7">
                        <label className="form-label">Car</label>
                        <select
                          className="form-select"
                          value={carId}
                          onChange={(e) => setCarId(e.target.value)}
                          disabled={carsLoading}
                        >
                          {carsLoading ? (
                            <option>Loading cars…</option>
                          ) : cars.length === 0 ? (
                            <option>No cars available</option>
                          ) : (
                            cars.map((c) => (
                              <option key={c.id} value={String(c.id)}>
                                {c.name}
                              </option>
                            ))
                          )}
                        </select>
                        {carsError ? <div className="text-danger mt-2">{carsError}</div> : null}
                      </div>

                      <div className="col-12 col-md-5">
                        <label className="form-label">Rating</label>
                        <StarRating value={rating} onChange={setRating} />
                      </div>

                      <div className="col-12 col-md-7">
                        <label className="form-label">Title</label>
                        <input
                          className="form-control"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="e.g., Transparent pricing and friendly staff"
                        />
                      </div>

                      <div className="col-12">
                        <label className="form-label">Your review</label>
                        <textarea
                          className="form-control"
                          rows={6}
                          value={review}
                          onChange={(e) => setReview(e.target.value)}
                          placeholder="Tell us what went well and what could be improved…"
                        />
                      </div>

                      <div className="col-12 d-flex justify-content-end gap-2">
                        <button
                          type="button"
                          className="btn btn-outline-light"
                          onClick={() => {
                            setTitle("");
                            setReview("");
                            setRating(4.5);
                          }}
                        >
                          Clear
                        </button>

                        <button type="submit" className="btn btn-dark">
                          Submit review
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="text-muted mt-3">Note: abusive language or spam may be removed.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
