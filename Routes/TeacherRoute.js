
const express = require("express");
const router = express.Router();
const { createUser, loginUser } = require("../Auth/TeacherAuthHelper");
//const { createNewPermission } = require("../Controller/newPermission");
const { verifyToken } = require("../Auth/helper");
router.post("/register", (req, res) => {
  console.log(req.body);
  createUser(req, res);
});

router.post("/login", (req, res) => {
  loginUser(req, res);
});

//router.post("/newpermission", verifyToken, (req, res) => {
// createNewPermission(req, res);
//});
router.post("/verify", verifyToken, (req, res) => {
  console.log(req.headers["accesstoken"]);
  res.send("authorized");
});
module.exports = router;

