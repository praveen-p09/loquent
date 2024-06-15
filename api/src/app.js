const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const os = require("os");
dotenv.config();

const app = express();
const corsOptions = {
  origin: "https://loquent.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(os.tmpdir(), "uploads")));
app.options("*", cors(corsOptions));

// Debugging endpoint for environment variables
app.get("/debug/env", (req, res) => {
  res.json({
    MONGO_URI: process.env.MONGO_URI || "MONGO_URI is not defined",
  });
});

// Database connection
const uri = process.env.MONGO_URI; // Ensure this environment variable is correctly set
if (!uri) {
  console.error(
    "MONGO_URI is not defined. Please set it in the environment variables."
  );
  process.exit(1);
}

mongoose.connect(uri, {});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

// Routes
app.use("/api/auth", require("../routes/authRoutes.js"));
app.use("/api/posts", require("../routes/postRoutes.js"));

app.get("/", (req, res) => {
  res.json("Welcome to Loquent API");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
