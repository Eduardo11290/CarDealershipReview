import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "../assets/style.css";

const API = (process.env.REACT_APP_API_URL || "http://localhost:8000").replace(/\/$/, "");

function normalizeCarsPayload(data) {
  const arr = data?.CarModels || data?.cars || data?.models || data?.results || [];
  if (!Array.isArray(arr)) return [];

  return arr
    .map((c, idx) => {
      const make = c.CarMake || c.make || c.brand || "";
      const model = c.CarModel || c.model || c.name || "";
      const year = c.year || c.Year || c.model_year || "";
      const id = c.id ?? c._id ?? `${make}-${model}-${year}-${idx}`;

      return {
        id,
        make,
        model,
        year,
        label: [make, model, year].filter(Boolean).join(" "),
      };
    })
    .filter((x) => x.make || x.model);
}

function clampHalf(value) {
  const v = Number(value);
  if (!Number.isFinite(v)) return 0.5;
  return Math.min(5, Math.max(0.5, Math.round(v * 2) / 2));
}

function StarIcon({ fill = 0 }) {
  // fill: 0..1 (0 empty, 0.5 half, 1 full)
  return (
    <svg viewBox="0 0 24 24" className="star-svg" aria-hidden="true">
      {/* base outline */}
      <path
        className="star-outline"
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      />
      {/* filled part clipped */}
      <defs>
        <clipPath id={`clip-${String(fill).replace(".", "-")}-${Math.random().toString(16).slice(2)}`}>
          <rect x="0" y="0" width={24 * fill} height="24" />
        </clipPath>
      </defs>
      <path
        className="star-fill"
        clipPath={`url(#clip-${String(fill).replace(".", "-")}-${Math.random().toString(16).slice(2)})`}
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      />
    </svg>
  );
}

/**
 * StarRating:
 * - half-star selection (0.5 steps)
 * - hover preview
 * - click to set
 */
function StarRating({ value, onChange }) {
  const [hoverValue, setHoverValue] = useState(null);
  const displayValue = hoverValue ?? value;

  function getValueFromEvent(index, e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const half = x < rect.width / 2 ? 0.5 : 1;
    return clampHalf(index - 1 + half);
  }

  return (
    <div className="rating-wrap">
      <div
        className="stars"
        onMouseLeave={() => setHoverValue(null)}
        role="radiogroup"
        aria-label="Rating"
      >
        {[1, 2, 3, 4, 5].map((index) => {
          // Determine how filled this star should be given displayValue
          const diff = displayValue - (index - 1);
          const fill = diff >= 1 ? 1 : diff >= 0.5 ? 0.5 : 0;

          return (
            <button
              key={index}
              type="button"
              className="star-hit"
              onMouseMove={(e) => setHoverValue(getValueFromEvent(index, e))}
              onFocus={() => setHoverValue(null)}
              onClick={(e) => onChange(getValueFromEvent(index, e))}
              onMouseDown={(e) => e.preventDefault()}
              aria-label={`${index} star`}
            >
              <StarIcon fill={fill} />
            </button>
          );
        })}
      </div>

      <div className="star-value">
        {displayValue}/5
      </div>
    </div>
  );
}

export default function PostReview() {
  const params = useParams();
  const dealerId = Number(params.id ?? params.dealerId);
  const navigate = useNavigate();

  const [cars, setCars] = useState([]);
  const [carId, setCarId] = useState("");
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [dealerName, setDealerName] = useState("");
  const [dealerLoading, setDealerLoading] = useState(false);

  const username =
    sessionStorage.getItem("userName") ||
    sessionStorage.getItem("username") ||
    sessionStorage.getItem("user") ||
    sessionStorage.getItem("name") ||
    "";

  const selectedCar = useMemo(
    () => cars.find((c) => String(c.id) === String(carId)),
    [cars, carId]
  );

  useEffect(() => {
    async function loadCars() {
      try {
        const res = await fetch(`${API}/djangoapp/get_cars`, { credentials: "include" });
        const data = await res.json();
        const normalized = normalizeCarsPayload(data);
        setCars(normalized);
        if (normalized.length) setCarId(String(normalized[0].id));
      } catch {
        setCars([]);
      }
    }
    loadCars();
  }, []);

  useEffect(() => {
    async function loadDealer() {
      if (!dealerId || Number.isNaN(dealerId)) return;

      setDealerLoading(true);
      try {
        const res = await fetch(`${API}/djangoapp/get_dealer/${dealerId}`, {
          credentials: "include",
        });
        const data = await res.json().catch(() => null);

        // Handle many possible shapes:
        // - [ { ...dealer } ]
        // - { dealer: {...} }
        // - { dealers: [ ... ] }
        // - { Dealer: {...} } etc.
        const candidate =
          (Array.isArray(data) && data[0]) ||
          (Array.isArray(data?.dealers) && data.dealers[0]) ||
          data?.dealer ||
          data?.Dealer ||
          data?.dealership ||
          data?.Dealership ||
          data;

        const name =
          candidate?.full_name ||
          candidate?.name ||
          candidate?.dealer_name ||
          candidate?.DealerName ||
          candidate?.dealer ||
          candidate?.business_name ||
          candidate?.short_name ||
          "";

        setDealerName(String(name || ""));
      } catch {
        setDealerName("");
      } finally {
        setDealerLoading(false);
      }
    }

    loadDealer();
  }, [dealerId]);

  function clearForm() {
    setRating(5);
    setTitle("");
    setReview("");
    setError("");
  }

  async function submitReview(e) {
    e.preventDefault();
    setError("");

    if (!username) {
      setError("You must be logged in to post a review.");
      return;
    }
    if (!dealerId || Number.isNaN(dealerId)) {
      setError("Invalid dealer ID in URL.");
      return;
    }
    if (!selectedCar) {
      setError("Please select a car.");
      return;
    }
    if (title.trim().length < 3) {
      setError("Title should be at least 3 characters.");
      return;
    }
    if (review.trim().length < 10) {
      setError("Review should be at least 10 characters.");
      return;
    }

    const safeRating = clampHalf(rating);

    const payload = {
      dealer_id: dealerId,
      username,
      title: title.trim(),
      rating: safeRating,
      review: review.trim(),
      purchased: false,
      purchase_date: "",

      car_make: selectedCar.make || "",
      car_model: selectedCar.model || "",
      car_year: Number(selectedCar.year) || 2023,
    };

    try {
      setSubmitting(true);

      const res = await fetch(`${API}/djangoapp/add_review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || data?.status === 401 || data?.status === 403) {
        throw new Error(data?.message || "Failed to submit review.");
      }

      navigate(`/dealer/${dealerId}`);
    } catch (err) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Header />

      <div className="container py-5">
        <div className="review-shell fade-up">
          <h1 className="review-title">Leave a review</h1>
          <p className="review-subtitle">
            Help others by sharing your experience. Your review improves transparency and dealership quality.
          </p>

          <div className="row g-4 mt-1">
            {/* Left panel */}
            <div className="col-12 col-lg-4">
              <div className="card p-4 h-100 review-panel">
                <div className="fw-semibold mb-3">Review details</div>

                <div className="text-muted small mb-2">Dealership</div>
                <div className="pill mb-3">
                  {dealerLoading ? "Loading..." : (dealerName ? dealerName : `Dealer #${dealerId}`)}
                </div>

                <div className="text-muted small mb-2">Username</div>
                <div className="pill mb-3">{username || "Not logged in"}</div>

                <div className="text-muted small">
                  Tip: keep it specific — staff behavior, transparency, wait times, paperwork, and after-sales support.
                </div>
              </div>
            </div>

            {/* Right panel */}
            <div className="col-12 col-lg-8">
              <form onSubmit={submitReview} className="card p-4 review-panel" style={{ boxShadow: "var(--shadow)" }}>
                <div className="row g-3 align-items-end">
                  <div className="col-12 col-md-7">
                    <label className="form-label">Car</label>
                    <select className="form-select" value={carId} onChange={(e) => setCarId(e.target.value)}>
                      {cars.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12 col-md-5">
                    <label className="form-label">Rating</label>
                    <StarRating value={rating} onChange={setRating} />
                    <div className="text-muted small mt-1">
                      Hover to preview, click for half or full star.
                    </div>
                  </div>

                  <div className="col-12">
                    <label className="form-label">Title</label>
                    <input
                      className="form-control"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., Transparent pricing and friendly staff"
                      maxLength={80}
                    />
                    <div className="text-muted small mt-1">{title.trim().length}/80</div>
                  </div>

                  <div className="col-12">
                    <label className="form-label">Your review</label>
                    <textarea
                      className="form-control"
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      placeholder="Tell us what went well and what could be improved..."
                      rows={6}
                      maxLength={1500}
                    />
                    <div className="text-muted small mt-1">{review.trim().length}/1500</div>
                  </div>

                  {error ? (
                    <div className="col-12">
                      <div className="alert alert-danger mb-0">{error}</div>
                    </div>
                  ) : null}

                  <div className="col-12 d-flex justify-content-end gap-2 mt-2">
                    <button type="button" className="btn btn-outline-secondary" onClick={clearForm} disabled={submitting}>
                      Clear
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={submitting}>
                      {submitting ? "Submitting..." : "Submit review"}
                    </button>
                  </div>

                  <div className="col-12 text-muted small">Note: abusive language or spam may be removed.</div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
