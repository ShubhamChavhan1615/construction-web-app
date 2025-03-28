import mongoose from "mongoose";

const gallarySchema = new mongoose.Schema({
    gallaryimage :{
        type: String,
        required:true
    }
})
export default mongoose.model("Gallary" ,gallarySchema)