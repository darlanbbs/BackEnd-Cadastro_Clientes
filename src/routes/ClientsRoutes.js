const express = require("express");
const { getUsers } = require("../controller/ClientsController");
const route = express();

route.get("/clients", getUsers);

module.exports = route;
