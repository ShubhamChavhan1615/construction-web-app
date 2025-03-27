import express, { Router } from "express";
import cookieParser from "cookie-parser";
import { dbConnect } from "./db/db.js";
import "dotenv/config";
const PORT = process.env.PORT;
const app = express();
import UserRout from "./routes/user.js";
import appointmentRoutes from "./routes/appointment.js";
Router();

app.set("view engine", "ejs");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
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

// Project Page

const projects = [
  {
    name: "Construction Management Website",
    description:
      "A full-featured platform for managing construction projects, clients, and vendors.",
    image:
      "https://media.istockphoto.com/id/1447581973/photo/top-view-construction-workers-or-blueprint-planning-in-house-home-or-office-building-in-real.jpg?s=612x612&w=0&k=20&c=HDVMA3lTJAr1XqSh1CxrGmfut8LfHxGbGjMZ1hF8X0k=",
    link: "",
  },
  {
    name: "InfraConnect Portal",
    description:
      "A digital solution for connecting construction professionals with vendors.",
    image:
      "https://media.istockphoto.com/id/1646522124/photo/many-different-multiclored-colorful-heavy-industrial-machinery-equipment-at-construction-site.jpg?s=612x612&w=0&k=20&c=K2Jq3wF4tvxfWrEetZ1Ie_pKtHYeWxEpZ8XoetqNXKw=",
    link: "",
  },
  {
    name: "Site Inspection App",
    description:
      "An application to track and document site inspections and progress.",
    image:
      "https://media.istockphoto.com/id/635922448/photo/crane-and-highrise-construction-site.jpg?s=612x612&w=0&k=20&c=EgQTwydqspmW6c5etJL1d5WiowaOo85Y7q-Q65yVQC4=",
    link: "",
  },
  {
    name: "Construction Budget Tracker",
    description:
      "A tool to manage construction budgets and project costs efficiently.",
    image:
      "https://media.istockphoto.com/id/897664288/photo/worker-at-construction-site-is-fixing-the-form-for-the-beam.jpg?s=612x612&w=0&k=20&c=57HkKCv9CDdPuo4goHqNTIQ7yvK-LYScpKTS4OsYwL4=",
    link: "",
  },
  {
    name: "Contractor Bidding System",
    description:
      "An online platform for managing contractor bids and project tenders.",
    image:
      "https://media.istockphoto.com/id/170961867/photo/construction-workers-working-on-construction-site.jpg?s=612x612&w=0&k=20&c=DyizE_4OvIw1xgOo5cNShX2Hg7tdYJUuSYl3-FWAqWU=",
    link: "",
  },
  {
    name: "Material Inventory System",
    description:
      "A system to manage and track construction materials inventory.",
    image:
      "https://media.istockphoto.com/id/1164943425/photo/turning-dreams-into-winning-designs.jpg?s=612x612&w=0&k=20&c=SFAZx9crVcqMxaSpkOIhF4ZQOIPwSGfelcseU2aURXs=",
    link: "",
  },
];

app.get("/projects", (req, res) => {
  res.render("Project", { projects });
});

app.use("/api/appointment", appointmentRoutes);

app.listen(PORT, () => {
  dbConnect();
  console.log(`Server is running on http://localhost:${PORT}`);
});
