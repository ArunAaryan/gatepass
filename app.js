const express = require("express");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const { createUser } = require("./Auth/AuthHelper");

dotenv.config();
const app = express();
app.use(express.json());

app.post("/studentlogin", (req, res) => {
  console.log(req.body);
  createUser(req, res);
});
app.listen(5000);
