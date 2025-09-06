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

// Middleware
app.use(cors());
app.use(express.json());
// server.js

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
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
