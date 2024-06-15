const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const corsOptions = {
  origin: "https://loquent.vercel.app/", // Update this to your actual frontend URL
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};
// Middleware
app.use(cors(corsOptions));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.options("*", cors(corsOptions));
// Database connection
const uri = process.env.MONGO_URI; // Ensure this environment variable is correctly set
console.log(uri);
mongoose.connect(uri);

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});
app.get("/debug/env", (req, res) => {
  res.json({
    MONGO_URI: process.env.MONGO_URI || "MONGO_URI is not defined",
  });
});
app.get("/", (req, res) => {
  res.json("Welcome to Loquent API");
});
// Routes
app.use("/api/auth", require("../routes/authRoutes.js"));
app.use("/api/posts", require("../routes/postRoutes.js"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
