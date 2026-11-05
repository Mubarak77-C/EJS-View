const { Pool } = require("pg");

// Only load dotenv locally if not running on Vercel production
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

if (!process.env.DATABASE_URL) {
  throw new Error(
    "CRITICAL: DATABASE_URL is not set in the environment variables!",
  );
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

console.log(
  "Checking DB URL exists:",
  process.env.DATABASE_URL ? "YES IT EXISTS" : "NO - IT IS MISSING",
);

module.exports = pool;
