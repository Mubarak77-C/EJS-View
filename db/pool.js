// db/pool.js
const { Pool } = require("pg");
require("dotenv").config();

// All configuration is automatically pulled from process.env.DATABASE_URL
module.exports = new Pool({
  connectionString: process.env.DATABASE_URL,
});
