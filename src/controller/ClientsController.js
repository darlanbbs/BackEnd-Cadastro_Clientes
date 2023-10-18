const pool = require("../config/db");

const getUsers = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "select * from pessoas_fisicas,pessoas_juridicas"
    );
    res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  getUsers,
};
