import express from "express"
import { UserSignup, teamMember, usersignin ,updatedteamuser, deleteteammembers} from "../controllers/User.controller.js";
const router = express.Router();

router.post("/register", UserSignup)
router.post("/login", usersignin)
router.post("/update-profile/:id",updatedteamuser)
router.delete("/delete/:id", deleteteammembers)

//get req
router.get("/", (req, res)=>{
    res.render("index")
})

router.route("/addMember").post(teamMember)

export default router;