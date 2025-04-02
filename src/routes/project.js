import express from "express"
import { createProject, getproject, updateProject, deleteproject } from "../controllers/project.controles.js"
import { checkAuth } from "../middleware/jwt.middleware.js"
const Router = express.Router()

Router.post("/createProject-register", createProject)
Router.get("/GetAll", getproject)
Router.post("/update/:id", checkAuth, updateProject)
Router.delete("/delete/:id", checkAuth, deleteproject)

export default Router