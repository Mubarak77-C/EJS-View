const express = require("express");
const path = require("node:path");
const app = express();

// 1. Set EJS as the template engine
app.set("view engine", "ejs");

// 2. Point Express to the "views" folder safely using path.join
app.set("views", path.join(__dirname, "views"));

// 3. Mock data or navigation links to pass into views
const links = [
  { href: "/", text: "Home" },
  { href: "/about", text: "About" },
];

// --- ROUTES ---

// Home Route
app.get("/", (req, res) => {
  res.render("index", {
    title: "Home Page",
    message: "Welcome to my dynamic Node & EJS app!",
    links: links,
  });
});

// Assignment Requirement: Add an /about route
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us",
    message: "This app is built using Node.js, Express, and EJS templates.",
    links: links,
  });
});

// Server listener
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
