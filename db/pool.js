// db/pool.js
require("dotenv").config(); // <-- Must be line 1
const { Pool } = require("pg");

module.exports = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Supabase SSL certificates on serverless
  },
});
