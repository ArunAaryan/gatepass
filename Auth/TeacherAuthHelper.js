const pool = require("../pool");
const { hashPassword, comparePassword, generateJWTTOken } = require("./helper");

const createUser = async (req, res) => {
  if (
    !req.body.t_id ||
    !req.body.password ||
    !req.body.name ||
    !req.body.dept_id ||
    !req.body.year
  ) {
    return res.status(200).send({ message: "Some data missing" });
  }
  const passwordHash = hashPassword(req.body.password);
  const query = "insert into teachers values($1, $2, $3, $4, $5) returning *";
  const values = [
    req.body.t_id,
    req.body.name,
    passwordHash,
    req.body.year,
    req.body.dept_id,
  ];
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
  let query = "SELECT * from teachers where t_id=$1";
  const { rows } = await pool.query(query, [req.body.id]);
  if (!rows[0]) {
    return res.status(400).send({ message: "Wrong Credentials" });
  }
  if (!comparePassword(req.body.password, rows[0].password)) {
    return res.status(400).send({ message: "Wrong Credentials(password)" });
  }
  const token = generateJWTTOken(rows[0].t_id, rows[0].name);
  res.status(200).send({ AuthToken: token });
};

module.exports = { createUser, loginUser };
