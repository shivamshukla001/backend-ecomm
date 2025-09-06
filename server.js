// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Routes
const authRoutes = require("./routes/auth");
const paymentRoutes = require("./routes/payment");

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("🚀 ShopSmart Backend is Live!");
});

app.get("/", (req, res) => {
  res.send("✅ Backend is running and connected to frontend!");
});
// Middleware
app.use(cors());
app.use(express.json());
// server.js

const allowedOrigins = [
  "https://e-commerce-three-peach-20.vercel.app", // ✅ your Vercel frontend
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));



// Routes
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`, process.env.STRIPE_SECRET_KEY));
