// import mongoose from "mongoose";

// const PlansSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     type: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     status: {
//         type: String,
//         enum: ["Ongoing", "Completed", "Pending"],
//         required: true
//     },
//     price: {
//         type: String,
//         required: true
//     },
//     rating: {
//         type: Number,
//         required: true,
//         min: 0,
//         max: 5
//     },
//     startDate: {
//         type: Date,
//         required: true
//     },
//     endDate: {
//         type: Date,
//         required: true
//     },
//     image: {
//         type: [String],
//         required: true
//     },
// });

//  export default mongoose.model("plans", PlansSchema);

import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema({
    image: { type: String, required: true },
    images: { type: [String], default: [] },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    features: { type: [String], required: true }
});

export default mongoose.model('Plan', PlanSchema);

 // give me a form ejs with db store data and image and images in post url systems 