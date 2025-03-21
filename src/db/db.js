import mongoose from "mongoose";
const MONGO_URL = process.env.MONGODB_URL

export const dbConnect = async () => {
    try {
        const con = await mongoose.connect(MONGO_URL)
        console.log(`Database connected successfully!${con.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}