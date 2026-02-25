import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "../assets/style.css";

const API = (process.env.REACT_APP_API_URL || "http://localhost:8000").replace(
  /\/$/,
  ""
);

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

function clampIntRating(value) {
  const v = Number(value);
  if (!Number.isFinite(v)) return 5;
  return Math.min(5, Math.max(1, Math.round(v)));
}

/**
 * StarRating (1..5, no halves)
 * - hover preview
 * - click to set
 * - selecting 3 fills 1..3
 *
 * Uses: flex-direction: row-reverse + input:checked ~ label
 * IMPORTANT: Ensure CSS exists (see comment near component usage).
 */
function StarRating({ value, onChange, name = "rating" }) {
  const safeValue = clampIntRating(value);

  return (
    <div className="star-rating" role="radiogroup" aria-label="Rating">
      {[5, 4, 3, 2, 1].map((n) => {
        const id = `${name}-${n}`;
        return (
          <React.Fragment key={n}>
            <input
              id={id}
              name={name}
              type="radio"
              value={n}
              checked={safeValue === n}
              onChange={(e) => onChange(clampIntRating(e.target.value))}
            />
            <label htmlFor={id} title={`${n} star${n === 1 ? "" : "s"}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="28"
                viewBox="0 0 576 512"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
              </svg>
            </label>
          </React.Fragment>
        );
      })}
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
        const res = await fetch(`${API}/djangoapp/get_cars`, {
          credentials: "include",
        });
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
        const res = await fetch(`${API}/djangoapp/dealer/${dealerId}`, {
          credentials: "include",
        });
        const data = await res.json().catch(() => null);

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

    const safeRating = clampIntRating(rating);

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
            Help others by sharing your experience. Your review improves
            transparency and dealership quality.
          </p>

          <div className="row g-4 mt-1">
            {/* Left panel */}
            <div className="col-12 col-lg-4">
              <div className="card p-4 h-100 review-panel">
                <div className="fw-semibold mb-3">Review details</div>

                <div className="text-muted small mb-2">Dealership</div>
                <div className="pill mb-3">
                  {dealerLoading
                    ? "Loading..."
                    : dealerName
                      ? dealerName
                      : `Dealer #${dealerId}`}
                </div>

                <div className="text-muted small mb-2">Username</div>
                <div className="pill mb-3">{username || "Not logged in"}</div>

                <div className="text-muted small">
                  Tip: keep it specific — staff behavior, transparency, wait
                  times, paperwork, and after-sales support.
                </div>
              </div>
            </div>

            {/* Right panel */}
            <div className="col-12 col-lg-8">
              <form
                onSubmit={submitReview}
                className="card p-4 review-panel"
                style={{ boxShadow: "var(--shadow)" }}
              >
                <div className="row g-3 align-items-end">
                  <div className="col-12 col-md-7">
                    <label className="form-label">Car</label>
                    <select
                      className="form-select"
                      value={carId}
                      onChange={(e) => setCarId(e.target.value)}
                    >
                      {cars.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12 col-md-5 text-center">
                    <label className="form-label">Rating</label>

                    {/* NOTE: Add the CSS from my previous message:
                       .star-rating { flex-direction: row-reverse; ... }
                       input:checked ~ label svg fills 1..N
                    */}
                    <StarRating value={rating} onChange={setRating} />

                    <div className="text-muted small mt-1">
                      Hover to preview, click to select 1–5.
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
                    <div className="text-muted small mt-1">
                      {title.trim().length}/80
                    </div>
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
                    <div className="text-muted small mt-1">
                      {review.trim().length}/1500
                    </div>
                  </div>

                  {error ? (
                    <div className="col-12">
                      <div className="alert alert-danger mb-0">{error}</div>
                    </div>
                  ) : null}

                  <div className="col-12 d-flex justify-content-end gap-2 mt-2">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={clearForm}
                      disabled={submitting}
                    >
                      Clear
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={submitting}
                    >
                      {submitting ? "Submitting..." : "Submit review"}
                    </button>
                  </div>

                  <div className="col-12 text-muted small">
                    Note: abusive language or spam may be removed.
                  </div>
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