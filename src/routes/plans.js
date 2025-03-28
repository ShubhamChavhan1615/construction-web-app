import express from "express"
import { createplan, Deleteplan, getplan, updateplan } from "../controllers/plans.controles.js" 
import { checkAuth } from "../middleware/jwt.middleware.js"
const Router = express.Router()

Router.post("/plan-register",checkAuth ,createplan)
Router.get("/plan-register" ,getplan)
Router.put("/plan-update/:id",checkAuth, updateplan)
Router.delete("/plan-delete/:id",checkAuth, Deleteplan )

export default Router