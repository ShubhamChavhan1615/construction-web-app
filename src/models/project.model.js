import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },   
    price: {
        type: String,
        required: true
    },    
    image: {
        type: [String],
        required: true
    },
});

 export default mongoose.model("Project", ProjectSchema);