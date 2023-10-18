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

const getUsersPhysical = async (req, res) => {
  try {
    const { rows } = await pool.query("select * from pessoas_fisicas");
    res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getUsersJuridical = async (req, res) => {
  try {
    const { rows } = await pool.query("select * from pessoas_juridicas");
    res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getUserPhysical = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "select * from pessoas_fisicas where id = $1",
      [req.params.id]
    );
    res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getUserJuridical = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "select * from pessoas_juridicas where id = $1",
      [req.params.id]
    );
    res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  getUsers,
  //pessoas fisicas
  getUsersPhysical,
  getUserPhysical,

  //pessoas juridicas
  getUsersJuridical,
  getUserJuridical,
};
