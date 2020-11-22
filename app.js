const express = require("express");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
// Routes import
const StudentRoute = require("./Routes/StudentRoute");
const TeacherRoute = require("./Routes/TeacherRoute");
dotenv.config();
const app = express();
app.use(express.json());

app.use("/student", StudentRoute);
app.use("/teacher", TeacherRoute);


app.listen(5000);
