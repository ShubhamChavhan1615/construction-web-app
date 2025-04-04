import express, { Router } from "express";
import cookieParser from "cookie-parser";
import { dbConnect } from "./db/db.js";
import "dotenv/config";
const PORT = process.env.PORT;
const app = express();
import UserRout from "./routes/user.js";
import appointmentRoutes from "./routes/appointment.js";
import contactrouter from "./routes/contact.js";
import planRouter from "./routes/plans.js";
import gallaryroute from "./routes/gallery.js";
import projectrouter from "./routes/project.js"
import servicesRouter from "./routes/services.js";
import { checkAuth } from "./middleware/jwt.middleware.js";
import { Service } from "./models/services.js";
import UserModel from "./models/UserModel.js";
import galleryModel from "./models/gallery.model.js";
import { getGallary } from "./controllers/gallary.controles.js";
import projectModel from "./models/project.model.js";
import plansModel from "./models/plans.model.js";

Router();

app.set("view engine", "ejs");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// app.get("/admin", checkAuth, async (req, res) => {
//   try {
//     const users = await UserModel.find({},req.email);
//     const team = await UserModel.find()
//     res.render("Admin/admin", { title: "Admin", users,team });
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });
app.get("/admin", checkAuth, async (req, res) => {
  try {
    const AdminUser = await UserModel.findById(req.user);

    // Proper Admin Check
    if (!AdminUser || AdminUser.isAdmin !== "Admin") {
      return res.redirect("/");
    }

    const users = await UserModel.find(); // Fetch all users
    res.render("Admin/admin", { title: "Admin", users: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/blogs",checkAuth, async (req, res) => {
  try {
    const project = await projectModel.find({})
    res.render("Admin/blogs", { title: "Blogs", project });
  } catch (error) {
    console.log(error)
    res.status(500).json({msg:"internal server error"})
  }
});

app.get("/admin/manage/service", async (req, res) => {
  const services = await Service.find();

  res.render("Admin/services", { title: "Sarvices", services: services });
});
app.get("/edit/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    const project = await projectModel.findById(req.params.id)
    const plan = await plansModel.findById(req.params.id) // Correct query
    if(service)
    res.render("Admin/editsarvice", { title: "Edit Service", service });
    else if(project)
    res.render("Admin/editblog", { title: "Edit blog", project });
    else if(plan)
    res.render("Admin/editplan", { title: "Edit blog", plan });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/delete/:id", async (req, res) => {
  
  const services = await Service.findByIdAndDelete(req.params.id);
  const project = await projectModel.findByIdAndDelete(req.params.id)
  const plan = await plansModel.findByIdAndDelete(req.params.id)
  if(services)
    res.render("Admin/services", { title: "Service", services });
   else if(project)
    res.render("Admin/blogs", { title: "project", project });
    else if(plan)
    res.render("Admin/plan", { title: "project", plan });
   
});

app.get("/admin/manage/plan", async(req, res) => {
  const plan = await plansModel.find({})
  
  res.render("Admin/plan" ,{title:"plan",plan});
});
app.get("/admin/manage/slider", (req, res) => {
  res.render("Admin/slider");
});
app.get("/admin/manage/team", async (req, res) => {
  try {
    res.render("Admin/team", { title: "Admin" });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/admin/manage/gallarymanage", async (req, res) => {
  try {
    const gallary = await galleryModel.find()
    res.render("Admin/gallarymanage", { title: "Admin", gallary });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
});


// index Page
app.get("/", checkAuth, async (req, res) => {
  try {
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

    // const services = [
    //   {
    //     title: "Project Management",
    //     description:
    //       "Ensure efficient project execution with real-time monitoring and reporting.",
    //     icon: "🏗️",
    //     link: "/services/1",
    //   },
    //   {
    //     title: "Structural Engineering",
    //     description:
    //       "Advanced structural solutions ensuring safety and durability.",
    //     icon: "🏢",
    //     link: "/services/2",
    //   },
    //   {
    //     title: "Geotechnical Analysis",
    //     description:
    //       "Comprehensive soil analysis and ground engineering expertise.",
    //     icon: "🌱",
    //     link: "/services/3",
    //   },
    // ];
    const services = await Service.find({});
    const galleryItems= await galleryModel.find()
    // Check if user is authenticated
    if (req.user) {
      const user = await UserModel.findById(req.user);

      return res.render("index", {
        title: "Construction Management",
        news,
        user,
        projects,
        services,
        galleryItems
      });
    }

    return res.render("index", {
      title: "Construction Management",
      news,
      user: null,
      projects,
      services,
      galleryItems
    });
  } catch (error) {
    console.log(error.message);
    res.render("error");
  }
});


app.get("/About", checkAuth, async (req, res) => {
  // const teamMembers = [
  //   {
  //     name: "John Doe",
  //     role: "Senior Engineer",
  //     img: "https://media.istockphoto.com/id/916160804/photo/construction-workers-at-outdoor-drilling-site.jpg?s=612x612&w=0&k=20&c=zXcJ8mBqky98xLu85kx0WSTR2jOiAbOAtkeGqwbs4zw=",
  //   },
  //   {
  //     name: "Jane Smith",
  //     role: "Lead Architect",
  //     img: "https://media.istockphoto.com/id/1499135871/photo/construction-team-collaboration-and-portrait-outdoor-for-building-and-architecture-happy.jpg?s=612x612&w=0&k=20&c=nch12b6ANUTZsEixHEJ4yU3-nPVq5V_Bj7R4Srn6kms=",
  //   },
  //   {
  //     name: "Michael Brown",
  //     role: "Project Manager",
  //     img: "https://media.istockphoto.com/id/1331285358/photo/portrait-of-smiling-construction-engineers-with-protective-helmets-and-reflective-wests.jpg?s=612x612&w=0&k=20&c=8zrO23i_1tzd2RAcOa8abRYUWREKZ7u1T5V6mtdwK60=",
  //   },
  // ];
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
  const teamMembers = await UserModel.find({});
  if (req.user) {
    const user = await UserModel.findById(req.user);

    return res.render("About", {
      title: "About",
      user,
      teamMembers,
      milestones,
      achievements,
    });
  }

  res.render("About", {
    title: "About",
    user: null,
    teamMembers,
    milestones,
    achievements,
  });
});

app.get('/login',async (req, res) => {
  const user = await UserModel.find()
  if(user){
    
    res.render('Login', { title: 'Login | InfraConnect', user: user  });
  }
  res.render('Login', { title: 'Login | InfraConnect', user: null });
});


app.get("/signup", (req, res) => {
  res.render("Register", { title: "Registration", user: null });
});

// Project Page

//const projects = [
//   {
//     name: "Construction Management Website",
//     description:
//       "A full-featured platform for managing construction projects, clients, and vendors.",
//     image:
//       "https://media.istockphoto.com/id/1447581973/photo/top-view-construction-workers-or-blueprint-planning-in-house-home-or-office-building-in-real.jpg?s=612x612&w=0&k=20&c=HDVMA3lTJAr1XqSh1CxrGmfut8LfHxGbGjMZ1hF8X0k=",
//     link: "",
//   },
//   {
//     name: "InfraConnect Portal",
//     description:
//       "A digital solution for connecting construction professionals with vendors.",
//     image:
//       "https://media.istockphoto.com/id/1646522124/photo/many-different-multiclored-colorful-heavy-industrial-machinery-equipment-at-construction-site.jpg?s=612x612&w=0&k=20&c=K2Jq3wF4tvxfWrEetZ1Ie_pKtHYeWxEpZ8XoetqNXKw=",
//     link: "",
//   },
//   {
//     name: "Site Inspection App",
//     description:
//       "An application to track and document site inspections and progress.",
//     image:
//       "https://media.istockphoto.com/id/635922448/photo/crane-and-highrise-construction-site.jpg?s=612x612&w=0&k=20&c=EgQTwydqspmW6c5etJL1d5WiowaOo85Y7q-Q65yVQC4=",
//     link: "",
//   },
//   {
//     name: "Construction Budget Tracker",
//     description:
//       "A tool to manage construction budgets and project costs efficiently.",
//     image:
//       "https://media.istockphoto.com/id/897664288/photo/worker-at-construction-site-is-fixing-the-form-for-the-beam.jpg?s=612x612&w=0&k=20&c=57HkKCv9CDdPuo4goHqNTIQ7yvK-LYScpKTS4OsYwL4=",
//     link: "",
//   },
//   {
//     name: "Contractor Bidding System",
//     description:
//       "An online platform for managing contractor bids and project tenders.",
//     image:
//       "https://media.istockphoto.com/id/170961867/photo/construction-workers-working-on-construction-site.jpg?s=612x612&w=0&k=20&c=DyizE_4OvIw1xgOo5cNShX2Hg7tdYJUuSYl3-FWAqWU=",
//     link: "",
//   },
//   {
//     name: "Material Inventory System",
//     description:
//       "A system to manage and track construction materials inventory.",
//     image:
//       "https://media.istockphoto.com/id/1164943425/photo/turning-dreams-into-winning-designs.jpg?s=612x612&w=0&k=20&c=SFAZx9crVcqMxaSpkOIhF4ZQOIPwSGfelcseU2aURXs=",
//     link: "",
//   },
//];

app.get("/projects", checkAuth, async (req, res) => {
  const projects = await projectModel.find()
  if (req.user) {
    const user = await UserModel.findById(req.user);
    return res.render("Project", {
      title: "Project",
      user,
      projects,
    });
  }

  res.render("Project", { title: "Project", user: null, projects });
});

// Services Page

app.get("/services", checkAuth, async (req, res) => {
  // const services = [
  //   {
  //     title: "Project Planning",
  //     description:
  //       "Detailed project plans that ensure timely delivery with minimal risks.",
  //     icon: "📋",
  //   },
  //   {
  //     title: "Site Management",
  //     description: "Effective on-site management to oversee daily operations.",
  //     icon: "🏗️",
  //   },
  //   {
  //     title: "Budget Estimation",
  //     description: "Accurate cost estimation to ensure budget control.",
  //     icon: "💰",
  //   },
  //   {
  //     title: "Quality Assurance",
  //     description: "Ensuring high-quality standards in every phase.",
  //     icon: "✅",
  //   },
  //   {
  //     title: "Safety Management",
  //     description:
  //       "Safety protocols to protect workers and maintain compliance.",
  //     icon: "⚠️",
  //   },
  //   {
  //     title: "Post-Construction Support",
  //     description: "Reliablesupport even after project completion.",
  //     icon: "🏢",
  //   },
  // ];
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

  const services = await Service.find({})
  if (req.user) {
    const user = await UserModel.findById(req.user);
    // const services = await Service.find({})
    return res.render("Services", {
      title: "Services",
      services,
      user,
      testimonials,
      benefits,
    });
  }

  res.render("Services", {
    title: "Services",
    services,
    user: null,
    testimonials,
    benefits,
  });
});

// Plans Page

// const plans = [
//   {
//     image:
//       "https://media.istockphoto.com/id/1164943425/photo/turning-dreams-into-winning-designs.jpg?s=612x612&w=0&k=20&c=SFAZx9crVcqMxaSpkOIhF4ZQOIPwSGfelcseU2aURXs=",
//     name: "Basic Plan",
//     description: "Perfect for small projects and startups.",
//     price: 299,
//     features: [
//       "Basic Construction Support",
//       "Project Management Tools",
//       "Standard Safety Guidelines",
//     ],
//   },
//   {
//     image:
//       "https://media.istockphoto.com/id/1164943425/photo/turning-dreams-into-winning-designs.jpg?s=612x612&w=0&k=20&c=SFAZx9crVcqMxaSpkOIhF4ZQOIPwSGfelcseU2aURXs=",
//     name: "Standard Plan",
//     description: "Ideal for medium-sized projects.",
//     price: 599,
//     features: [
//       "Advanced Construction Planning",
//       "Priority Project Management",
//       "Extended Safety Protocols",
//       "Dedicated Support",
//     ],
//   },
//   {
//     image:
//       "https://media.istockphoto.com/id/1164943425/photo/turning-dreams-into-winning-designs.jpg?s=612x612&w=0&k=20&c=SFAZx9crVcqMxaSpkOIhF4ZQOIPwSGfelcseU2aURXs=",
//     name: "Premium Plan",
//     description: "Best for large-scale and complex projects.",
//     price: 999,
//     features: [
//       "End-to-End Project Management",
//       "Customized Construction Solutions",
//       "On-Site Safety & Quality Control",
//       "24/7 Premium Support",
//     ],
//   },
// ];

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
app.get("/plans", checkAuth,async (req, res) => {
  const plans = await plansModel.find({})
  if(req.user){
  const user = await UserModel.findById(req.user)
  res.render("Plans", {title:"Plans",user, plans, faqs });
   
};
res.render("Plans", {title:"Plans",user:null, plans, faqs });
});
app.get("/plans/:id",async(req,res)=>{
  const plans = await plansModel.findById(req.params.id)
  if(req.user){
    if(!plans)
    res.status(400).json({msg:"plans not found"})
    res.render("partials/moreplaninfo" ,{title:"More Plan Info",user, plans})
  }
  res.render("partials/moreplaninfo" ,{title:"More Plan Info", user:null, plans :[plans]})
})
// Contact page
app.get("/contact", checkAuth, async (req, res) => {
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

  if (req.user) {
    const user = await UserModel.findById(req.user);
    return res.render("Contact", {
      title: "Contact",
      user,
      contactInfo,
    });
  }

  res.render("contact", { title: "Contact", user: null, contactInfo });
});

app.get("/profile", checkAuth, async (req, res) => {
  // const user = req.user;
  if (req.user) {
    const user = await UserModel.findById(req.user);
    return res.render("partials/Profile", { title: "Profile", user });
  }

  res.render("partials/login", { title: "Profile", user: null });
})
app.get("/EditProfile", checkAuth, async (req, res) => {
  const userId = req.query.id; // Get ID from query parameters
  if (userId) {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.render("partials/EditProfile", { title: "Edit Profile", user });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
});
app.get("/logout", async (req, res) => {
  res.clearCookie("authToken"); // Remove the authToken cookie
  res.render("Login", { title: "Login", user: null });
});





app.use("/api/appointment", appointmentRoutes);
app.use("/api-user", UserRout);
app.use("/api/contact", contactrouter);
app.use("/api/plan", planRouter);
app.use("/api/gallary", gallaryroute);
app.use("/api/services", servicesRouter);
app.use("/api-project", projectrouter)

app.get("/delete", async (req, res) => {
  try {
    const user = await UserModel.deleteMany({});
    console.log("user : ", user);

    res.status(200).json(user)
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  dbConnect();
  console.log(`Server is running on http://localhost:${PORT}`);
});



