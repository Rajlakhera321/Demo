const { verifyToken } = require("../../shared/middleware/authToken");
const { resetPassword } = require("../controller/user");

const router = require("express").Router();

router.post("/resetPassword/:id", verifyToken, resetPassword)

module.exports = router;