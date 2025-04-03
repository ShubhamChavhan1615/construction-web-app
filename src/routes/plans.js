import express from "express"
import { createplan, Deleteplan, updateplan } from "../controllers/plans.controles.js" 
import { checkAuth } from "../middleware/jwt.middleware.js"
import  upload  from "../middleware/Multer_Middleware.js"
const Router = express.Router()

Router.post("/plan-register",checkAuth ,createplan)
// Router.get("/plan-register" ,getplan)
Router.post("/edit/:id",checkAuth, updateplan)
Router.delete("/delete/:id",checkAuth, Deleteplan )

export default Router