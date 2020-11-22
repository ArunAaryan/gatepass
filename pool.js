const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  connectionString: process.env.connectionString,
  
});
console.log(process.env.connectionString);

module.exports = pool;
