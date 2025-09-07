const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Routes
const authRoutes = require("./routes/auth");
const paymentRoutes = require("./routes/payment");

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());

// Health Check Route
app.get("/", (req, res) => {
  res.send("✅ Backend is running and connected to frontend!");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);

// server.js
const allowedOrigins = [
  "http://localhost:5173", // local dev
  "https://e-commerce-three-peach-20.vercel.app", // your old vercel deploy
  "https://e-commerce-3ar4.vercel.app", // ✅ your new vercel deploy
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin); // log the blocked origin
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// MongoDB Connection
mongoose
  .connect(
    process.env.MONGO_URI ||
      "mongodb+srv://shivanirathore779_db_user:QfdQiYJYfr7umE6Y@cluster0.5sshtkt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
