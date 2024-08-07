// models/doctor.js
const mongoose = require("mongoose");

// Define the doctor schema
const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  experience: { type: Number, required: true }, // Years of experience
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  clinicName: { type: String, required: true },
});

// Create and export the model
module.exports = mongoose.model("Doctor", doctorSchema);
