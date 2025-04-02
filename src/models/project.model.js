import mongoose from "mongoose";

// Define the schema for the Project
const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        
    },
    completionDate: {
        type: Date,
       
    },
    description: {
        type: String,
        
    },
    image: {
        type: String,
        required: true,  // Assuming it's a URL or path to the image
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create and export the Project model based on the schema
export default mongoose.model('Project', projectSchema);


