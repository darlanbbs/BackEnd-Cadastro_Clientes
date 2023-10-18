const express = require("express");
const {
  getUsers,
  getUsersPhysical,
  getUsersJuridical,
  getUserPhysical,
  getUserJuridical,
  createUserPhysical,
} = require("../controller/ClientsController");
const route = express();

// todos os clientes
route.get("/clients", getUsers);

//pessoas fisicas
route.get("/clients/physical", getUsersPhysical);
route.get("/clients/physical/:id", getUserPhysical);
route.post("/clients/physical", createUserPhysical);
// pessoas juridicas
route.get("/clients/juridical", getUsersJuridical);
route.get("/clients/juridical/:id", getUserJuridical);

module.exports = route;
