const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "https://loquent.vercel.app/", // Update this to your actual frontend URL
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.options("*", cors(corsOptions));
// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use("/", (req, res) => {
  res.send("Welcome to Loquent API");
});
// Routes
app.use("/api/auth", require("./routes/authRoutes.js"));
app.use("/api/posts", require("./routes/postRoutes.js"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
