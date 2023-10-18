const pool = require("../config/db");

const getUsersJuridical = async (req, res) => {
  try {
    const { rows } = await pool.query("select * from pessoas_juridicas");
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

const createUserJuridical = async (req, res) => {
  const { nome, endereco, telefone, email, cnpj, contrato_social_path } =
    req.body;
  try {
    const { rows } = await pool.query(
      "insert into pessoas_juridicas (nome,endereco,telefone,email,cnpj,contrato_social_path) values ($1,$2,$3,$4,$5,$6)",
      [nome, endereco, telefone, email, cnpj, contrato_social_path]
    );
    res.status(200).json({ mensagem: "Pessoa juridica criada com sucesso" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  //pessoas juridicas
  getUsersJuridical,
  getUserJuridical,
  createUserJuridical,
};
