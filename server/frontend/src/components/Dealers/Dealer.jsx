import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Dealers.css";
import "../assets/style.css";
import positive_icon from "../assets/positive.png";
import neutral_icon from "../assets/neutral.png";
import negative_icon from "../assets/negative.png";
import review_icon from "../assets/reviewbutton.png";
import Header from "../Header/Header";

const API = process.env.REACT_APP_API_URL || "";

const Dealer = () => {
  const [dealer, setDealer] = useState({});
  const [reviews, setReviews] = useState([]);
  const [unreviewed, setUnreviewed] = useState(false);
  const [postReview, setPostReview] = useState(<></>);

  const params = useParams();
  const id = params.id;

  // Preferă backend-ul din env (Vercel), altfel fallback la origin
  const baseUrl = (API ? API.replace(/\/$/, "") : window.location.origin);

  const dealer_url = `${baseUrl}/djangoapp/dealer/${id}`;
  const reviews_url = `${baseUrl}/djangoapp/reviews/dealer/${id}`;
  const post_review = `${window.location.origin}/postreview/${id}`; // link-ul de postreview e pe frontend

  const senti_icon = (sentiment) => {
    return sentiment === "positive"
      ? positive_icon
      : sentiment === "negative"
      ? negative_icon
      : neutral_icon;
  };

  useEffect(() => {
    const load = async () => {
      // dealer
      const resDealer = await fetch(dealer_url, {
        method: "GET",
        credentials: "include",
      });
      const dealerObj = await resDealer.json();
      if (dealerObj.status === 200) {
        const dealerobjs = Array.from(dealerObj.dealer);
        setDealer(dealerobjs[0] || {});
      }

      // reviews
      const resReviews = await fetch(reviews_url, {
        method: "GET",
        credentials: "include",
      });
      const reviewsObj = await resReviews.json();
      if (reviewsObj.status === 200) {
        if (reviewsObj.reviews && reviewsObj.reviews.length > 0) {
          setReviews(reviewsObj.reviews);
          setUnreviewed(false);
        } else {
          setReviews([]);
          setUnreviewed(true);
        }
      }

      // post review button
      if (sessionStorage.getItem("username")) {
        setPostReview(
          <a href={post_review}>
            <img
              src={review_icon}
              style={{ width: "10%", marginLeft: "10px", marginTop: "10px" }}
              alt="Post Review"
            />
          </a>
        );
      } else {
        setPostReview(<></>);
      }
    };

    load();
  }, [dealer_url, reviews_url, post_review]);

  return (
    <div style={{ margin: "20px" }}>
      <Header />
      <div style={{ marginTop: "10px" }}>
        <h1 style={{ color: "grey" }}>
          {dealer.full_name}
          {postReview}
        </h1>
        <h4 style={{ color: "grey" }}>
          {dealer["city"]}, {dealer["address"]}, {dealer["state"]}
        </h4>
      </div>

      <div className="reviews_panel">
        {reviews.length === 0 && unreviewed === false ? (
          <span>Loading Reviews....</span>
        ) : unreviewed === true ? (
          <div>No reviews yet!</div>
        ) : (
          reviews.map((review) => (
            <div className="review_panel" key={review.id || `${review.name}-${review.review}`}>
              <img
                src={senti_icon(review.sentiment)}
                className="emotion_icon"
                alt="Sentiment"
              />
              <div className="review">{review.review}</div>
              <div className="reviewer">
                {review.name} {review.car_make} {review.car_model} {review.car_year}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dealer;
