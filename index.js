const express = require("express");
const path = require("node:path");
const pool = require("./db/pool"); // 1. REQUIRED: Connects your database pool
const app = express();
const { body, validationResult } = require("express-validator");

// 1. View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 2. Middleware to parse URL-encoded form bodies (req.body)
app.use(express.urlencoded({ extended: true }));

// 3. Serve Static Assets
app.use(express.static(path.join(__dirname, "public")));

// --- ROUTES ---

// Home Route: Fetch all messages from Supabase Postgres
app.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM messages ORDER BY added DESC",
    );
    res.render("index", { title: "Mini Message Board", messages: rows });
  } catch (err) {
    console.error("Database fetch error:", err);
    res.status(500).send("Database error occurred.");
  }
});

// Form Route: Render the input form
app.get("/new", (req, res) => {
  res.render("form", { title: "New Message" });
});

// POST Route: Insert form input into Supabase Postgres
app.post("/new", async (req, res) => {
  const { messageText, messageUser } = req.body;

  try {
    await pool.query("INSERT INTO messages (text, username) VALUES ($1, $2)", [
      messageText,
      messageUser,
    ]);
    res.redirect("/");
  } catch (err) {
    console.error("DATABASE INSERT FAILED:", err);
    res.status(500).send("Failed to save message: " + err.message);
  }
});

// Dynamic Route: View individual message by database ID
// Dynamic Route: View individual message by database ID
app.get("/messages/:id", async (req, res) => {
  const messageId = parseInt(req.params.id, 10);

  if (isNaN(messageId)) {
    return res.status(400).send("Invalid ID format.");
  }

  try {
    // Looks up the exact row where the database id matches the URL parameter
    const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [
      messageId,
    ]);

    if (rows.length === 0) {
      return res.status(404).send("404: Message not found.");
    }

    res.render("message", {
      title: "Message Detail",
      message: rows[0],
    });
  } catch (err) {
    console.error("Database fetch error:", err);
    res.status(500).send("Database error.");
  }
});

// POST Route: Delete a message by database ID
app.post("/messages/:id/delete", async (req, res) => {
  const messageId = parseInt(req.params.id, 10);

  if (isNaN(messageId)) {
    return res.status(400).send("Invalid ID format.");
  }

  try {
    await pool.query("DELETE FROM messages WHERE id = $1", [messageId]);
    res.redirect("/");
  } catch (err) {
    console.error("DATABASE DELETE FAILED:", err);
    res.status(500).send("Failed to delete message: " + err.message);
  }
});

// 1. GET Route: Load the edit form for a specific message ID
app.get("/messages/:id/edit", async (req, res) => {
  const messageId = parseInt(req.params.id, 10);

  if (isNaN(messageId)) {
    return res.status(400).send("Invalid ID format.");
  }

  try {
    const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [
      messageId,
    ]);

    if (rows.length === 0) {
      return res.status(404).send("404: Message not found.");
    }

    res.render("edit", {
      title: "Edit Message",
      message: rows[0],
    });
  } catch (err) {
    console.error("Database fetch error for editing:", err);
    res.status(500).send("Database error.");
  }
});

// 2. POST Route: Execute SQL UPDATE on the database
app.post("/messages/:id/update", async (req, res) => {
  const messageId = parseInt(req.params.id, 10);
  const { messageText } = req.body;

  if (isNaN(messageId)) {
    return res.status(400).send("Invalid ID format.");
  }

  try {
    await pool.query("UPDATE messages SET text = $1 WHERE id = $2", [
      messageText,
      messageId,
    ]);
    res.redirect("/");
  } catch (err) {
    console.error("DATABASE UPDATE FAILED:", err);
    res.status(500).send("Failed to update message: " + err.message);
  }
});

// Update your POST route with validation rules array
app.post(
  "/new",
  [
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username cannot be empty.")
      .escape(),
    body("text")
      .trim()
      .notEmpty()
      .withMessage("Message text cannot be empty.")
      .escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // If validation fails, re-render form with error feedback
      return res.status(400).render("form", { errors: errors.array() });
    }

    // Proceed with database insert if validation passes
    const { username, text } = req.body;
    await pool.query("INSERT INTO messages (username, text) VALUES ($1, $2)", [
      username,
      text,
    ]);
    res.redirect("/");
  },
);

// // local Server Listener
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Mini Message Board live on http://localhost:${PORT}`);
// });

// ... your express setup, middleware, and routes are up here ...

// Conditionally listen locally, but export for Vercel serverless function
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}

// Export the Express app for Vercel
module.exports = app;
