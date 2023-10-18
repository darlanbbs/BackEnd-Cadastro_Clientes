const express = require("express");
const cors = require("cors");
const PhysicalRoute = require("./routes/ClientsPhysical");
const JuridicalRoute = require("./routes/ClientJuridical");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use(PhysicalRoute);
app.use(JuridicalRoute);

app.listen(process.env.PORT_LISTEN);
