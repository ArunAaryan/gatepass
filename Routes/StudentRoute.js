const express = require("express");
const router = express.Router();
const { createUser, loginUser } = require("../Auth/StudentAuthHelper");
const {
  createNewPermission,
  getPermissionData,
  deletePermission,
} = require("../Controller/Student/permissionStudent");
const { verifyToken } = require("../Auth/helper");
router.post("/register", (req, res) => {
  console.log(req.body);
  createUser(req, res);
});

router.post("/login", (req, res) => {
  loginUser(req, res);
});

router.post("/newpermission", verifyToken, (req, res) => {
  createNewPermission(req, res);
});
router.post("/verify", verifyToken, (req, res) => {
  console.log(req.headers);
  res.send("authorized");
});
router.get("/permission/:id", verifyToken, (req, res) => {
  getPermissionData(req, res);
});
router.delete("/permission/:id", verifyToken, (req, res) => {
  deletePermission(req, res);
});
module.exports = router;
