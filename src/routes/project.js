import express from "express"
import { createProject, getproject, updateProject, deleteproject } from "../controllers/project.controles.js"
import { checkAuth } from "../middleware/jwt.middleware.js"
import upload from "../middleware/Multer_Middleware.js"
const Router = express.Router()

Router.post("/createProject-register", checkAuth, upload.array("image", 5), createProject)
Router.get("/GetAll", getproject)
Router.put("/project-update/:id", checkAuth, updateProject)
Router.delete("/project-delete/:id", checkAuth, deleteproject)

export default Router