const express = require("express");
const router = express.Router();
const { createUser, loginUser } = require("../Auth/TeacherAuthHelper");
const { verifyToken } = require("../Auth/helper");
// controller
const {
  getPermissionData,
  getIndividualPermission,
  updatePermissionStatus,
} = require("../Controller/Teacher/permissionTeacher");
router.post("/createUser", (req, res) => {
  createUser(req, res);
});

router.post("/login", (req, res) => {
  loginUser(req, res);
});

router.get("/getAllPermissions", verifyToken, (req, res) => {
  getPermissionData(req, res);
});

router.get("/getIndividualPermission/:id", verifyToken, (req, res) => {
  // console.log(req.params.id);
  getIndividualPermission(req, res);
});
router.post("/updatePermissionStatus", verifyToken, (req, res) => {
  updatePermissionStatus(req, res);
});
module.exports = router;
