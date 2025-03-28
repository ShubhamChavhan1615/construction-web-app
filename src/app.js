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

app.get("/admin", (req, res) => {
  res.render("Admin/admin", { title: "Admin" });
});

app.get("/dashbord", (req, res) => {
  res.render("Admin/dashboard");
});

app.get("/admin/manage/service", (req, res) => {
  res.render("Admin/servises");
});

app.get("/admin/manage/plan", (req, res) => {
  res.render("Admin/plan");
});

// index Page
app.get("/", async (req, res) => {
  try {
    const news = [
      {
        title: "New Project Launched",
        description:
          "We recently initiated a multi-story commercial project to enhance city infrastructure.",
        image:
          "https://media.istockphoto.com/id/915518326/photo/digital-tablet-and-hardhat-on-blueprint.jpg",
        link: "/news/1",
      },
      {
        title: "Enhanced Safety Protocols",
        description:
          "Our updated safety guidelines ensure smooth and secure project management for all.",
        image:
          "https://media.istockphoto.com/id/2196936311/photo/two-construction-workers-working-together-while-visiting-a-new-building.jpg",
        link: "/news/2",
      },
      {
        title: "Sustainability Award 2025",
        description:
          "Honored with a prestigious award for integrating eco-friendly practices in construction.",
        image:
          "https://media.istockphoto.com/id/2190041308/photo/silhouette-of-construction-camp-site-with-cranes.jpg",
        link: "/news/3",
      },
    ];

    const projects = [
      {
        title: "🏢 Commercial Complex",
        status: "✅ Completed in 2024",
        image:
          "https://media.istockphoto.com/id/1165384568/photo/europe-modern-complex-of-residential-buildings.jpg",
        link: "/projects/1",
      },
      {
        title: "🏭 Industrial Plant",
        status: "🚧 Ongoing Project",
        image:
          "https://media.istockphoto.com/id/922601466/photo/engineering-is-use-notebook-check.jpg",
        link: "/projects/2",
      },
      {
        title: "🏡 Residential Villas",
        status: "✅ Completed in 2023",
        image:
          "https://media.istockphoto.com/id/1151832961/photo/evening-view-of-a-modern-large-house-with-swimming-pool.jpg",
        link: "/projects/3",
      },
    ];

    const services = [
      {
        title: "Project Management",
        description:
          "Ensure efficient project execution with real-time monitoring and reporting.",
        icon: "🏗️",
        link: "/services/1",
      },
      {
        title: "Structural Engineering",
        description:
          "Advanced structural solutions ensuring safety and durability.",
        icon: "🏢",
        link: "/services/2",
      },
      {
        title: "Geotechnical Analysis",
        description:
          "Comprehensive soil analysis and ground engineering expertise.",
        icon: "🌱",
        link: "/services/3",
      },
    ];

    res.render("index", {
      title: "Construction Management",
      news,
      projects,
      services,
    });
  } catch (error) {
    res.render("error");
  }
});

app.use("/api-user", UserRout);

app.get("/About", (req, res) => {
  const teamMembers = [
    {
      name: "John Doe",
      role: "Senior Engineer",
      img: "https://media.istockphoto.com/id/916160804/photo/construction-workers-at-outdoor-drilling-site.jpg?s=612x612&w=0&k=20&c=zXcJ8mBqky98xLu85kx0WSTR2jOiAbOAtkeGqwbs4zw=",
    },
    {
      name: "Jane Smith",
      role: "Lead Architect",
      img: "https://media.istockphoto.com/id/1499135871/photo/construction-team-collaboration-and-portrait-outdoor-for-building-and-architecture-happy.jpg?s=612x612&w=0&k=20&c=nch12b6ANUTZsEixHEJ4yU3-nPVq5V_Bj7R4Srn6kms=",
    },
    {
      name: "Michael Brown",
      role: "Project Manager",
      img: "https://media.istockphoto.com/id/1331285358/photo/portrait-of-smiling-construction-engineers-with-protective-helmets-and-reflective-wests.jpg?s=612x612&w=0&k=20&c=8zrO23i_1tzd2RAcOa8abRYUWREKZ7u1T5V6mtdwK60=",
    },
  ];
  const milestones = [
    { year: 2010, event: "Founded the company with a vision to excel." },
    { year: 2015, event: "Completed 100 successful projects." },
    {
      year: 2020,
      event: "Expanded operations to 5 major cities.",
    },
  ];
  const achievements = [
    { title: "500+", description: "Projects Completed" },
    {
      title: "300+",
      description: "Happy Clients",
    },
    { title: "15+", description: "Years of Excellence" },
  ];
  res.render("About", {
    title: "About",
    teamMembers,
    milestones,
    achievements,
  });
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
