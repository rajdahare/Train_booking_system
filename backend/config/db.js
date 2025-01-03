const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  connectionString: process.env.PG_URL, // Use the connection URL
});

module.exports = pool;