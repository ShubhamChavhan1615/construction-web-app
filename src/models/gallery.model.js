import mongoose from "mongoose";

const gallarySchema = new mongoose.Schema({
    gallaryimage :{
        type: String,        
    }
})
export default mongoose.model("Gallary" ,gallarySchema)