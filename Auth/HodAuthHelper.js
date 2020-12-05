const pool = require("../pool");
const { hashPassword, comparePassword, generateJWTTOken } = require("./helper");

const createUser = async (req, res) => {
  if (
    !req.body.h_id ||
    !req.body.password ||
    !req.body.name ||
    !req.body.dept_id
  ) {
    return res.status(200).send({ message: "Some data missing" });
  }
  const passwordHash = hashPassword(req.body.password);
  const query = "insert into hod values($1, $2, $3, $4) returning *";
  const values = [req.body.h_id, req.body.name, passwordHash, req.body.dept_id];
  try {
    const { rows } = await pool.query(query, values);
    return res.status(200).send(rows);
  } catch (err) {
    if (err.routine === "_bt_check_unique") {
      return res.status(400).send({ message: "id already exists" });
    }
    console.log(err);
    return res.status(400).send({ message: "error in inserting data" });
  }
};
const loginUser = async (req, res) => {
  if (!req.body.id || !req.body.password) {
    return res.status(400).send({ message: "id or password is missing" });
  }
  let query = "SELECT * from hod where h_id=$1";
  const { rows } = await pool.query(query, [req.body.id]);
  if (!rows[0]) {
    return res.status(400).send({ message: "Wrong Credentials" });
  }
  if (!comparePassword(req.body.password, rows[0].password)) {
    return res.status(400).send({ message: "Wrong Credentials(password)" });
  }
  const token = generateJWTTOken(rows[0].h_id, rows[0].name);
  res.status(200).send({ AuthToken: token });
};

const checkIfHod = async (req, res, next) => {
  const userId = req.userId;
  try {
    const { rows } = await pool.query(`select * from hod where h_id=$1`, [
      userId,
    ]);
    if (!rows[0]) {
      res.send({ message: "Not Authorized" });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.send({ message: "Error in authentication" });
  }
};

module.exports = { createUser, loginUser, checkIfHod };
