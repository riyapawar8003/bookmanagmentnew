const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const { authenticateUser } = require("../middleware/verifyUser");

router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);
router.post("/", authenticateUser, bookController.addBook);
router.put("/:id", authenticateUser, bookController.updateBook);
router.delete("/:id", authenticateUser, bookController.deleteBook);

module.exports = router;
