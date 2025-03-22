import express from "express";
import { dbConnect } from "./db/db.js";
import "dotenv/config";
const PORT = process.env.PORT;
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/About", (req, res) => {
  res.render("About", { title: "About" });
});

app.listen(PORT, () => {
  dbConnect();
  console.log(`Server is running on http://localhost:${PORT}`);
});
