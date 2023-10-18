const express = require("express");
const {
  getUsersPhysical,
  getUserPhysical,
  createUserPhysical,
  getUsers,
  updateUserPhysical,
} = require("../controller/PhysicalClientController");

const PhysicalRoute = express();

// todos os clientes
PhysicalRoute.get("/clients", getUsers);

//pessoas fisicas
PhysicalRoute.get("/clients/physical", getUsersPhysical);
PhysicalRoute.get("/clients/physical/:id", getUserPhysical);
PhysicalRoute.post("/clients/physical", createUserPhysical);
PhysicalRoute.put("/clients/physical/:id", updateUserPhysical);

module.exports = PhysicalRoute;
