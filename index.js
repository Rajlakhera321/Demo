const express = require("express");
const app = express();
const {connection} = require("./db/db");
require("dotenv").config();
const port = process.env.PORT || 3000;

connection();
app.use(express.json());

console.log("Server is running on port 8000");
app.use("/api/v1/user", require("./src/router/user"));
app.use("/api/v1/book", require("./src/router/book"));

console.log("new console for git check 234");
app.listen(port, () => console.log(`Server is running on port ${port}`));
