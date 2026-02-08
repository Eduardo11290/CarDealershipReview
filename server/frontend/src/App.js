import LoginPanel from "./components/Login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register/Register";
import Dealers from "./components/Dealers/Dealers";
import Dealer from "./components/Dealers/Dealer";
import PostReview from "./components/Dealers/PostReview";

const About = () => (
  <div style={{ margin: 20 }}>
    <h2>About Us</h2>
    <p>Car Dealership Review app.</p>
  </div>
);

const Contact = () => (
  <div style={{ margin: 20 }}>
    <h2>Contact</h2>
    <p>Contact page.</p>
  </div>
);

function App() {
  return (
    <Routes>
      {/* IMPORTANT: homepage */}
      <Route path="/" element={<Dealers />} />

      <Route path="/login" element={<LoginPanel />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dealers" element={<Dealers />} />
      <Route path="/dealer/:id" element={<Dealer />} />
      <Route path="/postreview/:id" element={<PostReview />} />

      {/* pentru link-urile din Header */}
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
export default App;
