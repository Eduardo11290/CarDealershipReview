import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function About() {
  return (
    <>
      <Header />

      <div className="container py-4">
        <div className="card mx-auto" style={{ width: "80%", marginTop: "5%" }}>
          <div className="banner" name="about-header">
            <h1>About Us</h1>
            <p>
              Welcome to Best Cars Dealership, home to the best cars in North America.
              We deal in domestic and imported cars at reasonable prices.
            </p>
          </div>

          <div className="p-3">
            <div style={{ display: "flex", flexDirection: "row", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <div className="card" style={{ width: "30%", minWidth: 260 }}>
                <img className="card-img-top" src="/media/cars.jpeg" alt="Cars" />
                <div className="card-body">
                  <h5 className="title">Quality</h5>
                  <p>We focus on quality listings and real customer experiences.</p>
                </div>
              </div>

              <div className="card" style={{ width: "30%", minWidth: 260 }}>
                <img className="card-img-top" src="/media/car_dealership.jpg" alt="Dealership" />
                <div className="card-body">
                  <h5 className="title">Trust</h5>
                  <p>Transparent reviews and dealership details you can rely on.</p>
                </div>
              </div>

              <div className="card" style={{ width: "30%", minWidth: 260 }}>
                <img className="card-img-top" src="/media/person.png" alt="Person" />
                <div className="card-body">
                  <h5 className="title">Community</h5>
                  <p>A community-driven platform to help people shop smarter.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}
