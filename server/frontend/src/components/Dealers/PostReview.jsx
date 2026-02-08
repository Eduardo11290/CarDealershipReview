import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Dealers.css";
import "../assets/style.css";
import Header from "../Header/Header";

const API = (process.env.REACT_APP_API_URL || "").replace(/\/$/, "");

const PostReview = () => {
  const { id } = useParams();

  const [dealer, setDealer] = useState({});
  const [review, setReview] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [carmodels, setCarmodels] = useState([]);

  const dealer_url = `${API}/djangoapp/dealer/${id}`;
  const review_url = `${API}/djangoapp/add_review`;
  const carmodels_url = `${API}/djangoapp/get_cars`;

  const postreview = async () => {
    let name =
      sessionStorage.getItem("firstname") +
      " " +
      sessionStorage.getItem("lastname");

    if (name.includes("null")) {
      name = sessionStorage.getItem("username");
    }

    if (!model || !review || !date || !year) {
      alert("All fields are mandatory");
      return;
    }

    const [car_make, car_model] = model.split(" ");

    const jsoninput = {
      name,
      dealership: id,
      review,
      purchase: true,
      purchase_date: date,
      car_make,
      car_model,
      car_year: year,
    };

    const res = await fetch(review_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(jsoninput),
    });

    const json = await res.json();

    if (json.status === 200) {
      window.location.href = `/dealer/${id}`;
    } else {
      alert("Failed to post review");
    }
  };

  const get_dealer = async () => {
    const res = await fetch(dealer_url, {
      method: "GET",
      credentials: "include",
    });
    const retobj = await res.json();

    if (retobj.status === 200 && retobj.dealer.length > 0) {
      setDealer(retobj.dealer[0]);
    }
  };

  const get_cars = async () => {
    const res = await fetch(carmodels_url, {
      method: "GET",
      credentials: "include",
    });
    const retobj = await res.json();
    setCarmodels(retobj.CarModels || []);
  };

  useEffect(() => {
    get_dealer();
    get_cars();
  }, []);

  return (
    <div>
      <Header />

      <div style={{ margin: "5%" }}>
        <h1 style={{ color: "darkblue" }}>{dealer.full_name}</h1>

        <textarea
          cols="50"
          rows="7"
          placeholder="Write your review"
          onChange={(e) => setReview(e.target.value)}
        />

        <div className="input_field">
          Purchase Date{" "}
          <input type="date" onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="input_field">
          Car Make & Model
          <select onChange={(e) => setModel(e.target.value)}>
            <option value="" disabled selected hidden>
              Choose Car Make and Model
            </option>
            {carmodels.map((car, idx) => (
              <option key={idx} value={`${car.CarMake} ${car.CarModel}`}>
                {car.CarMake} {car.CarModel}
              </option>
            ))}
          </select>
        </div>

        <div className="input_field">
          Car Year{" "}
          <input
            type="number"
            min="2015"
            max="2025"
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

        <button className="postreview" onClick={postreview}>
          Post Review
        </button>
      </div>
    </div>
  );
};

export default PostReview;
