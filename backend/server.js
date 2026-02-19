require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const itemRoutes = require("./routes/itemRoutes");

const cors = require("cors");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/items", itemRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Server + MongoDB setup running");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});