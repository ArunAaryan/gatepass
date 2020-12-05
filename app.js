const express = require("express");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const cors = require("cors");
// Routes import
const StudentRoute = require("./Routes/StudentRoute");
const HodRoutes = require("./Routes/HodRoutes");
const TeacherRoutes = require("./Routes/TeacherRoutes");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/student", StudentRoute);
app.use("/hod", HodRoutes);
app.use("/teacher", TeacherRoutes);
app.listen(5000);
