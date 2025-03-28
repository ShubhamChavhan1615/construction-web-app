import express from "express"
import { getGallary, Creategallery,Deletegallary } from "../controllers/gallary.controles.js"
import { checkAuth } from "../middleware/jwt.middleware.js"
const Router = express.Router()

Router.post("/insert-gallaryimg",checkAuth,Creategallery)
Router.get("/get-gallaryimg",checkAuth,getGallary)
Router.delete("/delete-gallaryimg/:id",checkAuth,Deletegallary)

export default Router