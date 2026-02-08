import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./Dealers.css";
import "../assets/style.css";
import Header from "../Header/Header";

const API = process.env.REACT_APP_API_URL || "";

const PostReview = () => {
  const [dealer, setDealer] = useState({});
  const [review, setReview] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [carmodels, setCarmodels] = useState([]);

  const params = useParams();
  const id = params.id;

  const baseUrl = useMemo(() => {
    if (API) return API.endsWith("/") ? API.slice(0, -1) : API;
    return window.location.origin;
  }, []);

  const dealer_url = useMemo(
    () => `${baseUrl}/djangoapp/dealer/${id}`,
    [baseUrl, id]
  );
  const review_url = useMemo(() => `${baseUrl}/djangoapp/add_review`, [baseUrl]);
  const carmodels_url = useMemo(() => `${baseUrl}/djangoapp/get_cars`, [baseUrl]);

  const get_dealer = useCallback(async () => {
    const res = await fetch(dealer_url, {
      method: "GET",
      credentials: "include",
    });
    const retobj = await res.json();

    if (retobj.status === 200) {
      const dealerobjs = Array.from(retobj.dealer);
      if (dealerobjs.length > 0) setDealer(dealerobjs[0]);
    }
  }, [dealer_url]);

  const get_cars = useCallback(async () => {
    const res = await fetch(carmodels_url, {
      method: "GET",
      credentials: "include",
    });
    const retobj = await res.json();

    const carmodelsarr = Array.from(retobj.CarModels || []);
    setCarmodels(carmodelsarr);
  }, [carmodels_url]);

  useEffect(() => {
    get_dealer();
    get_cars();
  }, [get_dealer, get_cars]);

  const postreview = useCallback(async () => {
    let name = `${sessionStorage.getItem("firstname")} ${sessionStorage.getItem(
      "lastname"
    )}`;

    if (name.includes("null")) {
      name = sessionStorage.getItem("username");
    }

    if (!model || review.trim() === "" || date === "" || year === "") {
      alert("All details are mandatory");
      return;
    }

    const model_split = model.split(" ");
    const make_chosen = model_split[0];
    const model_chosen = model_split[1];

    const jsoninput = JSON.stringify({
      name: name,
      dealership: id,
      review: review,
      purchase: true,
      purchase_date: date,
      car_make: make_chosen,
      car_model: model_chosen,
      car_year: year,
    });

    const res = await fetch(review_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: jsoninput,
    });

    const json = await res.json();
    if (json.status === 200) {
      // mergem înapoi la pagina dealerului (pe același domeniu al frontend-ului)
      window.location.href = `${window.location.origin}/dealer/${id}`;
    }
  }, [model, review, date, year, id, review_url]);

  return (
    <div>
      <Header />
      <div style={{ margin: "5%" }}>
        <h1 style={{ color: "darkblue" }}>{dealer.full_name}</h1>

        <textarea
          id="review"
          cols="50"
          rows="7"
          onChange={(e) => setReview(e.target.value)}
        ></textarea>

        <div className="input_field">
          Purchase Date{" "}
          <input type="date" onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="input_field">
          Car Make
          <select name="cars" id="cars" onChange={(e) => setModel(e.target.value)} value={model}>
            <option value="" disabled hidden>
              Choose Car Make and Model
            </option>
            {carmodels.map((carmodel) => (
              <option
                key={`${carmodel.CarMake}-${carmodel.CarModel}`}
                value={`${carmodel.CarMake} ${carmodel.CarModel}`}
              >
                {carmodel.CarMake} {carmodel.CarModel}
              </option>
            ))}
          </select>
        </div>

        <div className="input_field">
          Car Year{" "}
          <input
            type="number"
            onChange={(e) => setYear(e.target.value)}
            max={2023}
            min={2015}
          />
        </div>

        <div>
          <button className="postreview" onClick={postreview}>
            Post Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostReview;
