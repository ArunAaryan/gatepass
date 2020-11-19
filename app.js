const express = require("express");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
// Routes import
const StudentRoute = require("./Routes/StudentRoute");

dotenv.config();
const app = express();
app.use(express.json());

app.use("/student", StudentRoute);

app.listen(5000);
