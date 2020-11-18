const pool = require("../pool");
const { hashPassword, comparePassword, generateJWTTOken } = require("./helper");
const createUser = async (req, res) => {
  console.log("in auth helper");
  if (!req.body.name || !req.body.password) {
    return res.status(400).send({ message: "UserId or password is missing" });
  }
  console.log("hash" + hashPassword);
  const passwordHash = hashPassword(req.body.password);

  const query =
    "INSERT INTO students(name, password, year, dept_id) VALUES($1, $2, $3, $4) returning *";
  //   const query = "select * from students";
  const values = [req.body.name, passwordHash, req.body.year, req.body.dept_id];
  console.log(values);
  try {
    const { rows } = await pool.query(query, values);
    //   const token = generateJWTTOken()
    res.status(201).send(rows);
    console.log(rows);
  } catch (err) {
    if (err.routine === "_bt_check_unique") {
      return res.status(400).send({ message: "id already exists" });
    }
    console.log(err);
    return res.status(400).send(err);
  }
};
module.exports = { createUser };
