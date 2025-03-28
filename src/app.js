import express, { Router } from "express";
import cookieParser from "cookie-parser";
import { dbConnect } from "./db/db.js";
import "dotenv/config";
const PORT = process.env.PORT;
const app = express();
import UserRout from "./routes/user.js";
import appointmentRoutes from "./routes/appointment.js";
import contactrouter from "./routes/contact.js"
import planRouter from "./routes/plans.js"
import gallaryroute from "./routes/gallery.js"
import { checkAuth } from "./middleware/jwt.middleware.js";

Router();

app.set("view engine", "ejs");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api-user", UserRout);
app.use("/api-contact",contactrouter)
app.use("/api-plan", planRouter)
app.use("/api-gallary", gallaryroute)

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
app.get("/admin/manage/slider", (req, res) => {
  res.render("Admin/slider");
});

// index Page
app.get("/", checkAuth,async (req, res) => {
  try {
    const user = await UserModel.findById(req.user);
    const news = [
      {
        title: "New Project Launched",
        description:
          "We recently initiated a multi-story commercial project to enhance city infrastructure.",
        image:
          "https://media.istockphoto.com/id/1018091598/photo/construction-plan-and-skyline-building-with-a-crane.jpg?s=612x612&w=0&k=20&c=Mhn3VDsiY2XerdCxfS9bppMGKrce71Xt9Q_hU1GrRAY=",
        link: "/news/1",
      },
      {
        title: "Enhanced Safety Protocols",
        description:
          "Our updated safety guidelines ensure smooth and secure project management for all.",
        image:
          "https://media.istockphoto.com/id/2193657947/photo/construction-site-worker-and-engineer-discussing-on-blueprint-project.jpg?s=612x612&w=0&k=20&c=KkBDlT0S6xFG6xTgH-3-dDVYa_VHfZuoHpPwuU2HCSk=",
        link: "/news/2",
      },
      {
        title: "Sustainability Award 2025",
        description:
          "Honored with a prestigious award for integrating eco-friendly practices in construction.",
        image:
          "https://media.istockphoto.com/id/2151288367/vector/2025-black-silhouette-of-staff-works-as-a-team-to-prepare-to-welcome-the-new-year-2025.jpg?s=612x612&w=0&k=20&c=-_Zx7cTAADXEoPYCH3KqknfDwywNDj_6zeRzDfebx8k=",
        link: "/news/3",
      },
    ];

    const projects = [
      {
        title: "🏢 Commercial Complex",
        status: "✅ Completed in 2024",
        image:
          "https://media.istockphoto.com/id/932755326/photo/modern-office-buildings-made-of-glass-and-concret.jpg?s=612x612&w=0&k=20&c=GfBzrP3HF5XOwqh6sBrOo-_2Jv6pB1a77t0R3-X6L1o=   ",
        link: "/projects/1",
      },
      {
        title: "🏭 Industrial Plant",
        status: "🚧 Ongoing Project",
        image:
          "https://media.istockphoto.com/id/922601466/photo/engineering-is-use-notebook-check-and-standing-in-front-of-oil-refinery-building-structure-in.jpg?s=612x612&w=0&k=20&c=jefHShMVnAfQ6tfkJTe4NO7AD09lIZdJ3xYNyg2IdOk=",
        link: "/projects/2",
      },
      {
        title: "🏡 Residential Villas",
        status: "✅ Completed in 2023",
        image:
          "https://media.istockphoto.com/id/1063723682/photo/hand-sketching-a-designer-villa-with-pool.jpg?s=612x612&w=0&k=20&c=SlIacvwSEEsZ-2imWLDk6dC0glhaWEg-pOGFSK4YQuI=",
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
      user,
      projects,
      services,
    });
  } catch (error) {
    res.render("error");
  }
});



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

// Services Page

app.get("/services", (req, res) => {
  const services = [
    {
      title: "Project Planning",
      description:
        "Detailed project plans that ensure timely delivery with minimal risks.",
      icon: "📋",
    },
    {
      title: "Site Management",
      description: "Effective on-site management to oversee daily operations.",
      icon: "🏗️",
    },
    {
      title: "Budget Estimation",
      description: "Accurate cost estimation to ensure budget control.",
      icon: "💰",
    },
    {
      title: "Quality Assurance",
      description: "Ensuring high-quality standards in every phase.",
      icon: "✅",
    },
    {
      title: "Safety Management",
      description:
        "Safety protocols to protect workers and maintain compliance.",
      icon: "⚠️",
    },
    {
      title: "Post-Construction Support",
      description: "Reliablesupport even after project completion.",
      icon: "🏢",
    },
  ];
  const benefits = [
    {
      title: "Expert Professionals",
      description:
        "Our team is skilled and experienced in handling complex projects.",
    },
    {
      title: "Advanced Technology",
      description:
        "We use the latest tools and technology to streamline operations.",
    },
    {
      title: "Client Satisfaction",
      description: "Our priority is to meet and exceed client expectations.",
    },
  ];
  const testimonials = [
    {
      name: "Rajesh Kumar",
      feedback:
        "Exceptional service and timely completion of our project. Highly recommended!",
    },
    {
      name: "Neha Sharma",
      feedback:
        "The team demonstrated professionalism and maintained high-quality standards.",
    },
    {
      name: "Amit Patil",
      feedback:
        "Reliable and efficient project management. Would work with them again!",
    },
  ];

  res.render("Services", { services, testimonials, benefits });
});

// Plans Page

const plans = [
  { 
    image: "https://media.istockphoto.com/id/1164943425/photo/turning-dreams-into-winning-designs.jpg?s=612x612&w=0&k=20&c=SFAZx9crVcqMxaSpkOIhF4ZQOIPwSGfelcseU2aURXs=",
    name: "Basic Plan",
    description: "Perfect for small projects and startups.",
    price: 299,
    features: [
      "Basic Construction Support",
      "Project Management Tools",
      "Standard Safety Guidelines",
    ],
  },
  {
    image: "https://media.istockphoto.com/id/1164943425/photo/turning-dreams-into-winning-designs.jpg?s=612x612&w=0&k=20&c=SFAZx9crVcqMxaSpkOIhF4ZQOIPwSGfelcseU2aURXs=",
    name: "Standard Plan",
    description: "Ideal for medium-sized projects.",
    price: 599,
    features: [
      "Advanced Construction Planning",
      "Priority Project Management",
      "Extended Safety Protocols",
      "Dedicated Support",
    ],
  },
  {
    image: "https://media.istockphoto.com/id/1164943425/photo/turning-dreams-into-winning-designs.jpg?s=612x612&w=0&k=20&c=SFAZx9crVcqMxaSpkOIhF4ZQOIPwSGfelcseU2aURXs=",
    name: "Premium Plan",
    description: "Best for large-scale and complex projects.",
    price: 999,
    features: [
      "End-to-End Project Management",
      "Customized Construction Solutions",
      "On-Site Safety & Quality Control",
      "24/7 Premium Support",
    ],
  },
];

const faqs = [
  {
    question: "Which plan is best for my project?",
    answer:
      "It depends on the size and complexity of your project. Our Standard and Premium plans are best for larger-scale projects.",
  },
  {
    question: "Can I switch plans after starting?",
    answer:
      "Yes, you can upgrade or switch to a different plan anytime during the project.",
  },
  {
    question: "Is there any cancellation policy?",
    answer:
      "You can cancel your plan within 14 days of subscription with a full refund.",
  },
];

// Render Plans Page
app.get("/plans", (req, res) => {
  res.render("Plans", { plans, faqs });
});

// Contact page
app.get("/contact", (req, res) => {
  const contactInfo = [
    {
      icon: "📍", // Location Icon
      title: "Our Office",
      detail: "123 Main Street, Ahmednagar, Maharashtra",
    },
    {
      icon: "📞", // Phone Icon
      title: "Phone Number",
      detail: "+91 7387539006",
    },
    {
      icon: "✉️", // Email Icon
      title: "Email Address",
      detail: "rokadevaibhav04@gmail.com",
    },
  ];

  res.render("contact", { contactInfo });
});

app.use("/api/appointment", appointmentRoutes);

app.listen(PORT, () => {
  dbConnect();
  console.log(`Server is running on http://localhost:${PORT}`);
});
