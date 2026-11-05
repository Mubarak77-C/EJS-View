const { Pool } = require("pg");

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
    rejectUnauthorized: false, // Required for cloud-hosted databases like Supabase on Vercel
  },
});

module.exports = pool;
