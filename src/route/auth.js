const { verifyToken } = require("../../shared/middleware/authToken");
const { permissionForSuperAdmin } = require("../../shared/middleware/permission");
const { addUser, login } = require("../controller/auth");

const router = require("express").Router();

router.post("/add", verifyToken, permissionForSuperAdmin, addUser)

router.post("/login", login)

module.exports = router;