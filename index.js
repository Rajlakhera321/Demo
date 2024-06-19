const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const port = process.env.PORT || 8000
const connection = require("./config/dbConfig");
const superAdmin = require("./shared/seeder/superAdmin");

connection();
app.use(express.json());
app.use(cors());
app.use(morgan());
superAdmin();

app.use('/api/v1/auth', require("./src/route/auth"));
app.use('/api/v1/user', require("./src/route/user"));
app.use('/api/v1/book', require("./src/route/book"));

app.listen(port, () => console.log(`server is running ${port}`));