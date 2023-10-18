const express = require("express");
const {
  getUsersPhysical,
  getUserPhysical,
  createUserPhysical,
} = require("../controller/PhysicalClientController");

const PhysicalRoute = express();

// todos os clientes
PhysicalRoute.get("/clients", getUsers);

//pessoas fisicas
PhysicalRoute.get("/clients/physical", getUsersPhysical);
PhysicalRoute.get("/clients/physical/:id", getUserPhysical);
PhysicalRoute.post("/clients/physical", createUserPhysical);

module.exports = PhysicalRoute;
