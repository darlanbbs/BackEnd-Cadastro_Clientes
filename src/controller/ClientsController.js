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
    const { rows, rowCount } = await pool.query(
      "select * from pessoas_fisicas where id = $1",
      [req.params.id]
    );

    if (rowCount < 1) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }
    res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getUserJuridical = async (req, res) => {
  try {
    const { rows, rowCount } = await pool.query(
      "select * from pessoas_juridicas where id = $1",
      [req.params.id]
    );
    if (rowCount < 1) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }
    res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const createUserPhysical = async (req, res) => {
  const { nome, endereco, telefone, email, cpf, rg, documento_path } = req.body;
  try {
    const { rows } = await pool.query(
      "insert into pessoas_fisicas (nome,endereco,telefone,email,cpf,rg,documento_path) values ($1,$2,$3,$4,$5,$6,$7)",
      [nome, endereco, telefone, email, cpf, rg, documento_path]
    );
    res.status(200).json({ mensagem: "Pessoa fisica criada com sucesso" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  getUsers,
  //pessoas fisicas
  getUsersPhysical,
  getUserPhysical,
  createUserPhysical,

  //pessoas juridicas
  getUsersJuridical,
  getUserJuridical,
};
