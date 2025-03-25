import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
})

export default mongoose.model("ContactModel", contactSchema)