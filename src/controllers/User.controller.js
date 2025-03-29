import { generated } from "../middleware/generatedtoken.js";
import { checkAuth } from "../middleware/jwt.middleware.js";
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

        const token = generated(UserRegister.id)
        res.cookie("authToken", token, { httpOnly: true, secure: true, maxAge: 3600000 });
        res.redirect("/")
        // return res.status(200).json({ message: "User Register Successfully!", token })

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
        res.cookie("authToken", token, { httpOnly: true, secure: true, maxAge: 3600000000000000 });
        res.redirect("/")

        // return res.status(200).json({ message: "Login Successfully", token })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Interal Server Error!" })
    }
}


export const teamMember = async (req, res) => {
    try {
        const { name, email, role, image } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: "All Field Required!" })
        }
        const checkemail = await UserModel.findOne({ email })
        if (checkemail) {
            return res.status(400).json({ message: "User allredy Exsite" });
        }

        const UserRegister = new UserModel({
            name,
            email,
            role,
            image,
        })
        await UserRegister.save();
        res.redirect("/admin")
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Interal Server Error!" })
    }
}

export const updatedteamuser = async (req, res) => {
    try {
        const { name, email, role, image } = req.body;
        const userId = req.params.id;
        const user = await UserModel.findById(userId)
        if (!user) {
            return res.status(400).json({ message: "all field Required!" })
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (role) user.role = role;
        if (image) user.image = image;

        await user.save();
        return res.status(200).json({ message: "Team Updated Successfully!" })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Interal Server Error!" })
    }
}

export const deleteteammembers = async (req, res) => {
    try {
        const deleteteammembers = await UserModel.findByIdAndDelete(req.params.id);
        if (!deleteteammembers) {
            return res.status(400).json({ message: "Team Memebers Not Found!" })
        }
        return res.status(200).json({ message: "Team Memeber Deleted Successfully!" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Interal Server Error!" })
    }
}