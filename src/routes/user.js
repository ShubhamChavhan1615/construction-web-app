import express from "express"
import { UserSignup } from "../controllers/User.controller.js";
const router = express.Router();

router.post("/register", UserSignup)

export default router;