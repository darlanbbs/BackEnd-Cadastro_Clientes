const pool = require("../config/db");

const emailExistsInPessoasJuridicas = async (email) => {
  const { rows } = await pool.query(
    "SELECT COUNT(*) FROM pessoas_juridicas WHERE email = $1",
    [email]
  );
  return parseInt(rows[0].count) > 0;
};

const getUsers = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT 
      id,
      nome AS nome_ou_nome_empresa,
      endereco,
      telefone,
      email,
      cpf AS documento,
      rg AS documento_adicional,
      documento_path AS caminho_documento,
      data
  FROM pessoas_fisicas
  
  UNION ALL
  
  SELECT 
      id,
      nome_empresa AS nome_ou_nome_empresa,
      endereco,
      telefone,
      email,
      cnpj AS documento,
      NULL AS documento_adicional,
      contrato_social_path AS caminho_documento,
      data
  FROM pessoas_juridicas;
  `
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

const createUserPhysical = async (req, res) => {
  const { nome, endereco, telefone, email, cpf, rg, documento_path } = req.body;
  const emailExists = await emailExistsInPessoasFisicas(email);
  if (emailExists) {
    return res.status(400).json({ mensagem: "Email em uso" });
  }
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

const updateUserPhysical = async (req, res) => {
  const { nome, endereco, telefone, email, cpf, rg, documento_path } = req.body;
  const emailExists = await emailExistsInPessoasFisicas(email);
  if (emailExists) {
    return res.status(400).json({ mensagem: "Email em uso" });
  }
  try {
    const { rows } = await pool.query(
      "update pessoas_fisicas set nome = $1,endereco = $2,telefone = $3,email = $4, cpf = $5,rg = $6, documento_path = $7 where id = $8",
      [nome, endereco, telefone, email, cpf, rg, documento_path, req.params.id]
    );
    res.status(200).json({ mensagem: "Pessoa fisica atualizada com sucesso" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteUserPhysical = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "delete from pessoas_fisicas where id = $1",
      [req.params.id]
    );
    res.status(200).json({ mensagem: "Pessoa fisica excluída com sucesso" });
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
  updateUserPhysical,
  deleteUserPhysical,
};
