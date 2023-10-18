const express = require("express");
const {
  getUsersJuridical,
  getUserJuridical,
} = require("../controller/JuridicalClientController");

const JuridicalRoute = express();

// pessoas juridicas
JuridicalRoute.get("/clients/juridical", getUsersJuridical);
JuridicalRoute.get("/clients/juridical/:id", getUserJuridical);

module.exports = JuridicalRoute;
