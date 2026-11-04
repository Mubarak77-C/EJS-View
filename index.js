const express = require("express");
const path = require("node:path");
const app = express();

// 1. View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 2. CRITICAL: Middleware to parse URL-encoded form bodies (req.body)
app.use(express.urlencoded({ extended: true }));

// 3. Serve Static Assets
app.use(express.static(path.join(__dirname, "public")));

// 4. In-Memory Message Database (State)
const messages = [
  {
    text: "Hi there!",
    user: "Amigo",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

// --- ROUTES ---

// Home Route: Display messages
app.get("/", (req, res) => {
  res.render("index", { title: "Mini Message Board", messages: messages });
});

// Form Route: Render the input form
app.get("/new", (req, res) => {
  res.render("form", { title: "New Message" });
});

// POST Route: Capture form input, push to array, redirect
app.post("/new", (req, res) => {
  const messageText = req.body.messageText;
  const messageUser = req.body.messageUser;

  messages.push({ text: messageText, user: messageUser, added: new Date() });

  // Industrial standard: Redirect back to home so users don't resubmit on page refresh
  res.redirect("/");
});

// Server Listener
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Mini Message Board live on http://localhost:${PORT}`);
});
