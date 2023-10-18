const verifyBodyJuridical = (req, res, next) => {
  const { nome_empresa, endereco, email, cnpj } = req.body;
  if (!nome_empresa || !endereco || !email || !cnpj) {
    return res.status(400).json({ mensagem: "Dados incompletos" });
  }
  next();
};

const verifyBodyPhysical = (req, res, next) => {
  const { nome, email, cpf, rg, endereco } = req.body;
  if (!nome || !email || !cpf || !rg || !endereco) {
    return res.status(400).json({ mensagem: "Dados incompletos" });
  }
  next();
};

const verifyParams = (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json({ mensagem: "Id é nescessário" });
  }
  next();
};

module.exports = {
  verifyBodyJuridical,
  verifyBodyPhysical,
  verifyParams,
};
