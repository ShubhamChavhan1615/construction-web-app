import express from "express";
import { createAppointment, deleteAppointment, getAppointments, getSingleAppointmet, updateAppointment } from "../controllers/appointment.controls.js";

const router = express.Router();

// Create a new appointment
router.route("/appointments").post(createAppointment);

//get all appointments
router.route("/appointments").get(getAppointments);

// Get a single appointment by ID
router.route("/appointments/:id").get(getSingleAppointmet)

// Update an appointment by ID
router.route("/appointments/:id").put(updateAppointment);

// Delete an appointment by ID
router.route("/appointments/:id").delete(deleteAppointment);

export default router;