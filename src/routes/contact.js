import express from "express"
import { createcontact, getallcontact } from "../controllers/contact.controles.js"

const router = express.Router()

router.post("/connectus",createcontact)
router.get("/getall/connet",getallcontact)

export default router