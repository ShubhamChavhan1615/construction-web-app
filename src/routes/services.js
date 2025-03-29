import express from "express";
import { createService } from "../controllers/services.controls.js";

const router = express.Router();

//create a route for the services page
router.route("/").post(createService)


export default router;