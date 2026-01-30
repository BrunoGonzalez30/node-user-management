const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController")

router.put("/:id", UserController.updateUser)
router.delete("/:id", UserController.deleteUser)
router.post("/", UserController.createUser)
router.get("/" , UserController.getAllUsers)

module.exports = router;

