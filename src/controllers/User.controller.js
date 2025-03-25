import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt"

export const UserSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log(req.body);

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All Field Required!" })
        }
        const checkemail = await UserModel.findOne({ email })
        if (checkemail) {
            return res.status(400).json({ message: "User allredy Exsite" });
        }

        const haspassword = await bcrypt.hash(password, 11)

        const UserRegister = new UserModel({
            name,
            email,
            password: haspassword,
        })
        await UserRegister.save();

        return res.status(200).json({ message: "User Register Successfully!", UserRegister })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Interal Server Error!" })
    }
}