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
        rg AS documento_adicional
      FROM pessoas_fisicas

      UNION ALL

      SELECT 
        id,
        nome_empresa AS nome_ou_nome_empresa,
        endereco,
        telefone,
        email,
        cnpj AS documento,
        NULL AS documento_adicional
      FROM pessoas_juridicas`
    );
    res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};


const searchUser = async (req, res) => {
  const { nome } = req.query;

  try {
    const { rows } = await pool.query(
      `

    SELECT 
    id,
        nome AS nome_ou_nome_empresa,
        endereco,
        telefone,
        email,
        cpf AS documento,
        rg AS documento_adicional
      FROM pessoas_fisicas

WHERE nome ILIKE '%${nome}%' 

UNION ALL

SELECT 
   id,
        nome_empresa AS nome_ou_nome_empresa,
        endereco,
        telefone,
        email,
        cnpj AS documento,
        NULL AS documento_adicional
      FROM pessoas_juridicas
 

WHERE nome_empresa ILIKE '%${nome}%';

      `
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json(error.message);
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
  const { nome, endereco, telefone, email, cpf, rg } = req.body;
  const emailExists = await emailExistsInPessoasJuridicas(email);
  if (emailExists) {
    return res.status(400).json({ mensagem: "Email em uso" });
  }
  try {
    const { rows } = await pool.query(
      "insert into pessoas_fisicas (nome,endereco,telefone,email,cpf,rg) values ($1,$2,$3,$4,$5,$6)",

      [nome, endereco, telefone, email, cpf, rg]
    );
    res.status(200).json({ mensagem: "Pessoa fisica criada com sucesso" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updateUserPhysical = async (req, res) => {
  const { nome, endereco, telefone, email, cpf, rg } = req.body;
  const emailExists = await emailExistsInPessoasJuridicas(email);
  if (emailExists) {
    return res.status(400).json({ mensagem: "Email em uso" });
  }
  try {
    const { rows } = await pool.query(
      "update pessoas_fisicas set nome = $1,endereco = $2,telefone = $3,email = $4, cpf = $5,rg = $6 where id = $8",
      [nome, endereco, telefone, email, cpf, rg, req.params.id]
    );
    res.status(200).json({ mensagem: "Pessoa fisica atualizada com sucesso" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { email } = req.params;

    const juridicalResult = await pool.query(
      "SELECT * FROM pessoas_juridicas WHERE email = $1",
      [email]
    );

    if (juridicalResult.rows.length > 0) {
      await pool.query("DELETE FROM pessoas_juridicas WHERE email = $1", [
        email,
      ]);
      return res
        .status(200)
        .json({ mensagem: "Pessoa jurídica excluída com sucesso" });
    }

    const physicalResult = await pool.query(
      "SELECT * FROM pessoas_fisicas WHERE email = $1",
      [email]
    );

    if (physicalResult.rows.length > 0) {
      await pool.query("DELETE FROM pessoas_fisicas WHERE email = $1", [email]);
      return res
        .status(200)
        .json({ mensagem: "Pessoa física excluída com sucesso" });
    }

    return res.status(404).json({ mensagem: "Usuário não encontrado" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    // Consulta para buscar na tabela pessoas_fisicas
    const queryPessoaFisica = `
      SELECT * FROM pessoas_fisicas WHERE email = $1
    `;

    // Consulta para buscar na tabela pessoas_juridicas
    const queryPessoaJuridica = `
      SELECT * FROM pessoas_juridicas WHERE email = $1
    `;

    // Executando as consultas
    const resultPessoaFisica = await pool.query(queryPessoaFisica, [email]);
    const resultPessoaJuridica = await pool.query(queryPessoaJuridica, [email]);

    // Verificando se encontrou resultados em alguma das tabelas
    if (resultPessoaFisica.rows.length > 0) {
      res.status(200).json({ tipo: 'fisica', data: resultPessoaFisica.rows });
    } else if (resultPessoaJuridica.rows.length > 0) {
      res.status(200).json({ tipo: 'juridica', data: resultPessoaJuridica.rows });
    } else {
      res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};


module.exports = {
  getUsers,
  searchUser,
  deleteUser,
  getUserByEmail,
  //pessoas fisicas
  getUsersPhysical,
  getUserPhysical,
  createUserPhysical,
  updateUserPhysical,
};
