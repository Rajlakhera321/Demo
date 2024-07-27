const { addUser, login } = require("../controller/user");

const router = require("express").Router();

router.post("/", addUser);

router.post("/login", login);

module.exports = router;