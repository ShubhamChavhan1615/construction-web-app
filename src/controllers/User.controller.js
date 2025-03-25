import { generated } from "../middleware/generatedtoken.js";
import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt"

export const UserSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

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

        const token = generated(UserRegister.id)

        return res.status(200).json({ message: "User Register Successfully!", token })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Interal Server Error!" })
    }
}

export const usersignin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All field Required!" });
        }
        const emailcheck = await UserModel.findOne({ email });
        if (!emailcheck) {
            return res.status(400).json({ message: "User Not Found!" });
        }
        const passwordmacth = bcrypt.compare(emailcheck.password, password);
        if (!passwordmacth) {
            return res.status(400).json({ message: "password incorrect!" })
        }

        const token = generated(emailcheck.id);
        return res.status(200).json({ message: "Login Successfully", token })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Interal Server Error!" })
    }
}