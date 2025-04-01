import mongoose, { Schema } from "mongoose";

const UserModel = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    image: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-978409_960_720.png"
    },
    role: {
        type: String,
    },
    isAdmin: {
        type: String,
        required: true,
        enum: ["Admin", "User", "Team"],
        default: "User"
    }
})

export default mongoose.model("UserModel", UserModel)
