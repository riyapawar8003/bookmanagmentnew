const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateUser } = require("../middleware/verifyUser");

router.get("/", userController.getAllUsers);
router.get("/:id", authenticateUser, userController.getUserById);
router.post("/", userController.addUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

router.post("/login", userController.loginUser);
router.post("/logout", userController.logoutUser);

module.exports = router;
