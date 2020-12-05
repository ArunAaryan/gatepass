const pool = require("../../pool");
const getPermissionData = async (req, res) => {
  const getDeptId = `select * from hod where h_id=$1`;
  let dept_id;
  try {
    // console.log(req.name);
    const { rows } = await pool.query(getDeptId, [req.userId]);
    dept_id = rows[0].dept_id;
  } catch (err) {
    console.log(err);
  }
  const query = `select * from permissions where  dept_id =$1 and status=$2`;
  const values = [dept_id, "forwarded"];
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

const getIndividualPermission = async (req, res) => {
  const p_id = req.params.id;
  const query = `select * from permissions where p_id =$1`;
  values = [p_id];
  try {
    const { rows } = await pool.query(query, values);
    res.send(rows[0]);
  } catch (err) {
    res.send({ message: "error in fetching permission data." });
    console.log(err);
  }
};
const updatePermissionStatus = async (req, res) => {
  const { p_id, status } = req.body;
  const query = `update permissions set status = $1 where p_id = $2 returning *`;
  const values = [status, p_id];
  try {
    const { rows } = await pool.query(query, values);
    res.send(rows[0]);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPermissionData,
  getIndividualPermission,
  updatePermissionStatus,
};
