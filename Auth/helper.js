const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
// bcrypt helpers
const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

const comparePassword = (passwordHash, password) => {
  return bcrypt.compareSync(password, passwordHash);
};

// jwt helpers

const generateJWTTOken = (id, name) => {
  const token = jwt.sign(
    {
      userId: id,
      name: name,
    },
    process.env.secretJWT,
    { expiresIn: "10d" }
  );
  return token;
};

module.exports = { hashPassword, comparePassword, generateJWTTOken };
