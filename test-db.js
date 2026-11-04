// test-db.js
require("dotenv").config();
const pool = require("./db/pool");

async function testConnection() {
  try {
    const timeResult = await pool.query("SELECT NOW()");
    console.log("Database connected successfully at:", timeResult.rows[0].now);

    const insertQuery =
      "INSERT INTO messages (text, username) VALUES ($1, $2) RETURNING *";
    const insertValues = ["Hello from industrial test script!", "DevBot"];

    const insertResult = await pool.query(insertQuery, insertValues);
    console.log("Test row inserted successfully:", insertResult.rows[0]);

    await pool.end();
  } catch (err) {
    console.error("Database connection or query failed:", err);
  }
}

testConnection();
