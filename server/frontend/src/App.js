import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dealers from "./components/Dealers/Dealers";
import Dealer from "./components/Dealers/Dealer";
import PostReview from "./components/Dealers/PostReview";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ForgotPassword from "./components/PasswordReset/ForgotPassword";
import ResetPassword from "./components/PasswordReset/ResetPassword";

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
      <Route path="/" element={<Home />} />

      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="/dealers" element={<Dealers />} />
      <Route path="/dealer/:id" element={<Dealer />} />
      <Route path="/postreview/:dealerId" element={<PostReview />} />

      <Route path="/faq" element={<FAQ />} />
      <Route path="/how-reviews-work" element={<HowReviewsWork />} />

      <Route path="/tools" element={<Tools />} />

      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/cookies" element={<Cookies />} />

      <Route path="/careers" element={<Careers />} />
      <Route path="/press" element={<Press />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:uidb64/:token" element={<ResetPassword />} />

      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}