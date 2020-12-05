const pool = require("../../pool");
const { v4: uuid } = require("uuid");
const createNewPermission = async (req, res) => {
  if (!req.body.status) {
    req.body.status = "pending";
  }
  const { reason, fromtime, totime, status } = req.body;
  if (!reason || !fromtime || !status) {
    return res.status(400).send({ message: "Some data missing" });
  }
  let stu_id, dept_id, year;
  let stuInfoQuery = `select stu_id, dept_id, year from students where stu_id= $1`;
  try {
    const { rows } = await pool.query(stuInfoQuery, [req.userId]);
    stu_id = rows[0].stu_id;
    dept_id = rows[0].dept_id;
    year = rows[0].year;
  } catch (err) {
    console.log(err);
  }
  let query = "";
  let values = [];
  if (!totime) {
    query = `INSERT INTO permissions (p_id, dept_id, stu_id, reason, fromtime,
        status) values($1, $2, $3, $4, $5, $6, $7) returning *`;
    values = [uuid(), dept_id, stu_id, reason, fromtime, status, year];
  } else {
    query = `INSERT INTO permissions values($1, $2, $3, $4, $5, $6, $7, $8) returning *`;
    values = [uuid(), dept_id, stu_id, reason, fromtime, totime, status, year];
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

const getPermissionData = async (req, res) => {
  const query = `select * from permissions where stu_id=$1`;
  const values = [req.params.id];
  try {
    const { rows } = await pool.query(query, values);
    if (rows) {
      return res.status(200).send(rows);
    } else {
      return res.status(200).send({ message: "No Data Found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: "Error in fetching data" });
  }
};
const deletePermission = async (req, res) => {
  const query = `delete from permissions where p_id = $1 returning *`;
  const values = [req.params.id];
  try {
    const { rows } = await pool.query(query, values);
    res.send(rows[0]);
  } catch (err) {
    console.log(err);
    res.send({ message: "error in deleting the permission" });
  }
};
module.exports = { createNewPermission, getPermissionData, deletePermission };
