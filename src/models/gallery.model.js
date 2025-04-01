import mongoose from "mongoose";

const gallarySchema = new mongoose.Schema({
    image :{
        type: String,        
    }
})
export default mongoose.model("Gallary" ,gallarySchema)