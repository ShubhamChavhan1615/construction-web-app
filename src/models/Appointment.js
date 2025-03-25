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
        type: Number,
        required: true,
    },
    service: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: "",
    },
    time: {
        type: String,
        required: true,
    },
    addComments: {
        type: String,
        required: String,
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "cancelled"],
        default: "pending"
    }
})

export default mongoose.model("AppointmentModels", AppointmentSchema)