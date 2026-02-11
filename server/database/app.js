/* jshint esversion: 8 */

const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const Reviews = require("./review");
const Dealerships = require("./dealership");

const app = express();
const port = process.env.PORT || 3030;

// Middleware
app.use(cors());
app.use(express.json()); // pentru JSON (insert_review)

// Mongo URI din env
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error("Missing MONGODB_URI env var");
}

// Seed doar dacă SEED_DB=true
const seed = process.env.SEED_DB === "true";

// -------------------- ROUTES --------------------

// Express route to home
app.get("/", async (req, res) => {
  res.send("Welcome to the Mongoose API");
});

// Express route to fetch all reviews
app.get("/fetchReviews", async (req, res) => {
  try {
    const documents = await Reviews.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: "Error fetching documents" });
  }
});

// Express route to fetch reviews by a particular dealer
app.get("/fetchReviews/dealer/:id", async (req, res) => {
  try {
    const dealerId = parseInt(req.params.id, 10);
    const documents = await Reviews.find({ dealership: dealerId });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: "Error fetching documents" });
  }
});

// Express route to fetch all dealerships
app.get("/fetchDealers", async (req, res) => {
  try {
    const documents = await Dealerships.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: "Error fetching documents" });
  }
});

// Express route to fetch Dealers by a particular state
app.get("/fetchDealers/:state", async (req, res) => {
  try {
    const documents = await Dealerships.find({ state: req.params.state });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: "Error fetching documents" });
  }
});

// Express route to fetch dealer by a particular id
app.get("/fetchDealer/:id", async (req, res) => {
  try {
    const dealerId = parseInt(req.params.id, 10);
    const documents = await Dealerships.find({ id: dealerId });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: "Error fetching documents" });
  }
});

// Express route to insert review
app.post("/insert_review", async (req, res) => {
  try {
    const data = req.body;

    const documents = await Reviews.find().sort({ id: -1 }).limit(1);
    const new_id = documents.length ? documents[0].id + 1 : 1;

    const review = new Reviews({
      id: new_id,
      name: data.name,
      dealership: data.dealership,
      review: data.review,
      purchase: data.purchase,
      purchase_date: data.purchase_date,
      car_make: data.car_make,
      car_model: data.car_model,
      car_year: data.car_year,
    });

    const savedReview = await review.save();
    res.json(savedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error inserting review" });
  }
});

// -------------------- STARTUP --------------------

async function main() {
  // Conectare Mongo
  await mongoose.connect(mongoUri);
  console.log("✅ Connected to MongoDB");

  // Seed o singură dată (doar când SEED_DB=true)
  if (seed) {
    console.log("🌱 SEED_DB=true -> seeding database...");

    const reviewsPath = path.join(__dirname, "data", "reviews.json");
    const dealershipsPath = path.join(__dirname, "data", "dealerships.json");

    const reviews_data = JSON.parse(fs.readFileSync(reviewsPath, "utf8"));
    const dealerships_data = JSON.parse(fs.readFileSync(dealershipsPath, "utf8"));

    await Reviews.deleteMany({});
    await Dealerships.deleteMany({});

    await Dealerships.insertMany(dealerships_data.dealerships);
    await Reviews.insertMany(reviews_data.reviews);

    console.log("✅ Seed complete");
  } else {
    console.log("ℹ️ SEED_DB is false -> skipping seed");
  }

  // Start server
  app.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
  });
}

main().catch((err) => {
  console.error("❌ Failed to start server:", err);
  process.exit(1);
});
