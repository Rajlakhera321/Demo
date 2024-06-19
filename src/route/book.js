const { verifyToken } = require("../../shared/middleware/authToken");
const { permissionForAdmin, permissionForSuperAdmin } = require("../../shared/middleware/permission");
const { addBook, approvalForUpdate, approveBook, updateBook, getBooks, purchaseBook, extraBook, getPendingBook } = require("../controller/book");

const router = require("express").Router();

router.post("/addBook", verifyToken, permissionForAdmin, addBook)

router.post("/updateBook/:id", verifyToken, permissionForAdmin, approvalForUpdate)

router.put("/approveBook/:id", verifyToken, permissionForSuperAdmin, approveBook)

router.put("/updation/:id", verifyToken, permissionForSuperAdmin, updateBook)

router.get("/getBooks", verifyToken, getBooks)

router.put("/purchase/:id", verifyToken, purchaseBook)

router.post("/extraBook", verifyToken, extraBook)

router.get("/pendingBook", verifyToken, permissionForAdmin, getPendingBook)

module.exports = router;