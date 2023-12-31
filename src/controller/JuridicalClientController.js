const pool = require("../config/db");

const emailExistsInPessoasFisicas = async (email) => {
  const { rows } = await pool.query(
    "SELECT COUNT(*) FROM pessoas_fisicas WHERE email = $1",
    [email]
  );
  return parseInt(rows[0].count) > 0;
};

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
  const {
    nome_empresa,
    endereco,
    telefone,
    email,
    cnpj,
    contrato_social_path,
  } = req.body;
  try {
    const emailExists = await emailExistsInPessoasFisicas(email);

    if (emailExists) {
      return res.status(400).json({ mensagem: "Email em uso" });
    }
    const { rows } = await pool.query(
      "insert into pessoas_juridicas (nome_empresa,endereco,telefone,email,cnpj,contrato_social_path) values ($1,$2,$3,$4,$5,$6)",
      [nome_empresa, endereco, telefone, email, cnpj, contrato_social_path]
    );
    res.status(200).json({ mensagem: "Pessoa juridica criada com sucesso" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updateUserJuridical = async (req, res) => {
  const {
    nome_empresa,
    endereco,
    telefone,
    email,
    cnpj,
    contrato_social_path,
  } = req.body;

  const emailExists = await emailExistsInPessoasFisicas(email);
  if (emailExists) {
    return res.status(400).json({ mensagem: "Email em uso" });
  }

  try {
    const { rows } = await pool.query(
      "UPDATE pessoas_juridicas SET nome_empresa = $1, endereco = $2, telefone = $3, email = $4, cnpj = $5, contrato_social_path = $6 WHERE id = $7",
      [
        nome_empresa,
        endereco,
        telefone,
        email,
        cnpj,
        contrato_social_path,
        req.params.id,
      ]
    );
    res
      .status(200)
      .json({ mensagem: "Pessoa jurídica atualizada com sucesso" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};



module.exports = {
  //pessoas juridicas
  getUsersJuridical,
  getUserJuridical,
  createUserJuridical,
  updateUserJuridical,
};
