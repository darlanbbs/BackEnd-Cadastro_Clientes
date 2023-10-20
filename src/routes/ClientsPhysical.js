const express = require("express");
const {
  getUsersPhysical,
  getUserPhysical,
  createUserPhysical,
  getUsers,
  updateUserPhysical,
  deleteUser,
  searchUser,
} = require("../controller/PhysicalClientController");
const {
  verifyParams,
  verifyBodyPhysical,
} = require("../middleware/Middleware");

const PhysicalRoute = express();

// todos os clientes
PhysicalRoute.get("/clients", getUsers);
PhysicalRoute.get("/search", searchUser);
PhysicalRoute.delete("/clients/:email", deleteUser);

//pessoas fisicas
PhysicalRoute.get("/clients/physical", getUsersPhysical);
PhysicalRoute.get("/clients/physical/:id", verifyParams, getUserPhysical);
PhysicalRoute.post("/clients/physical", verifyBodyPhysical, createUserPhysical);
PhysicalRoute.put(
  "/clients/physical/:id",
  verifyParams,
  verifyBodyPhysical,
  updateUserPhysical
);
PhysicalRoute.delete("/clients/physical/:id", verifyParams, deleteUserPhysical);
module.exports = PhysicalRoute;
