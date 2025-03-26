import express from "express";
import AppointmentModel from "../models/Appointment.js";

const router = express.Router();

// Create a new appointment
export const createAppointment = async (req, res) => {
  try {
    const { name, email, contact, service, date, time, comments } = req.body;

    // Validate required fields
    if (!name || !email || !contact || !service || !date || !time) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    // Validate contact number format (10-digit number)
    if (!/^[0-9]{10}$/.test(contact)) {
      return res.status(400).json({ error: "Invalid contact number format." });
    }

    // Validate date format
    if (isNaN(new Date(date).getTime())) {
      return res.status(400).json({ error: "Invalid date format." });
    }

    // Create and save appointment
    const appointment = new AppointmentModel({
      name,
      email,
      contact,
      service,
      date: new Date(date), // Ensure valid date conversion
      time,
      addComments: comments, // Adjust field name
    });

    await appointment.save();
    // res.redirect("/");
    return res
      .status(201)
      .json({ message: "Appointment Send Successfully...!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all appointments
export const getAppointments = async (req, res) => {
  try {
    const appointments = await AppointmentModel.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single appointment by ID
// router.get("/appointments/:id", );

export const getSingleAppointmet = async (req, res) => {
  try {
    const appointment = await AppointmentModel.findById(req.params.id);
    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an appointment by ID
export const updateAppointment = async (req, res) => {
  try {
    const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAppointment)
      return res.status(404).json({ message: "Appointment not found" });
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an appointment by ID
export const deleteAppointment = async (req, res) => {
  try {
    const deletedAppointment = await AppointmentModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedAppointment)
      return res.status(404).json({ message: "Appointment not found" });
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default router;
