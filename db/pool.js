const { Pool } = require("pg")
require("dotenv").config()

module.exports = new Pool({
  connectionString: process.env.PG_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false, // Disable certificate verification if needed
  },
})
