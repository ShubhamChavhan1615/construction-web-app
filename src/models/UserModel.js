import mongoose, { Schema } from "mongoose";

const UserModel = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: String,
        required: true,
        enum: ["Admin", "User"],
        default: "User"
    }
})

export default mongoose.model("UserModel", UserModel)
