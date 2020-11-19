const pool = require("../pool");
const { v4: uuid } = require("uuid");
const createNewPermission = async (req, res) => {
  if (!req.body.status) {
    req.body.status = "pending";
  }
  const {
    stu_id,
    reason,
    dept_id,
    stud_id,
    fromtime,
    totime,
    status,
  } = req.body;
  if (!stu_id || !reason || !dept_id || !fromtime || !status) {
    return res.status(400).send({ message: "Some data missing" });
  }
  let query = "";
  let values = [];
  if (!totime) {
    query = `INSERT INTO permissions (p_id, dept_id, stu_id, reason, fromtime,
        status) values($1, $2, $3, $4, $5, $6) returning *`;
    values = [uuid(), dept_id, stu_id, reason, fromtime, status];
  } else {
    query = `INSERT INTO permissions values($1, $2, $3, $4, $5, $6, $7) returning *`;
    values = [uuid(), dept_id, stu_id, reason, fromtime, totime, status];
  }
  try {
    const { rows } = await pool.query(query, values);
    if (rows[0]) {
      return res.status(400).send(rows[0]);
    } else {
      return res.status(400).send({ error: "error in creating permission" });
    }
  } catch (err) {
    return res.status(400).send({ error: "error in creating permission" });
    console.log(err);
  }
};
module.exports = { createNewPermission };
