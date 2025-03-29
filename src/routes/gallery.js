import express from "express"
import { getGallary, Creategallery, Deletegallary } from "../controllers/gallary.controles.js"
import { checkAuth } from "../middleware/jwt.middleware.js"
import { upload } from "../middleware/Multer_Middleware.js"
const Router = express.Router()

Router.post("/insert-gallaryimg", upload.single("galleryImage"), Creategallery)
Router.get("/get-gallaryimg", checkAuth, getGallary)
Router.delete("/delete-gallaryimg/:id", checkAuth, Deletegallary)

export default Router