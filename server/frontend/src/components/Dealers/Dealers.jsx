import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Base URL către Django (Render). În Vercel setezi REACT_APP_API_URL
const API = process.env.REACT_APP_API_URL || "";

const Dealers = () => {
  const [dealers, setDealers] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dealer_url = `${API}/djangoapp/get_dealers`;
  const dealer_url_by_state_base = `${API}/djangoapp/get_dealers/`;

  // În multe implementări IBM, dealer-ul are câmpul `state` (ex: "CA")
  const buildStatesList = (dealersList) => {
    const unique = new Set();
    (dealersList || []).forEach((d) => {
      if (d?.state) unique.add(d.state);
    });
    return ["All", ...Array.from(unique).sort()];
  };

  const get_dealers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(dealer_url, {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }

      const json = await res.json();
      const list = json?.dealers || [];
      setDealers(list);
      setStates(buildStatesList(list));
      setSelectedState("All");
    } catch (err) {
      console.error("Error loading dealers:", err);
      setError("Nu am putut încărca dealerii. Verifică backend-ul.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ BUG FIX: nu mai “mutăm” URL-ul; construim mereu din baza constantă
  const filterDealers = async (state) => {
    setSelectedState(state);

    if (state === "All") {
      return get_dealers();
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch(dealer_url_by_state_base + state, {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }

      const json = await res.json();
      const list = json?.dealers || [];
      setDealers(list);
      // păstrăm lista de state (să nu dispară dropdown-ul)
      if (states.length === 0) setStates(buildStatesList(list));
    } catch (err) {
      console.error("Error filtering dealers:", err);
      setError("Nu am putut filtra dealerii. Verifică endpoint-ul /get_dealers/<state>.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    get_dealers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dealerships</h2>

      <div style={{ margin: "12px 0" }}>
        <label htmlFor="stateSelect" style={{ marginRight: "8px" }}>
          Filtrează după stat:
        </label>
        <select
          id="stateSelect"
          value={selectedState}
          onChange={(e) => filterDealers(e.target.value)}
        >
          {(states.length ? states : ["All"]).map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Se încarcă...</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {!loading && !error && dealers.length === 0 && (
        <p>Nu există dealeri pentru filtrul ales.</p>
      )}

      <div style={{ display: "grid", gap: "12px" }}>
        {dealers.map((dealer) => (
          <div
            key={dealer.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "12px",
            }}
          >
            <h3 style={{ margin: "0 0 6px 0" }}>{dealer.full_name}</h3>
            <p style={{ margin: "0 0 6px 0" }}>
              <b>Adresă:</b> {dealer.address}, {dealer.city}, {dealer.state}{" "}
              {dealer.zip}
            </p>
            <p style={{ margin: "0 0 10px 0" }}>
              <b>Dealer ID:</b> {dealer.id}
            </p>

            <div style={{ display: "flex", gap: "10px" }}>
              <Link to={`/dealer/${dealer.id}`}>Vezi reviews</Link>
              <Link to={`/postreview/${dealer.id}`}>Scrie un review</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dealers;
