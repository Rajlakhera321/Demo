const express = require("express");
const app = express();
const {connection} = require("./db/db");
require("dotenv").config();
const port = process.env.PORT || 3000;

connection();
app.use(express.json());

app.use("/api/v1/user", require("./src/router/user"));
app.use("/api/v1/book", require("./src/router/book"));

app.listen(port, () => console.log(`Server is running on port ${port}`));