const { verifyToken } = require("../../middleware/authToken");
const { retreatData, addBook, getRetreat, filterRetreat } = require("../controller/book");

const router = require("express").Router();

router.post("/retreat", verifyToken, retreatData);

router.post("/", verifyToken, addBook);

router.get("/retreat", verifyToken, getRetreat);

router.get("/filteredData", verifyToken, filterRetreat);

module.exports = router;