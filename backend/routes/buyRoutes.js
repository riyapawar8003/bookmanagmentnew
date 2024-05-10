const express = require("express");
const mybookController = require("../controllers/buyController");
const { authenticateUser } = require("../middleware/verifyUser");
const router = express.Router();
// Protected route for buying books

router.post("/", authenticateUser, mybookController.buyBook);
router.put("/", authenticateUser, mybookController.updateReturnStatus);

router.get("/topBuy", authenticateUser, mybookController.getTopPurchasedBooks);
router.get("/:userId", authenticateUser, mybookController.getUserBookPurchases);

module.exports = router;
