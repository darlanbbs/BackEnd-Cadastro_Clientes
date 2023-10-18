const express = require("express");
const route = require("./routes/ClientsRoutes");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use(route);

app.listen(process.env.PORT_LISTEN);
