const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

const {authMiddleware} = require("../middlewares/auth");

router.post("/api/boards",authMiddleware,userController.post_boards)

router.get("/api/boards",authMiddleware,userController.get_boards)

module.exports = router;