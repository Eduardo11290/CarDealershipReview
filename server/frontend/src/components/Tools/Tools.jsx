import React, { useMemo, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function formatMoney(value, currency = "EUR") {
  try {
    return new Intl.NumberFormat("ro-RO", { style: "currency", currency, maximumFractionDigits: 0 }).format(value);
  } catch {
    return `${Math.round(value)} ${currency}`;
  }
}

export default function Tools() {
  const [price, setPrice] = useState(20000);
  const [down, setDown] = useState(2000);
  const [apr, setApr] = useState(8);
  const [months, setMonths] = useState(60);

  const result = useMemo(() => {
    const principal = Math.max(0, Number(price) - Number(down));
    const monthlyRate = Math.max(0, Number(apr)) / 100 / 12;
    const n = Math.max(1, Number(months));

    if (monthlyRate === 0) {
      const monthly = principal / n;
      return { principal, monthly, total: monthly * n, interest: monthly * n - principal };
    }

    const monthly = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
    const total = monthly * n;
    return { principal, monthly, total, interest: total - principal };
  }, [price, down, apr, months]);

  return (
    <>
      <Header />

      <div className="container py-5">
        <div className="fade-up">
          <h1 className="page-title mb-2">Tools</h1>
          <p className="page-subtitle">Simple calculators to help you plan before visiting a dealership.</p>
        </div>

        <div className="row g-4 mt-2">
          <div className="col-12 col-lg-7 fade-up">
            <div className="card p-4" style={{ boxShadow: "var(--shadow)" }}>
              <h5 className="fw-semibold mb-3">Finance calculator</h5>

              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label">Car price</label>
                  <input className="form-control" type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label">Down payment</label>
                  <input className="form-control" type="number" min="0" value={down} onChange={(e) => setDown(e.target.value)} />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label">APR (%)</label>
                  <input className="form-control" type="number" min="0" step="0.1" value={apr} onChange={(e) => setApr(e.target.value)} />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label">Term (months)</label>
                  <select className="form-select" value={months} onChange={(e) => setMonths(e.target.value)}>
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                    <option value={36}>36</option>
                    <option value={48}>48</option>
                    <option value={60}>60</option>
                    <option value={72}>72</option>
                    <option value={84}>84</option>
                  </select>
                </div>
              </div>

              <div className="alert mt-4" style={{ border: "1px solid var(--border)", background: "var(--surface)" }}>
                <div className="d-flex flex-wrap justify-content-between gap-2">
                  <div>
                    <div className="text-muted small">Estimated monthly</div>
                    <div className="fw-bold fs-4">{formatMoney(result.monthly)}</div>
                  </div>
                  <div>
                    <div className="text-muted small">Loan amount</div>
                    <div className="fw-semibold">{formatMoney(result.principal)}</div>
                  </div>
                  <div>
                    <div className="text-muted small">Total interest</div>
                    <div className="fw-semibold">{formatMoney(result.interest)}</div>
                  </div>
                  <div>
                    <div className="text-muted small">Total paid</div>
                    <div className="fw-semibold">{formatMoney(result.total)}</div>
                  </div>
                </div>
              </div>

              <div className="text-muted small">
                Note: This is an estimate. Real offers depend on credit score, fees, insurance, and dealership terms.
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-5 fade-up">
            <div className="card p-4" style={{ boxShadow: "var(--shadow)" }}>
              <h5 className="fw-semibold">Coming soon</h5>
              <ul className="text-muted mb-0">
                <li>Trade-in rough estimate</li>
                <li>Cost of ownership checklist</li>
                <li>Questions to ask at the dealership</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
