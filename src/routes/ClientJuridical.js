const express = require("express");
const {
  getUsersJuridical,
  getUserJuridical,
  updateUserJuridical,
  deleteUserJuridical,
  createUserJuridical,
} = require("../controller/JuridicalClientController");
const {
  verifyParams,
  verifyBodyJuridical,
} = require("../middleware/Middleware");

const JuridicalRoute = express();

// pessoas juridicas
JuridicalRoute.get("/clients/juridical", getUsersJuridical);
JuridicalRoute.get("/clients/juridical/:id", verifyParams, getUserJuridical);
JuridicalRoute.post(
  "/clients/juridical",
  verifyBodyJuridical,
  createUserJuridical
);
JuridicalRoute.put(
  "/clients/juridical/:id",
  verifyParams,
  verifyBodyJuridical,
  updateUserJuridical
);
JuridicalRoute.delete(
  "/clients/juridical/:id",
  verifyParams,
  deleteUserJuridical
);
module.exports = JuridicalRoute;
