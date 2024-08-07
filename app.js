const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const notificationRouter = require("./routes/notification");
const appointmentRoutes = require("./routes/appointment");

const app = express();

// Middleware
app.use(bodyParser.json()); // For parsing application/json

// Use notification routes
app.use("/user", notificationRouter);
app.use("/", appointmentRoutes);

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/notifications")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
