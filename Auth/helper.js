const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
// bcrypt helpers
const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

const comparePassword = (password, passwordHash) => {
  return bcrypt.compareSync(password, passwordHash);
};

// jwt helpers

const generateJWTTOken = (stu_id, name) => {
  const token = jwt.sign(
    {
      userId: stu_id,
      name: name,
    },
    process.env.secretJWT,
    { expiresIn: "10d" }
  );
  return token;
};

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  // console.log(token);
  jwt.verify(token, process.env.secretJWT, function (err, decoded) {
    if (err) {
      return res.status(400).send({ message: "Authorization Failed" });
    } else {
      // console.log(decoded);
      req.userId = decoded.userId;
      req.userName = decoded.name;
      next();
    }
  });
};

module.exports = {
  hashPassword,
  comparePassword,
  generateJWTTOken,
  verifyToken,
};
