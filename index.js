const express = require("express");
const path = require("node:path");
const app = express();

// Set EJS as template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// --- CRITICAL STEP: Serve Static Assets ---
app.use(express.static(path.join(__dirname, "public")));

const links = [
  { href: "/", text: "Home" },
  { href: "/about", text: "About" },
];

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home Page",
    message: "Welcome to my dynamic Node & EJS app!",
    links: links,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us",
    message: "This app is built using Node.js, Express, and EJS templates.",
    links: links,
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
