import express from "express"
import { UserSignup, usersignin } from "../controllers/User.controller.js";
const router = express.Router();

router.post("/register", UserSignup)
router.post("/login", usersignin)

//get req
router.get("/", (req, res)=>{
    res.render("index")
})

export default router;