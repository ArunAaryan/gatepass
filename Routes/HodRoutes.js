const express = require("express");
const { verify } = require("jsonwebtoken");
const { verifyToken } = require("../Auth/helper");
const router = express.Router();
const { createUser, loginUser, checkIfHod } = require("../Auth/HodAuthHelper");
const {
  getPermissionData,
  getIndividualPermission,
  updatePermissionStatus,
} = require("../Controller/Hod/permissionHod");
router.post("/createUser", (req, res) => {
  createUser(req, res);
});

router.post("/login", (req, res) => {
  loginUser(req, res);
});

router.get("/allpermissions", verifyToken, checkIfHod, (req, res) => {
  getPermissionData(req, res);
});

router.get(
  "/getIndividualPermission/:id",
  verifyToken,
  checkIfHod,
  (req, res) => {
    // console.log(req.params.id);
    getIndividualPermission(req, res);
  }
);
router.post("/updatePermissionStatus", verifyToken, checkIfHod, (req, res) => {
  updatePermissionStatus(req, res);
});
module.exports = router;
