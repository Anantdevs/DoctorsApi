// routes/appointments.js
const express = require("express");
const router = express.Router();
const Appointment = require("../models/appointmentSchema");
const Doctor = require("../models/doctorSchema");

router.post("/appointments", async (req, res) => {
  const { doctorId, userId, date, time, patientDetails } = req.body;

  try {
    const appointment = new Appointment({
      doctorId,
      userId,
      date,
      time,
      patientDetails,
    });

    await appointment.save();
    res
      .status(201)
      .json({ message: "Appointment created successfully", appointment });
  } catch (error) {
    res.status(500).json({ error: "Failed to create appointment" });
  }
});

router.get("/appointments/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch appointments for the specified user
    const appointments = await Appointment.find({ userId }).populate(
      "doctorId"
    );

    // Return the appointments
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});
router.delete("/delete/appointments/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the appointment
    const result = await Appointment.findByIdAndDelete(id);

    if (result) {
      res.status(200).json({ message: "Appointment deleted successfully" });
    } else {
      res.status(404).json({ error: "Appointment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete appointment" });
  }
});

module.exports = router;
