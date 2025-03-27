import express, { Router } from "express";
import cookieParser from "cookie-parser"
import { dbConnect } from "./db/db.js";
import "dotenv/config";
const PORT = process.env.PORT;
const app = express();
import UserRout from "./routes/user.js";
import appointmentRoutes from "./routes/appointment.js"
import { checkAuth } from "./middleware/jwt.middleware.js";
import UserModel from "./models/UserModel.js";

Router();
app.set("view engine", "ejs");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/admin", (req, res) => {
  res.render("Admin/admin", { title: "Admin" });
})

app.get("/dashbord", (req, res) => {
  res.render("Admin/dashboard");
})

app.get("/admin/manage/service", (req, res) => {
  res.render("Admin/servises");
})

app.get("/admin/manage/plan", (req, res) => {
  res.render("Admin/plan");
})

app.get("/", checkAuth, async (req, res) => {
  try {
    // const user = await UserModel.findById(req.user);
    // res.render("index", { title: "Home", user: user.name });
    res.render("index", { title: "Home" });
  } catch (error) {
    res.render("error")
  }
});

app.use("/api-user", UserRout);

app.get("/About", (req, res) => {
  res.render("About", { title: "About" });
});

app.get("/Login", (req, res) => {
  res.render("Login");
});

app.get("/signup", (req, res) => {
  res.render("Register");
});

app.use("/api/appointment", appointmentRoutes)

app.listen(PORT, () => {
  dbConnect();
  console.log(`Server is running on http://localhost:${PORT}`);
});