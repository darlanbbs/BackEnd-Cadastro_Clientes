const { Pool } = require("pg");
require("dotenv").config();

// o u ser do .env ta retornando outro valor que nao esta no .env
// const user = process.env.USERNAME;
const password = process.env.PASS;
const host = process.env.EXTERNALLINK;
const port = process.env.PORT;
const database = process.env.DATABASE;

const pool = new Pool({
  user: "cadastro_clientes_user",
  host,
  database,
  password,
  port,
  ssl: true,
});

module.exports = pool;
