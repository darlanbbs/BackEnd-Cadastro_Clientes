const express = require("express");
const {
  getUsersJuridical,
  getUserJuridical,
  updateUserJuridical,
  deleteUserJuridical,
  createUserJuridical,
} = require("../controller/JuridicalClientController");

const JuridicalRoute = express();

// pessoas juridicas
JuridicalRoute.get("/clients/juridical", getUsersJuridical);
JuridicalRoute.get("/clients/juridical/:id", getUserJuridical);
JuridicalRoute.post("/clients/juridical", createUserJuridical);
JuridicalRoute.put("/clients/juridical/:id", updateUserJuridical);
JuridicalRoute.delete("/clients/juridical/:id", deleteUserJuridical);
module.exports = JuridicalRoute;
