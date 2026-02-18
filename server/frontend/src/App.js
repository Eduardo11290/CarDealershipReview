import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dealers from "./components/Dealers/Dealers";
import Dealer from "./components/Dealers/Dealer";
import PostReview from "./components/Dealers/PostReview";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

import Home from "./components/Home/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";

import FAQ from "./components/Help/FAQ";
import HowReviewsWork from "./components/Help/HowReviewsWork";

import Privacy from "./components/Legal/Privacy";
import Terms from "./components/Legal/Terms";

import Tools from "./components/Tools/Tools";

import Careers from "./components/Misc/Careers";
import Press from "./components/Misc/Press";
import Cookies from "./components/Misc/Cookies";



export default function App() {
  return (
    <Routes>
      {/* Landing */}
      <Route path="/" element={<Home />} />

      {/* Pages */}
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* Dealership routes */}
      <Route path="/dealers" element={<Dealers />} />
      <Route path="/dealer/:id" element={<Dealer />} />
      <Route path="/postreview/:dealerId" element={<PostReview />} />
      {/* Help */}
      <Route path="/faq" element={<FAQ />} />
      <Route path="/how-reviews-work" element={<HowReviewsWork />} />

      {/* Tools */}
      <Route path="/tools" element={<Tools />} />

      {/* Legal */}
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/cookies" element={<Cookies />} />

      {/* Company placeholders */}
      <Route path="/careers" element={<Careers />} />
      <Route path="/press" element={<Press />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Old links */}
      <Route path="/home" element={<Navigate to="/" replace />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
