import mongoose, { Schema } from "mongoose";

const AppointmentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contact: {
        type: String, // Changed from Number to String to handle leading zeros
        required: true,
    },
    service: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    addComments: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "cancelled"],
        default: "pending",
    },
});

export default mongoose.model("AppointmentModel", AppointmentSchema); // Singular model name
