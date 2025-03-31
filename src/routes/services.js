import express from "express";
import { createService, deleteService, editService } from "../controllers/services.controls.js";

const router = express.Router();

//create a route for the services page
router.route("/").post(createService)

//edit a route for the services page
router.route("/:id").post(editService)

//delete a route for the services page
router.route("/:id").delete(deleteService)

export default router;